import { View, Text, FlatList } from 'react-native'
import React, { useState } from 'react'
import CommentCard from '../Components/Card/CommentCard'
import { Attachment, Comment } from 'rr-apilib'
import ResourceDetailsStyles from "../Styles/Screen/ResourceDetailsStyles";
import TopBar from '../Components/Input/TopBar'
import CommonStyles from '../Styles/CommonStyles'
import InputTextComment from '../Components/Input/InputTextComment'
import ButtonFile from '../Components/Button/ButtonFile'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { NavigationParamList } from '../Types/navigation'
import IconButton from '../Components/Button/IconButton'
import ResourceCardWithUser from '../Components/Card/ResourceCardWithUser'
import MediaButton from '../Components/Button/MediaButton';

type Props = NativeStackScreenProps<NavigationParamList, 'ResourceDetails'>;

export default function ResourceDetailsScreen({ route, navigation }: Props) {
    
    const resource = route.params.resource;
    const client = route.params.client;

    const [ comments, setComments ] = useState<Comment[]>(Array.from(resource.comments.cache.values()));

    const fileName = "Télécharger les pièces jointes";

    const onClickFile = () => {
        //NO-OP
    }

    console.log(Array.from(resource.attachments.cache.values()))
    console.log(resource.attachments.resource)
    console.log(resource.attachments.cache.values())

    const renderHeader = () => {
		return (
			<View>
                <IconButton iconStyle={CommonStyles.returnBtnInFlatList} callBack={() => navigation.goBack()} iconSize={24} iconName={"arrow-left-top"}/>  
                <View style={CommonStyles.itemsContainer}>
                    <ResourceCardWithUser resourceData={resource} navigation={navigation} styleContainer={ResourceDetailsStyles.cardBackground}/>
                    <View style={ResourceDetailsStyles.btnFile}>
                        <ButtonFile text={fileName} callBack={onClickFile}/>
                        {
                            Array.from(resource.attachments.resource.attachments.cache.values()).map((attachment, index) => (
                                    <MediaButton attachment={attachment} client={client} key={index}/>
                                )
                            )
                        }
                    </View>
                    <Text style={ResourceDetailsStyles.commentTitle}>Commentaires</Text>
                    <View style={ResourceDetailsStyles.commentContainer}>
                        {
                            client.auth.me && <InputTextComment resource={resource} setComments={setComments}/>
                        }
                    </View>          
                </View>
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
                    data={comments}
                    renderItem={({item}) => <CommentCard comment={item} setComments={setComments} resource={resource}/>}
                    keyExtractor={item => item.id}
                    ListHeaderComponent={renderHeader}
                    onEndReachedThreshold={0}
                />
            </View>
        </View>
    )
}