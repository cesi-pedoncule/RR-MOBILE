import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import CommentCard from '../Components/Card/CommentCard'
import LikeButton from '../Components/Button/LikeButton'
import CommentButton from '../Components/Button/CommentButton'
import { Client, Comment } from 'rr-apilib'
import NavBar from '../Components/NavBar'
import ResourceDetailsStyles from "../Styles/Screen/ResourceDetailsStyles";
import TopBar from '../Components/Input/TopBar'
import ReturnButton from '../Components/Button/ReturnButton'
import ButtonShowMoreItems from '../Components/Button/ButtonShowMoreItems'

export default function ResourceDetailsScreen({ route }: any) {

    const client = route.params as Client;
    
    const [isLikeResource, setIsLikeResource] = useState(false);
    const [numberLikeResource, setNumberLikeResource] = useState(0);
    const [comments, setComments] = useState<Comment[]>(Array.from(route.params.comments));
    const [numberCommentResource, setNumberCommentResource] = useState(comments.length);
    
    const onClickLike = () => {
        setIsLikeResource(!isLikeResource);
        isLikeResource? setNumberLikeResource(numberLikeResource - 1) : setNumberLikeResource(numberLikeResource + 1);
    }
    
    const onClickComment = () => {
        //NO-OP
    }

    const [showMoreItems, setShowMoreItems] = useState(false);

    const onClickShowMoreItems = () => {
        setShowMoreItems(true);
    }

    const title = route.params.title;
    const username = route.params.user ? `${route.params.user.name} ${route.params.user.firstname}` : "Utilisateur inconnu";
    
    // Set the description to "Aucune description fournie" if the description is null or undefined
    const description = route.params.description ? (route.params.description) : "Aucune description fournie" ;

    return (
        <View style={ResourceDetailsStyles.container}>
            <TopBar hideSearchBar={true}/>
            <ScrollView style={ResourceDetailsStyles.contentWithTopBar}>
                <ReturnButton/>
                <View style={ResourceDetailsStyles.centerContent}>
                    <View style={ResourceDetailsStyles.cardBackground}>
                        <View style={ResourceDetailsStyles.lineLikeAndUser}>
                            <Text style={ResourceDetailsStyles.cardUser}>{username}</Text>
                            <View style={ResourceDetailsStyles.likeBtn}>
                                <LikeButton callBack={onClickLike} isLike={isLikeResource} likeNumber={numberLikeResource}/>
                                <CommentButton callBack={onClickComment} commentNumber={numberCommentResource}/>
                            </View>
                        </View>
                        <Text style={ResourceDetailsStyles.cardTitle}>{title}</Text>
                        <Text style={ResourceDetailsStyles.cardText}>{description}</Text>
                    </View>
                </View>
                <Text style={ResourceDetailsStyles.commentTitle}>Commentaires</Text>
                <View style={ResourceDetailsStyles.commentContainer}>
                    {
                        comments.map((comment, i) => {
                            if ((!showMoreItems && i < 6) || showMoreItems) {
                                return <CommentCard key={i} comment={comment}></CommentCard>
                            }
                        })
                    }
                    {
                        numberCommentResource === 0 && <Text style={ResourceDetailsStyles.noComment}>Aucun commentaire</Text>
                    }
                    {
                        !showMoreItems && numberCommentResource > 1 && <ButtonShowMoreItems callBack={onClickShowMoreItems} />
                    }
                </View>          
            </ScrollView>
            <NavBar client={client}/>
        </View>
    )
}