import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import CommentCardStyles from '../../Styles/Components/Card/CommentCardStyles';
import { Client, Comment, Resource } from 'rr-apilib';
import IconButton from '../Button/IconButton';

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
        setComments(newComments);
        setNumberComment(newComments.length)
    };

    useEffect(() => {
        setIsDeleted(comment.user?.id == user?.id);
    })

    return (
        <View style={CommentCardStyles.cardBackground}>
            <View>
                <Text style={CommentCardStyles.cardUser}>{comment.user ? `${comment.user.name} ${comment.user.firstname}` : "Utilisateur inconnu"}</Text>
                <Text style={CommentCardStyles.cardComment}>{comment.comment}</Text>
            </View>
            {
                isDeleted && 
                <View style={CommentCardStyles.deleteCommentButton}>
                    <IconButton callBack={onClickDeleteComment} size={24} name={"delete-outline"} color={'black'}/>
                </View>
            }
        </View>
        
    )
}