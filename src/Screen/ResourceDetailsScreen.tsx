import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import CommentCard from '../Components/Card/CommentCard'
import LikeButton from '../Components/Button/LikeButton'
import CommentButton from '../Components/Button/CommentButton'
import { Category, Client, Comment } from 'rr-apilib'
import NavBar from '../Components/NavBar'
import ResourceDetailsStyles from "../Styles/Screen/ResourceDetailsStyles";
import TopBar from '../Components/Input/TopBar'
import ReturnButton from '../Components/Button/ReturnButton'
import ButtonShowMoreItems from '../Components/Button/ButtonShowMoreItems'
import CategoryButton from '../Components/Button/CategoryButton'
import CommonStyles from '../Styles/CommonStyles'

export default function ResourceDetailsScreen({ route }: any) {

    const client = route.params as Client;
    
    const [isLikeResource, setIsLikeResource] = useState(false);
    const [numberLikeResource, setNumberLikeResource] = useState(0);
    const [comments, setComments] = useState<Comment[]>(Array.from(route.params.comments));
    const [categories, setCategories] = useState<Category[]>(Array.from(route.params.categories));

    const title = route.params.title;
    const username = route.params.user ? `${route.params.user.name} ${route.params.user.firstname}` : "Utilisateur inconnu";
    
    // Set the description to "Aucune description fournie" if the description is null or undefined
    const description = route.params.description ? (route.params.description) : "Aucune description fournie" ;

    const [showMoreItems, setShowMoreItems] = useState(false);
    
    const onClickLike = () => {
        setIsLikeResource(!isLikeResource);
        isLikeResource? setNumberLikeResource(numberLikeResource - 1) : setNumberLikeResource(numberLikeResource + 1);
    }
    
    const onClickComment = () => {
        //NO-OP
    }

    const onClickShowMoreItems = () => {
        setShowMoreItems(true);
    }

    return (
        <View style={CommonStyles.container}>
            <TopBar hideSearchBar={true}/>
            <View style={CommonStyles.content}>
                <ScrollView style={CommonStyles.scrollView}>
                    <ReturnButton/>
                    <View style={ResourceDetailsStyles.centerContent}>
                        <View style={ResourceDetailsStyles.cardBackground}>
                            <View style={ResourceDetailsStyles.lineLikeAndUser}>
                                <Text style={ResourceDetailsStyles.cardUser}>{username}</Text>
                                <View style={ResourceDetailsStyles.likeBtn}>
                                    <LikeButton callBack={onClickLike} isLike={isLikeResource} likeNumber={numberLikeResource}/>
                                    <CommentButton callBack={onClickComment} commentNumber={comments.length}/>
                                </View>

                            </View>
                            <Text style={ResourceDetailsStyles.cardTitle}>{title}</Text>
                            <View style={ResourceDetailsStyles.categoriesContainer}>
                                {
                                    categories.map((category, i) => {
                                        return <CategoryButton key={i} category={category}></CategoryButton>
                                    })
                                }
                            </View>
                            <Text style={ResourceDetailsStyles.cardText}>{description}</Text>
                        </View>
                        <Text style={ResourceDetailsStyles.cardText}>{description}</Text>
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
                            comments.length === 0 && <Text>Aucun commentaire</Text>
                        }
                        {
                            !showMoreItems && comments.length >= 6 && <ButtonShowMoreItems callBack={onClickShowMoreItems} />
                        }
                    </View>          
                </ScrollView>
            <NavBar client={client}/>
            </View>
        </View>
    )
}