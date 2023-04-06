import { View, Text, FlatList, RefreshControl } from 'react-native'
import React, { useCallback, useState } from 'react'
import CommentCard from '../Components/Card/CommentCard'
import { Comment, Resource } from 'rr-apilib'
import ResourceDetailsStyles from "../Styles/Screen/ResourceDetailsStyles";
import TopBar from '../Components/Input/TopBar'
import CommonStyles from '../Styles/CommonStyles'
import InputTextComment from '../Components/Input/InputTextComment'
import ButtonFile from '../Components/Button/ButtonFile'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { NavigationParamList } from '../Types/navigation'
import IconButton from '../Components/Button/IconButton'
import ResourceCardWithUser from '../Components/Card/ResourceCardWithUser'

type Props = NativeStackScreenProps<NavigationParamList, 'ResourceDetails'>;

export default function ResourceDetailsScreen({ route, navigation }: Props) {
    const client = route.params.client;

    const [ resource, setResource ] = useState<Resource|undefined>(route.params.resource);
    const [ comments, setComments ] = useState<Comment[]>(Array.from(resource ? resource.comments.sort().values() : []));
    const [refreshing, setRefreshing] = useState(false);

    const fileName = "Télécharger les pièces jointes";

    const onClickFile = () => {
        //NO-OP
    }

    const onRefresh = useCallback(async () => {
        if(!resource){
            return
        } 
        const refreshResource = client.resources.cache.get(resource.id);
        setResource(undefined)
        refreshResource && setResource(refreshResource);
        setRefreshing(false)
    }, []);

    const renderHeader = () => {
		return resource ? (
			<View>
                <IconButton iconStyle={CommonStyles.returnBtnInFlatList} callBack={() => navigation.goBack()} iconSize={24} iconName={"arrow-left-top"}/>  
                <View style={CommonStyles.itemsContainer}>
                    <ResourceCardWithUser resourceData={resource} navigation={navigation} styleContainer={ResourceDetailsStyles.cardBackground} onDoubleClick={onRefresh}/>
                    <View style={ResourceDetailsStyles.btnFile}>
                        <ButtonFile text={fileName} callBack={onClickFile}/>
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
        :
        <View></View>
	}

    return resource ? (
        <View style={CommonStyles.container}>
            <TopBar hideSearchBar={true} navigation={navigation}/>
            <View style={CommonStyles.content}>
                <FlatList style={CommonStyles.itemsContainer} 
                    ListEmptyComponent={<Text style={CommonStyles.textEmptyResult}>Aucun commentaire n'a été posté.</Text>}
                    contentContainerStyle = {ResourceDetailsStyles.resourceContainer}
                    data={comments}
                    renderItem={({item}) => <CommentCard comment={item} setComments={setComments} resource={resource}/>}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    keyExtractor={item => item.id}
                    ListHeaderComponent={renderHeader}
                    onEndReachedThreshold={0}
                />
            </View>
        </View>
    )
    :
    <View></View>
}