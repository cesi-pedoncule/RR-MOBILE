import React, { useState } from 'react'
import { Category, Client, Resource } from 'rr-apilib'
import { View,Text, TouchableOpacity, GestureResponderEvent } from 'react-native'
import LikeButton from '../Button/LikeButton'
import CommentButton from '../Button/CommentButton'
import CategoryButton from '../Button/CategoryButton'
import { likeClickHandle } from '../../Functions/Utils'
import ResourceCardStyles from '../../Styles/Components/Card/ResourceCardStyles'
import IconButton from '../Button/IconButton'

interface Props {
    resource: Resource;
    inShareResourceScreens?: boolean;
    navigation: any;
    client?: Client;
    setResources?: React.Dispatch<React.SetStateAction<Resource[]>>;
    setResourcesFiltered?: React.Dispatch<React.SetStateAction<Resource[]>>;
}

export default function ResourceCard({ resource, inShareResourceScreens=false, client, setResources, setResourcesFiltered, navigation}: Props) {
    const [numberLike, setNumberLike] = useState(resource.likes.cache.size);
    const [isLikeResource, setIsLikeResource] = useState<boolean>(resource.isLiked());
    const [numberCommentResource, setNumberCommentResource] = useState(resource.comments.cache.size);
    const [categories, setCategories] = useState<Category[]>(Array.from(resource.categories.cache.values()));

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
        navigation.navigate('EditResourceScreen',  {resource: resource});
    }

    const onClickDetailResource = () => {
        navigation.navigate('ResourceDetails', {resource: resource});
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
                    <View style={ResourceCardStyles.categoriesContainer}>
                        {
                            categories.map((category, i) => {
                                return <CategoryButton key={i} category={category} />
                            })
                        }
                    </View>
                    <Text style={ResourceCardStyles.cardText} numberOfLines={3}>{description}</Text>
                </View>
                :
                <View style={ResourceCardStyles.withoutUserContainer}>
                    <Text style={ResourceCardStyles.cardTitle} numberOfLines={1}>{resource.title}</Text>
                    <View style={ResourceCardStyles.categoriesContainer}>
                        {
                            categories.map((category, i) => {
                                return <CategoryButton key={i} category={category} />
                            })
                        }
                    </View>
                    <Text style={ResourceCardStyles.cardText} numberOfLines={3}>{description}</Text>
                    <View style={ResourceCardStyles.buttonsContainer}>
                        <LikeButton resource={resource} isLikeResource={isLikeResource} setIsLikeResource={setIsLikeResource} numberLike={numberLike} setNumberLike={setNumberLike}/>
                        <CommentButton commentNumber={numberCommentResource}/>
                    </View>
                    <View style={ResourceCardStyles.buttonsEditContainer}>
                        <IconButton callBack={onClickDeleteResource} size={24} name={"delete-outline"} color={'black'}/>
                        <IconButton callBack={onClickEditResource} size={24} name={"square-edit-outline"} color={'black'}/>
                    </View>
                </View>
            }
        </TouchableOpacity>
    )
}