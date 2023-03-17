import React, { useState } from 'react'
import { Client, Resource } from 'rr-apilib'
import { NavigationParamList } from '../../Types/navigation'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { View, Text, TouchableOpacity, GestureResponderEvent, ScrollView, FlatList } from 'react-native'
import ResourceCardStyles from '../../Styles/Components/Card/ResourceCardStyles'
import IconButton from '../Button/IconButton'
import LikeButton from '../Button/LikeButton'
import CommentButton from '../Button/CommentButton'
import CategoryButton from '../Button/CategoryButton'
import { likeClickHandle } from '../../Functions/Utils'
import { COLORS } from '../../Styles/Colors'

interface Props {
    resource: Resource;
    inShareResourceScreens?: boolean;
    navigation: NativeStackNavigationProp<NavigationParamList>;
    client?: Client;
    setResources?: React.Dispatch<React.SetStateAction<Resource[]>>;
    setResourcesFiltered?: React.Dispatch<React.SetStateAction<Resource[]>>;
}

export default function ResourceCard({ resource, inShareResourceScreens=false, client, setResources, setResourcesFiltered, navigation}: Props) {
    const [numberLike, setNumberLike] = useState(resource.likes.cache.size);
    const [isLikeResource, setIsLikeResource] = useState<boolean>(resource.isLiked());
    const numberCommentResource = resource.comments.cache.size;
    const categories = Array.from(resource.categories.cache.values());

    const username = resource.user ? `${resource.user.name} ${resource.user.firstname}` : "Utilisateur inconnu";
    const description = resource.description ?  resource.description : "Aucune description fournie" ;

    let timeout: NodeJS.Timeout | null = null;

    const onPress = (e: GestureResponderEvent) => {

        e.preventDefault();

        if(timeout) {
            clearTimeout(timeout);
            timeout = null;
            likeClickHandle(resource, isLikeResource, setIsLikeResource, numberLike, setNumberLike);
            return;
        }

        timeout = setTimeout(() => {
            timeout = null;
            onClickDetailResource();
        }, 300);
    }

    const onClickDeleteResource = () => {
        if(client != null && setResources != null && setResourcesFiltered != null){
            client.resources.cache.delete(resource.id);
            const newResources = Array.from(client.resources.cache.values());
            setResources(newResources);
            setResourcesFiltered(newResources);
        }
    }

    const onClickEditResource = () => {
        navigation.navigate('EditResourceScreen',  {
            resource: resource,
            client: resource.client,
        });
    }

    const onClickDetailResource = () => {
        navigation.navigate('ResourceDetails', {
            resource: resource,
            client: resource.client,
        });
    }

    return (
        <TouchableOpacity onPress={(e) => onPress(e)} style={ResourceCardStyles.container}>
            {
                !inShareResourceScreens ? 
                <View>
                    <View style={ResourceCardStyles.lineButtonsAndUser}>
                        <Text style={ResourceCardStyles.cardUser} numberOfLines={1}>{username}</Text>
                        <View style={ResourceCardStyles.userAndButtonsContainer}>
                            <LikeButton resource={resource} isLikeResource={isLikeResource} setIsLikeResource={setIsLikeResource} numberLike={numberLike} setNumberLike={setNumberLike}/>
                            <CommentButton commentNumber={numberCommentResource}/>
                        </View>    
                    </View>
                    <Text style={ResourceCardStyles.cardTitle} numberOfLines={1}>{resource.title}</Text>
                    <FlatList horizontal style={ResourceCardStyles.categoriesContainer} 
                        data={categories}
                        renderItem={({item}) => <CategoryButton navigation={navigation} category={item}/>}
                        keyExtractor={item => item.id}
                     />
                    <Text style={ResourceCardStyles.cardText} numberOfLines={3}>{description}</Text>
                </View>
                :
                <View style={ResourceCardStyles.withoutUserContainer}>
                    <Text style={ResourceCardStyles.cardTitle} numberOfLines={1}>{resource.title}</Text>
                    <View>
                        <FlatList showsHorizontalScrollIndicator={false} horizontal style={ResourceCardStyles.categoriesContainer} 
                            data={categories}
                            renderItem={({item}) => <CategoryButton navigation={navigation} category={item}/>}
                            keyExtractor={item => item.id}
                        />
                    </View>
                    <Text style={ResourceCardStyles.cardText} numberOfLines={3}>{description}</Text>
                    <View style={ResourceCardStyles.buttonsContainer}>
                        <LikeButton resource={resource} isLikeResource={isLikeResource} setIsLikeResource={setIsLikeResource} numberLike={numberLike} setNumberLike={setNumberLike}/>
                        <CommentButton commentNumber={numberCommentResource}/>
                    </View>
                    <View style={ResourceCardStyles.buttonsEditContainer}>
                        <IconButton callBack={onClickDeleteResource} size={24} name={"delete-outline"} color={COLORS.Black}/>
                        <IconButton callBack={onClickEditResource} size={24} name={"square-edit-outline"} color={COLORS.Black}/>
                    </View>
                </View>
            }
        </TouchableOpacity>
    )
}