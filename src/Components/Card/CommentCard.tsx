import { View, Text, ScrollView, ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Comment, Resource } from 'rr-apilib';
import CommentCardStyles from '../../Styles/Components/Card/CommentCardStyles';
import IconButton from '../Button/IconButton';
import { COLORS } from '../../Styles/Colors';

interface Props {
    comment: Comment;
    setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
    resource: Resource;
}

export default function CommentCard({comment, setComments, resource}:Props) {
    const [isDeleted, setIsDeleted] = useState<boolean>(false);
    const user = resource.client.auth.me;
    const [ isLoading, setIsLoading ] = useState<boolean>(false);

    const onClickDeleteComment = async () => {
        setIsLoading(true);

        try {
            const res = await resource.comments.delete(comment);
            const newComments:Comment[] = Array.from(res.comments.cache.values());
            setComments(newComments);
        } catch(error) {
            ToastAndroid.show("Problème lors de la suppression" , ToastAndroid.CENTER);
        }

        setIsLoading(false);
    };

    useEffect(() => {
        setIsDeleted(comment.user?.id == user?.id);
    })

    const getDateCreation = () => {
        let localDateString:string;
        const hourDateString:string = comment.createdAt.getHours()<10 ? "0"+comment.createdAt.getHours() : comment.createdAt.getHours().toString();
        const minuteDateString:string = comment.createdAt.getMinutes()<10 ? "0"+comment.createdAt.getMinutes() : comment.createdAt.getMinutes().toString();
        if(comment.createdAt.toLocaleDateString("fr-FR") == new Date().toLocaleDateString("fr-FR")){
            localDateString = "Aujourd'hui";
        }
        else {
            localDateString = comment.createdAt.toLocaleDateString("fr-FR");
        }
        

        return localDateString+"     "+hourDateString+":"+minuteDateString;
    }

    return (
        <View style={CommentCardStyles.container}>
            <View style={CommentCardStyles.infoContainer}>
                <ScrollView style={CommentCardStyles.cardUser} horizontal showsHorizontalScrollIndicator={false}><Text style={CommentCardStyles.textCardUser}>{comment.user ? `${comment.user.name} ${comment.user.firstname}` : "Utilisateur inconnu"}</Text></ScrollView>
                <Text style={CommentCardStyles.cardComment}>{comment.comment}</Text>
            </View>
            <Text style={CommentCardStyles.cardDate}>{getDateCreation()}</Text>
            {
                isDeleted && 
                <View style={CommentCardStyles.deleteCommentButton}>
                    <IconButton 
                        isDisabled={isLoading} 
                        isLoading={isLoading} 
                        callBack={onClickDeleteComment} 
                        iconSize={24} 
                        iconStyle={CommentCardStyles.buttonsDeleteResource} 
                        iconName={"delete-outline"} 
                        iconColor={COLORS.Black}
                    />
                </View>
            }
        </View>
        
    )
}
