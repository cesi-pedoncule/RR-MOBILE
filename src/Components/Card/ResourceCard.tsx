import React, { useState } from 'react'
import { Category, Resource } from 'rr-apilib'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import {
    View,
    Text,
    TouchableHighlight,
    GestureResponderEvent
} from 'react-native'

import LikeButton from '../Button/LikeButton'
import CommentButton from '../Button/CommentButton'
import CategoryButton from '../Button/CategoryButton'
import { likeClickHandle } from '../../Functions/Utils'

import ResourceCardStyles from '../../Styles/Components/Card/ResourceCardStyles'

type ResourceCardParams = {
    ResourceDetails: { resource: Resource };
}

interface Props {
    resource: Resource;
    callBack: () => void;
}

export default function ResourceCard({ resource, callBack }: Props) {

    const navigation = useNavigation<StackNavigationProp<ResourceCardParams>>();

    const [numberLike, setNumberLike] = useState(resource.likes.cache.size);
    const [isLikeResource, setIsLikeResource] = useState<boolean>(resource.hasLike());
    const [categories, setCategories] = useState<Category[]>(Array.from(resource.categories.cache.values()));

    const username = resource.user ? `${resource.user.name} ${resource.user.firstname}` : "Utilisateur inconnu";
    // Set the description to "Aucune description fournie" if the description is null or undefined and if the description is longer than 217 characters, cut it and add "..." at the end
    const description = resource.description ? (resource.description?.length > 217 ? resource.description?.substring(0, 217) + "..." : resource.description) : "Aucune description fournie" ;
    
    const numberCommentResource = resource.comments.cache.size;

    const onClickComment = () => {
        navigation.navigate("ResourceDetails", { resource: resource });
    }

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
            callBack();
        }, 300);
    }

    return (
        <TouchableHighlight onPress={(e) => onPress(e)} underlayColor={"#000000'"} style={ResourceCardStyles.cardBackground}>
            <View>
                <View style={ResourceCardStyles.lineLikeAndUser}>
                    <Text style={ResourceCardStyles.cardUser} numberOfLines={1}>{username}</Text>
                    <View style={ResourceCardStyles.likeBtn}>
                        <LikeButton
                            resource={resource}
                            isLikeResource={isLikeResource}
                            setIsLikeResource={setIsLikeResource}
                            numberLike={numberLike}
                            setNumberLike={setNumberLike}
                        />
                        <CommentButton callBack={onClickComment} commentNumber={numberCommentResource}/>
                    </View>    
                </View>
                <Text style={ResourceCardStyles.cardTitle} numberOfLines={1}>{resource.title}</Text>
                <View style={ResourceCardStyles.categoriesContainer}>
                    {
                        categories.map((category, i) => {
                            return <CategoryButton key={i} category={category}></CategoryButton>
                        })
                    }
                </View>
                <Text style={ResourceCardStyles.cardText} numberOfLines={3}>{description}</Text>
            </View>
        </TouchableHighlight>
    )
}