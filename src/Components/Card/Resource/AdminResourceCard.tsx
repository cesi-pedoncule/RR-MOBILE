import React, { useState } from 'react'
import { Resource } from 'rr-apilib'
import { NavigationParamList } from '../../../Types/navigation'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { View, Text, TouchableOpacity, GestureResponderEvent, FlatList, ToastAndroid, ActivityIndicator } from 'react-native'
import ResourceCardStyles from '../../../Styles/Components/Card/Resource/ResourceCardStyles'
import IconButton from '../../Button/IconButton'
import LikeButton from '../../Button/LikeButton'
import CommentButton from '../../Button/CommentButton'
import CategoryButton from '../../Button/CategoryButton'
import { likeClickHandle } from '../../../Functions/Utils'
import { COLORS } from '../../../Styles/Colors'
import StateButton from '../../Button/StateButton'
import CommonStyles from '../../../Styles/CommonStyles'

interface Props {
    resourceData: Resource;
    navigation: NativeStackNavigationProp<NavigationParamList>;
    setResourcesFiltered?: React.Dispatch<React.SetStateAction<Resource[]>>;
    onDoubleClick: () => void;
}

export default function AdminResourceCard({ resourceData, setResourcesFiltered, navigation, onDoubleClick}: Props) {

    const [resource, setResource] = useState<Resource>(resourceData);
    const numberCommentResource = resource.comments.cache.size;
    const categories = Array.from(resource.categories.cache.values());
    const [ isLoading, setIsLoading ] = useState<boolean>(false);

    const description = resource.description ?  resource.description : "Aucune description fournie" ;
    const username = resource.creator ? `${resource.creator.name} ${resource.creator.firstname}` : "Utilisateur inconnu";
    const user = resource.client.auth.me;

    let timeout: NodeJS.Timeout | null = null;

    const onPress = async (e: GestureResponderEvent) => {

        e.preventDefault();

        if(timeout) {
            clearTimeout(timeout);
            timeout = null;
            await likeClickHandle(resource, setResource);
            return onDoubleClick();
        }

        timeout = setTimeout(() => {
            timeout = null;
            onClickDetailResource();
        }, 300);
    }

    const onClickDeleteResource = async () => {
        setIsLoading(true);

        try {
            if(user != null && setResourcesFiltered != null){
                await user.resources.delete(resource);
                const newResources = Array.from(user.resources.cache.values());
                setResourcesFiltered(newResources);
            }
        } catch(error) {
            ToastAndroid.show("Problème lors de la suppression" , ToastAndroid.CENTER);
        }

        setIsLoading(false);
    }

    const onClickEditResource = () => {
        navigation.navigate('EditResourceScreen',  {
            resource: resource,
            client: resource.client,
        });
    }

    const onClickDetailResource = () => {
        navigation.navigate('AdminResourceValidate', {
            resource: resource,
            client: resource.client,
        });
    }

    return (
        <TouchableOpacity onPress={(e) => onPress(e)} style={ResourceCardStyles.container}>
            {
                isLoading ? <ActivityIndicator size="large" color={COLORS.Black} style={CommonStyles.loader}/> :
                <View style={ResourceCardStyles.withoutUserContainer}>
                <Text style={ResourceCardStyles.cardTitle} numberOfLines={1}>{resource.title}</Text>
                    <Text style={ResourceCardStyles.cardUser} numberOfLines={1}>{username}</Text>
                    <View>
                        <FlatList showsHorizontalScrollIndicator={false} horizontal style={ResourceCardStyles.categoriesContainer} 
                            data={categories}
                            renderItem={({item}) => <CategoryButton navigation={navigation} category={item}/>}
                            keyExtractor={item => item.id}
                        />
                    </View>
                    <Text style={ResourceCardStyles.cardText} numberOfLines={3}>{description}</Text>
                    <View style={ResourceCardStyles.buttonsContainer}>
                        <LikeButton resource={resource} setResource={setResource} onClick={onDoubleClick}/>
                        <CommentButton commentNumber={numberCommentResource}/>
                        <IconButton callBack={onClickEditResource} iconStyle={ResourceCardStyles.buttonsEditionResource} iconSize={24} iconName={"square-edit-outline"} iconColor={COLORS.Black}/>
                        <IconButton callBack={onClickDeleteResource} iconStyle={ResourceCardStyles.buttonsEditionResource} iconSize={24} iconName={"delete-outline"} iconColor={COLORS.Black}/>
                        <StateButton resource={resource}/>
                    </View>
                </View>
            }
        </TouchableOpacity>
    )
}