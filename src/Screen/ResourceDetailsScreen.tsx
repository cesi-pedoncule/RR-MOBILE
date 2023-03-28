import { View, Text, ActivityIndicator, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import CommentCard from '../Components/Card/CommentCard'
import { Comment } from 'rr-apilib'
import ResourceDetailsStyles from "../Styles/Screen/ResourceDetailsStyles";
import TopBar from '../Components/Input/TopBar'
import CommonStyles from '../Styles/CommonStyles'
import InputTextComment from '../Components/Input/InputTextComment'
import ButtonFile from '../Components/Button/ButtonFile'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { NavigationParamList } from '../Types/navigation'
import IconButton from '../Components/Button/IconButton'
import { COLORS } from '../Styles/Colors'
import ResourceCardWithUser from '../Components/Card/ResourceCardWithUser'

type Props = NativeStackScreenProps<NavigationParamList, 'ResourceDetails'>;

export default function ResourceDetailsScreen({ route, navigation }: Props) {
    
    const resource = route.params.resource;
    const client = route.params.client;

    const [ commentsSlice, setCommentsSlice ] = useState<Comment[]>([]);
    const [ comments, setComments ] = useState<Comment[]>(Array.from(resource.comments.cache.reverse().values()));

    const fileName = "Télécharger les pièces jointes";

    const onClickFile = () => {
        //NO-OP
    }

    useEffect(() => {
        if (commentsSlice.length === 0 && comments.length !== 0) {
            setCommentsSlice(comments.slice(0, 6));
        }
    }, [comments])

    const onShowMoreItems = () => {
		setCommentsSlice(commentsSlice.concat(comments.slice(commentsSlice.length, commentsSlice.length + 6)));
	}

    const renderHeader = () => {
		return (
			<View>
                <IconButton style={CommonStyles.returnBtnInFlatList} callBack={() => navigation.goBack()} size={24} name={"arrow-left-top"}/>  
                <View style={CommonStyles.itemsContainer}>
                    <ResourceCardWithUser resource={resource} navigation={navigation} styleContainer={ResourceDetailsStyles.cardBackground}/>
                    <View style={ResourceDetailsStyles.btnFile}>
                        <ButtonFile text={fileName} callBack={onClickFile}/>
                    </View>
                    <Text style={ResourceDetailsStyles.commentTitle}>Commentaires</Text>
                    <View style={ResourceDetailsStyles.commentContainer}>
                        {
                            client.auth.me && <InputTextComment resource={resource} setComments={setComments} setCommentsSlice={setCommentsSlice}/>
                        }
                    </View>          
                </View>
            </View>
		)
	}

    const renderFooter = () => {
		return (
			<View>
				{
					comments.length >= 6 && commentsSlice.length !== comments.length &&
					<ActivityIndicator size="large" color={COLORS.AccentColor} style={CommonStyles.loadMoreContent} />
				}	
			</View>
		)
	}

    return (
        <View style={CommonStyles.container}>
            <TopBar hideSearchBar={true} navigation={navigation}/>
            <View style={CommonStyles.content}>
                <FlatList style={CommonStyles.itemsContainer} 
                    ListEmptyComponent={<Text style={CommonStyles.textEmptyResult}>Aucun commentaire n'a été posté.</Text>}
                    contentContainerStyle = {ResourceDetailsStyles.resourceContainer}
                    data={commentsSlice}
                    renderItem={({item}) => <CommentCard comment={item} setComments={setComments} setCommentsSlice={setCommentsSlice} resource={resource}/>}
                    keyExtractor={item => item.id}
                    ListHeaderComponent={renderHeader}
                    ListFooterComponent={renderFooter}
                    onEndReached={onShowMoreItems}
                    onEndReachedThreshold={0}
                />
            </View>
        </View>
    )
}