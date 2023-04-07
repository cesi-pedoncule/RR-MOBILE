import { View, Text, ScrollView, Switch, TouchableOpacity, TextInput, FlatList } from 'react-native'
import React, { useState } from 'react'
import CommonStyles from '../Styles/CommonStyles'
import EditResourceStyles from '../Styles/Screen/EditResourceStyles'
import TopBar from '../Components/Input/TopBar'
import InputButton from '../Components/Button/InputButton'
import InputTextDescription from '../Components/Input/InputTextDescription'
import ButtonFile from '../Components/Button/ButtonFile'
import { COLORS } from '../Styles/Colors'
import { NavigationParamList } from '../Types/navigation'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import CategoriesModal from '../Components/CategoriesModal'
import CategoryButton from '../Components/Button/CategoryButton'
import { AttachmentBuilder, Resource, Category } from 'rr-apilib'
import IconButton from '../Components/Button/IconButton'
import * as DocumentPicker from 'expo-document-picker'
import MediaButton from '../Components/Button/MediaButton'

type Props = NativeStackScreenProps<NavigationParamList, 'EditResourceScreen'>;

export default function EditResourceScreen({ route, navigation }: Props) {

    const client = route.params.client;

    const [ resource, setResource ] = useState<Resource>(route.params.resource);
    const [ newResource ] = useState<Resource>(route.params.resource);
    const [ showSelectCategories, setShowSelectCategories ] = useState<boolean>(false);
    const [ isPublic, setIsPublic ] = useState(resource.isPublic);
    
    const toggleSwitch = () => setIsPublic(previousState => !previousState);

    const onClickSend = async () => {
        setResource(newResource);
        await resource.categories.set(Array.from(newResource.categories.cache.values()));
        await client.resources.edit(resource);

        navigation.goBack();
    }

    const onClickAddCategory = () => {
        setShowSelectCategories(true);
    }

    const onClickAddFile = () => {
        DocumentPicker.getDocumentAsync({copyToCacheDirectory: false}).then(async (file) => {
            if(file.type === "success"){
                const attachment = new AttachmentBuilder().setFile(file).setRessource(resource);
                await resource.attachments.create(attachment)
                console.log(resource.attachments);
            }
        })
    }

    return (
        <View style={CommonStyles.container}>
            <TopBar hideSearchBar={true} navigation={navigation}/>
            <View style={CommonStyles.content}>
                <IconButton iconStyle={CommonStyles.returnBtn} callBack={() => navigation.goBack()} iconSize={24} iconName={"arrow-left-top"}/>  
                <ScrollView style={CommonStyles.itemsContainer}>
                    <View style={EditResourceStyles.container}>
                        <TextInput style={EditResourceStyles.addNameResource} placeholder={"Titre de la ressource"} defaultValue={resource.title} onChangeText={(text) => newResource.title = text}></TextInput>
                        <View style={EditResourceStyles.categorieContainer}>
                            <FlatList showsHorizontalScrollIndicator={false} horizontal style={EditResourceStyles.categorieList} 
                                data={Array.from(resource.categories.cache.values())}
                                renderItem={({item}) => <CategoryButton navigation={navigation} category={item}/>}
                                keyExtractor={item => item.id}
                            />
                            <TouchableOpacity onPress={onClickAddCategory} style={EditResourceStyles.addCategorieContainer}>
                                <Text style={EditResourceStyles.addCategorieText}>{'+'}</Text>
                            </TouchableOpacity>
                            <CategoriesModal client={client} showSelectCategories={showSelectCategories} setShowSelectCategories={setShowSelectCategories} resource={resource}/>
                        </View>
                        <InputTextDescription defaultValue={resource.description} onChangeText={(text) => newResource.description = text}/>
                        <ButtonFile text={'Ajouter un fichier'} callBack={onClickAddFile}/>
                        {
                            Array.from(resource.attachments.cache.values()).map((attachment, index) => 
                                <MediaButton key={index} attachment={attachment}/>
                            )
                        }
                        <View style={EditResourceStyles.switchContainer}>
                            <Switch trackColor={{false: COLORS.ComponentBackground, true: COLORS.ComponentBackground}} thumbColor={COLORS.AccentColor} onValueChange={toggleSwitch} value={isPublic}/>
                            <Text style={{color: COLORS.Black}}> Privé / Publique </Text>
                        </View>
                        <InputButton label={'Modifier'} callBack={onClickSend} style={EditResourceStyles.sendButton}/>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}