import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import CommentCard from '../components/Card/CommentCard'
import LikeButton from '../components/Button/LikeButton'
import CommentButton from '../components/Button/CommentButton'
import { Client } from 'rr-apilib'
import NavBar from '../components/NavBar'
import ResourceDetailStyles from "../styles/Screen/ResourceDetailStyles";
import TopBar from '../components/TopBar'
import ReturnButton from '../components/Button/ReturnButton'
import ButtonShowMoreItems from '../components/Button/ButtonShowMoreItems'

export default function ResourceDetailScreen({ route }: any) {

    const client = route.params as Client;
    
    const [isLikeResource, setIsLikeResource] = useState(false);
    const [numberLikeResource, setNumberLikeResource] = useState(0);
    const [numberCommentResource, setNumberCommentResource] = useState(0);
    
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
        <View style={ResourceDetailStyles.container}>
            <TopBar hideSearchBar={true}/>
            <ScrollView style={ResourceDetailStyles.contentWithTopBar}>
                <ReturnButton/>
                <View style={ResourceDetailStyles.centerContent}>
                    <View style={ResourceDetailStyles.cardBackground}>
                        <View style={ResourceDetailStyles.lineLikeAndUser}>
                            <Text style={ResourceDetailStyles.cardUser}>{username}</Text>
                            <View style={ResourceDetailStyles.likeBtn}>
                                <LikeButton callBack={onClickLike} isLike={isLikeResource} likeNumber={numberLikeResource}/>
                                <CommentButton callBack={onClickComment} commentNumber={numberCommentResource}/>
                            </View>
                        </View>
                        <Text style={ResourceDetailStyles.cardTitle}>{title}</Text>
                        <Text style={ResourceDetailStyles.cardText}>{description}</Text>
                    </View>
                </View>
                <Text style={ResourceDetailStyles.commentTitle}>Commentaires</Text>
                <View style={ResourceDetailStyles.commentContainer}>
                    <CommentCard userName={'User Name'} comment={'Sunt minim anim amet elit. Magna sunt officia minim nulla id duis cupidatat do voluptate ea. Laboris ea id veniam consectetur reprehenderit fugiat laboris. Lorem officia sit nulla nulla. Mollit aliquip cupidatat nostrud ex magna ullamco consequat fugiat sunt consectetur ad qui elit.'}></CommentCard>
                    <CommentCard userName={'User Name'} comment={'Sunt minim anim amet elit. Magna sunt officia minim nulla id duis cupidatat do voluptate ea. Laboris ea id veniam consectetur reprehenderit fugiat laboris. Lorem officia sit nulla nulla. Mollit aliquip cupidatat nostrud ex magna ullamco consequat fugiat sunt consectetur ad qui elit.'}></CommentCard>
                    <CommentCard userName={'User Name'} comment={'Sunt minim anim amet elit. Magna sunt officia minim nulla id duis cupidatat do voluptate ea. Laboris ea id veniam consectetur reprehenderit fugiat laboris. Lorem officia sit nulla nulla. Mollit aliquip cupidatat nostrud ex magna ullamco consequat fugiat sunt consectetur ad qui elit.'}></CommentCard>
                    {
                        !showMoreItems ?
                        <ButtonShowMoreItems callBack={onClickShowMoreItems} />
                        : null
                    }
                </View>          
            </ScrollView>
            <NavBar client={client}/>
        </View>
    )
}