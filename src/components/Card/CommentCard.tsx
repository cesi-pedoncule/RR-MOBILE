import { View, Text } from 'react-native'
import React from 'react'
import CommentCardStyles from '../../styles/Component/CommentCardStyles';
import { Comment } from 'rr-apilib';

interface Props {
    comment: Comment;
}

export default function CommentCard({comment}:Props) {
    return (
        <View style={CommentCardStyles.cardBackground}>
            <Text style={CommentCardStyles.cardUser}>{comment.user ? `${comment.user.name} ${comment.user.firstname}` : "Utilisateur inconnu"}</Text>
            <Text style={CommentCardStyles.cardComment}>{comment.comment}</Text>
        </View>
    )
}