import { View, Text, ScrollView, TouchableOpacity, GestureResponderEvent } from 'react-native'
import React, { useState } from 'react'
import CommentCard from '../Components/Card/CommentCard'
import LikeButton from '../Components/Button/LikeButton'
import CommentButton from '../Components/Button/CommentButton'
import { Category, Client, Comment, Resource } from 'rr-apilib'
import NavBar from '../Components/NavBar'
import ResourceDetailsStyles from "../Styles/Screen/ResourceDetailsStyles";
import TopBar from '../Components/Input/TopBar'
import ReturnButton from '../Components/Button/ReturnButton'
import ButtonShowMoreItems from '../Components/Button/ButtonShowMoreItems'
import CategoryButton from '../Components/Button/CategoryButton'
import CommonStyles from '../Styles/CommonStyles'
import { likeClickHandle } from '../Functions/Utils'
import InputTextComment from '../Components/Input/InputTextComment'
import ButtonFile from '../Components/Button/ButtonFile'

export default function ResourceDetailsScreen({ route }: any) {

    const client = route.params as Client;
    const resource = route.params.resource as Resource;

    const [isLikeResource, setIsLikeResource] = useState(false);
    const [numberLike, setNumberLike] = useState(resource.likes.cache.size);
    const [comments, setComments] = useState<Comment[]>(Array.from(resource.comments.cache.values()));
    const [numberComment, setNumberComment] = useState(comments.length);
    const [categories, setCategories] = useState<Category[]>(Array.from(resource.categories.cache.values()));

    const title = resource.title;
    const username = resource.user ? `${resource.user.name} ${resource.user.firstname}` : "Utilisateur inconnu";
    
    // Set the description to "Aucune description fournie" if the description is null or undefined
    const description = resource.description ? (resource.description) : "Aucune description fournie" ;

    const fileName = "Télécharger les pièces jointes";

    const [showMoreItems, setShowMoreItems] = useState(false);

    let timeout: NodeJS.Timeout | null = null;

    const onPress = (e: GestureResponderEvent) => {

        e.preventDefault();

        if(timeout) {
            clearTimeout(timeout);
            timeout = null;
            likeClickHandle(resource, isLikeResource, setIsLikeResource, numberLike, setNumberLike);
            return;
        }

        timeout = setTimeout(() => {
            timeout = null;
        }, 300);
    }
    
    const onClickComment = () => {
        //NO-OP
    }

    const onClickFile = () => {
        //NO-OP
    }

    const onClickShowMoreItems = () => {
        setShowMoreItems(true);
    }

    return (
        <View style={CommonStyles.container}>
            <TopBar hideSearchBar={true}/>
            <View style={CommonStyles.content}>
                <ReturnButton/>
                <ScrollView style={CommonStyles.scrollView}>
                    <TouchableOpacity onPress={(e) => onPress(e)} activeOpacity={1}>
                        <View style={ResourceDetailsStyles.centerContent}>
                            <View style={ResourceDetailsStyles.cardBackground}>
                                <View style={ResourceDetailsStyles.lineLikeAndUser}>
                                    <Text style={ResourceDetailsStyles.cardUser}>{username}</Text>
                                    <View style={ResourceDetailsStyles.likeBtn}>
                                        <LikeButton
                                            resource={resource}
                                            isLikeResource={isLikeResource}
                                            setIsLikeResource={setIsLikeResource}
                                            numberLike={numberLike}
                                            setNumberLike={setNumberLike}
                                        />
                                        <CommentButton commentNumber={numberComment}/>
                                    </View>
                                </View>
                                <Text style={ResourceDetailsStyles.cardTitle}>{title}</Text>
                                <View style={ResourceDetailsStyles.categoriesContainer}>
                                    {
                                        categories.map((category, i) => {
                                            return (
                                                category && <CategoryButton key={i} category={category}></CategoryButton>
                                            )
                                        })
                                    }
                                </View>
                                <Text style={ResourceDetailsStyles.cardText}>{description}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={ResourceDetailsStyles.btnFile}>
                        <ButtonFile text={fileName} callBack={onClickFile}/>
                    </View>
                    <Text style={ResourceDetailsStyles.commentTitle}>Commentaires</Text>
                    <View style={ResourceDetailsStyles.commentContainer}>
                        <InputTextComment resource={resource} setComments={setComments} setNumberComment={setNumberComment}/>
                        <View style={ResourceDetailsStyles.listComment}> 
                            {   
                                comments.map((comment, i) => {
                                    if ((!showMoreItems && i < 6) || showMoreItems) {
                                        return <CommentCard key={i} comment={comment} />
                                    }
                                })
                            }          
                        </View>
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