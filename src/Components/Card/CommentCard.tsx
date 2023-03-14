import React from 'react'
import { Comment } from 'rr-apilib';
import { View, Text } from 'react-native'

import CommentCardStyles from '../../Styles/Components/Card/CommentCardStyles';

interface Props {
    comment: Comment;
}

export default function CommentCard({ comment }: Props) {
    return (
        <View style={CommentCardStyles.cardBackground}>
            <Text style={CommentCardStyles.cardUser}>{comment.user ? `${comment.user.name} ${comment.user.firstname}` : "Utilisateur inconnu"}</Text>
            <Text style={CommentCardStyles.cardComment}>{comment.comment}</Text>
        </View>
    )
}