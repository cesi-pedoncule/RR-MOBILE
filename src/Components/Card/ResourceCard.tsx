import { Resource } from 'rr-apilib'
import React, { useState } from 'react'
import { View, Text, TouchableHighlight } from 'react-native'

import LikeButton from '../Button/LikeButton'
import ResourceCardStyles from '../../Styles/Components/Card/ResourceCardStyles'
import CommentButton from '../Button/CommentButton'

interface Props {
    resource: Resource;
    callBack: () => void;
}

export default function ResourceCard({ resource, callBack }: Props) {

    const [isLikeResource, setIsLikeResource] = useState<boolean>(false);
    const [numberLikeResource, setNumberLikeResource] = useState<number>(0);
    const [numberCommentResource, setNumberCommentResource] = useState<number>(0);

    const username = resource.user ? `${resource.user.name} ${resource.user.firstname}` : "Utilisateur inconnu";
    // Set the description to "Aucune description fournie" if the description is null or undefined and if the description is longer than 217 characters, cut it and add "..." at the end
    const description = resource.description ? (resource.description?.length > 217 ? resource.description?.substring(0, 217) + "..." : resource.description) : "Aucune description fournie" ;

    const onClickLike = () => {
        setIsLikeResource(!isLikeResource);
        isLikeResource? setNumberLikeResource(numberLikeResource - 1) : setNumberLikeResource(numberLikeResource + 1);
    }

    const onClickComment = () => {
        alert('TODO: Navigate to DetailResource Screen');
    }

    return (
        <View style={ResourceCardStyles.cardBackground}>
            <TouchableHighlight onPress={callBack} underlayColor={"#FFFFFF"} >
                <View>
                    <View style={ResourceCardStyles.lineLikeAndUser}>
                        <Text style={ResourceCardStyles.cardUser} numberOfLines={1}>{username}</Text>
                        <View style={ResourceCardStyles.likeBtn}>
                            <LikeButton callBack={onClickLike} isLike={isLikeResource} likeNumber={numberLikeResource}/>
                            <CommentButton callBack={onClickComment} commentNumber={numberCommentResource}/>
                        </View>    
                    </View>
                    <Text style={ResourceCardStyles.cardTitle} numberOfLines={1}>{resource.title}</Text>
                    <Text style={ResourceCardStyles.cardText} numberOfLines={3}>{description}</Text>
                </View>
            </TouchableHighlight>
        </View>
    )
}