import React, { useState } from 'react'
import { Resource } from 'rr-apilib'
import { NavigationParamList } from '../../../Types/navigation'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { View, Text, TouchableOpacity, GestureResponderEvent, FlatList } from 'react-native'
import ResourceCardStyles from '../../../Styles/Components/Card/Resource/ResourceCardStyles'
import LikeButton from '../../Button/LikeButton'
import CommentButton from '../../Button/CommentButton'
import CategoryButton from '../../Button/CategoryButton'
import { likeClickHandle } from '../../../Functions/Utils'

interface Props {
    resourceData: Resource;
    navigation: NativeStackNavigationProp<NavigationParamList>;
    styleContainer?: any;
    onDoubleClick: () => void;
}

export default function ResourceCardWithUser({ resourceData, navigation, styleContainer, onDoubleClick}: Props) {
    const [resource, setResource] = useState<Resource>(resourceData);
    const numberCommentResource = resource.comments.cache.size;
    const categories = Array.from(resource.categories.cache.values());

    const username = resource.creator ? `${resource.creator.name} ${resource.creator.firstname}` : "Utilisateur inconnu";
    const description = resource.description ?  resource.description : "Aucune description fournie" ;

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

    const onClickDetailResource = () => {
        navigation.navigate('ResourceDetails', {
            resource: resource,
            client: resource.client,
        });
    }
    
    return (
        <TouchableOpacity onPress={(e) => onPress(e)} style={[ResourceCardStyles.container, styleContainer]}>
            <View>
                <View style={ResourceCardStyles.lineButtonsAndUser}>
                    <Text style={ResourceCardStyles.cardTitle} numberOfLines={1}>{resource.title}</Text>
                    <View style={ResourceCardStyles.userAndButtonsContainer}>
                        <LikeButton resource={resource} setResource={setResource} onClick={onDoubleClick}/>
                        <CommentButton commentNumber={numberCommentResource}/>
                    </View>    
                </View>
                <Text style={ResourceCardStyles.cardUser} numberOfLines={1}>{username}</Text>
                <FlatList horizontal style={ResourceCardStyles.categoriesContainer} 
                    data={categories}
                    renderItem={({item}) => <CategoryButton navigation={navigation} category={item}/>}
                    keyExtractor={item => item.id}
                    showsHorizontalScrollIndicator={false}
                    />
                    {
                        styleContainer == null ? 
                        <Text style={ResourceCardStyles.cardText} numberOfLines={3}>{description}</Text>
                        :
                        <Text style={ResourceCardStyles.cardText}>{description}</Text>
                    }
            </View>
        </TouchableOpacity>
    )
}