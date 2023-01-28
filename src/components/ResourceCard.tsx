import { Resource } from 'rr-apilib'
import React, { useState } from 'react'
import { View, Text } from 'react-native'

import LikeButton from './LikeButton'
import ResourceCardStyles from '../styles/ResourceCardStyles'

interface Props {
    resource: Resource;
}

export default function ResourceCard({ resource }: Props) {

    const [isLikeResource, setIsLikeResource] = useState(false);
    const [numberLikeResource, setNumberLikeResource] = useState(0);

    const username = resource.user ? `${resource.user.name} ${resource.user.firstname}` : "Utilisateur inconnu";

    const onClickLike = () => {
        setIsLikeResource(!isLikeResource);
        isLikeResource? setNumberLikeResource(numberLikeResource - 1) : setNumberLikeResource(numberLikeResource + 1);
    }

  return (
        <View style={ResourceCardStyles.cardBackground}>
            <View>
                <View style={ResourceCardStyles.lineLikeAndUser}>
                    <Text style={ResourceCardStyles.cardUser}>{username}</Text>
                    <View style={ResourceCardStyles.likeBtn}>
                        <LikeButton callBack={onClickLike} isLike={isLikeResource} likeNumber={numberLikeResource}/>
                    </View>
                </View>
                <Text style={ResourceCardStyles.cardTitle}>{resource.title}</Text>
            </View>
            <Text style={ResourceCardStyles.cardText}>{resource.description ?? "Aucunne description fournie"}</Text>
        </View>
  )
}