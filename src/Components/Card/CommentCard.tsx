import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Client, Comment, Resource } from 'rr-apilib';
import CommentCardStyles from '../../Styles/Components/Card/CommentCardStyles';
import IconButton from '../Button/IconButton';
import { COLORS } from '../../Styles/Colors';

interface Props {
    comment: Comment;
    setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
    setNumberComment: React.Dispatch<React.SetStateAction<number>>;
    client: Client;
    resource: Resource;
}

export default function CommentCard({comment, client, setComments, setNumberComment, resource}:Props) {
    const [isDeleted, setIsDeleted] = useState<boolean>(false);
    const user = client.auth.me;

    const onClickDeleteComment = async () => {
        const res = await resource.comments.delete(comment);
        const newComments:Comment[] = Array.from(res.comments.cache.values());
        setComments(newComments.reverse());
        setNumberComment(newComments.length)
    };

    useEffect(() => {
        setIsDeleted(comment.user?.id == user?.id);
    })

    return (
        <View style={CommentCardStyles.container}>
            <View style={CommentCardStyles.infoContainer}>
                <Text style={CommentCardStyles.cardUser}>{comment.user ? `${comment.user.name} ${comment.user.firstname}` : "Utilisateur inconnu"}</Text>
                <Text style={CommentCardStyles.cardComment}>{comment.comment}</Text>
            </View>
            <Text style={CommentCardStyles.cardDate}>{comment.createdAt.toLocaleDateString("fr-FR")}</Text>
            {
                isDeleted && 
                <View style={CommentCardStyles.deleteCommentButton}>
                    <IconButton callBack={onClickDeleteComment} size={24} name={"delete-outline"} color={COLORS.Black}/>
                </View>
            }
        </View>
        
    )
}
