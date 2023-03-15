import { View, Text, ScrollView, TouchableOpacity, GestureResponderEvent } from 'react-native'
import React, { useState } from 'react'
import CommentCard from '../Components/Card/CommentCard'
import LikeButton from '../Components/Button/LikeButton'
import CommentButton from '../Components/Button/CommentButton'
import { Category, Comment } from 'rr-apilib'
import ResourceDetailsStyles from "../Styles/Screen/ResourceDetailsStyles";
import TopBar from '../Components/Input/TopBar'
import ReturnButton from '../Components/Button/ReturnButton'
import ButtonShowMoreItems from '../Components/Button/ButtonShowMoreItems'
import CategoryButton from '../Components/Button/CategoryButton'
import CommonStyles from '../Styles/CommonStyles'
import { likeClickHandle } from '../Functions/Utils'
import InputTextComment from '../Components/Input/InputTextComment'
import ButtonFile from '../Components/Button/ButtonFile'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { NavigationParamList } from '../Types/navigation'

type Props = NativeStackScreenProps<NavigationParamList, 'ResourceDetails'>;

export default function ResourceDetailsScreen({ route, navigation }: Props) {
    
    const resource = route.params.resource;
    const client = route.params.client;

    const [ isLikeResource, setIsLikeResource ] = useState<boolean>(resource.isLiked());
    const [ numberLike, setNumberLike ] = useState<number>(resource.likes.cache.size);
    const [ comments, setComments ] = useState<Comment[]>(Array.from(resource.comments.cache.values()));
    const [ numberComment, setNumberComment ] = useState<number>(comments.length);
    const [ categories ] =  useState<Category[]>(Array.from(resource.categories.cache.values()));

    const title = resource.title;
    const username = resource.user ? `${resource.user.name} ${resource.user.firstname}` : "Utilisateur inconnu";

    // Set the description to "Aucune description fournie" if the description is null or undefined
    const description = resource.description ? (resource.description) : "Aucune description fournie" ;

    const fileName = "Télécharger les pièces jointes";

    const [ showMoreItems, setShowMoreItems ] = useState<boolean>(false);

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

    const onClickFile = () => {
        //NO-OP
    }

    const onClickShowMoreItems = () => {
        setComments(comments.reverse());
        setShowMoreItems(true);
    }

    return (
        <View style={CommonStyles.container}>
            <TopBar hideSearchBar={true} navigation={navigation}/>
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
                                        categories.map((category, i) =>
                                            category && <CategoryButton key={i} navigation={navigation} category={category} />
                                        )
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
                        {
                            client.auth.me && <InputTextComment resource={resource} setComments={setComments} setNumberComment={setNumberComment}/>
                        }
                        <View style={ResourceDetailsStyles.listComment}> 
                            {   
                                comments.reverse().map((comment, i) => {
                                    if ((!showMoreItems && i < 6) || showMoreItems) {
                                        return <CommentCard key={i} comment={comment} client={resource.client} setComments={setComments} setNumberComment={setNumberComment} resource={resource}/>
                                    }
                                })
                            }          
                        </View>
                        {
                            comments.length === 0 && <Text style={CommonStyles.textEmptyResult}>Aucun commentaire</Text>
                        }
                        {
                            !showMoreItems && comments.length >= 6 && <ButtonShowMoreItems callBack={onClickShowMoreItems} />
                        }
                    </View>          
                </ScrollView>
            </View>
        </View>
    )
}