import { View, Text, ScrollView, Switch, TouchableOpacity, TextInput, FlatList, ToastAndroid } from 'react-native'
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
import { Attachment, AttachmentBuilder, Category, Resource } from 'rr-apilib'
import IconButton from '../Components/Button/IconButton'
import * as DocumentPicker from 'expo-document-picker'
import MediaButton from '../Components/Button/MediaButton'

type Props = NativeStackScreenProps<NavigationParamList, 'EditResourceScreen'>;

export default function EditResourceScreen({ route, navigation }: Props) {

    const client = route.params.client;

    const resource:Resource = route.params.resource;
    const [ title, setTitle ] = useState<string>(resource ? resource.title : "");
    const [ description, setDescription ] = useState(resource ? resource.description : "");
    const [ categories, setCategories ] = useState<Category[]>(Array.from(resource ? resource.categories.cache.values() : []));
    const [ showSelectCategories, setShowSelectCategories ] = useState<boolean>(false);
    const [ isPublic, setIsPublic ] = useState(resource ? resource.isPublic : false);
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    // Les attachmentsBuilder sont les attachments qu'on rajoute, et qu'on peut supprimer comme pour dans CreateResourceScreen => des nouvelles attachments
    // Elles sont affichées sur l'écran
    const [ attachmentsBuilder, setAttachmentsBuilder ] = useState<AttachmentBuilder[]>([]);
    // Les attachmentsToDelete est une liste à la base vide, qu'on remplie à chaque fois qu'on veut supprimer une attachment, 
    // elle permet de supprimer les attachments, déjà présente avant l'édition, seulement si on valide la modification de la ressource 
    // Elles ne sont pas affichées
    const [ attachmentsToDelete, setAttachmentsToDelete ] = useState<Attachment[]>([]);
    // Les attachmentsToShow sont les attachments qui était déjà présente avantl'édition, qu'on montre à l'écran, 
    // et qu'on diminue quand on supprime une attachment => C'est juste un state de visualisation, elle n'est pas prise en compte au moment de valider la modif
    const [ attachmentsToShow, setAttachmentsToShow ] = useState<Attachment[]>(Array.from(resource.attachments.cache.values()));
    
    const toggleSwitch = () => setIsPublic(previousState => !previousState);

    const onClickSend = async () => {
        setIsLoading(true);

        try {
            resource.title = title;
            resource.description = description;
            
            await resource.categories.set(categories);
            await client.resources.edit(resource);

            attachmentsBuilder.map(async (attachment) => 
                await resource.attachments.create(attachment)
            );

            attachmentsToDelete.map(async (attachmentToDelete) =>
                await resource.attachments.delete(attachmentToDelete)
            );
            navigation.goBack();

        } catch(error) {
            ToastAndroid.show("Problème lors de l'édition" , ToastAndroid.CENTER);
        }

        setIsLoading(false);
    }

    const onClickAddCategory = () => {
        setShowSelectCategories(true);
    }

    const onClickAddFile = () => {
        DocumentPicker.getDocumentAsync({copyToCacheDirectory: false}).then(async (file) => {
            if(file.type === "success" && (attachmentsBuilder.length + resource.attachments.cache.size) < 6){
                const attachment = new AttachmentBuilder().setFile(file as any).setRessource(resource);
                attachmentsBuilder.push(attachment);
                setAttachmentsBuilder([...attachmentsBuilder ]);
            } else if (resource && attachmentsBuilder.length + resource.attachments.cache.size == 6) {
                ToastAndroid.show("Vous avez atteint le seuil maximum de fichier importé" , ToastAndroid.CENTER);
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
                        <TextInput style={EditResourceStyles.addNameResource} placeholder={"Titre de la ressource"} defaultValue={title} onChangeText={(text) => setTitle(text)}></TextInput>
                        <View style={EditResourceStyles.categorieContainer}>
                            <FlatList showsHorizontalScrollIndicator={false} horizontal style={EditResourceStyles.categorieList} 
                                data={categories}
                                renderItem={({item}) => <CategoryButton navigation={navigation} category={item}/>}
                                keyExtractor={item => item.id}
                            />
                            <TouchableOpacity onPress={onClickAddCategory} style={EditResourceStyles.addCategorieContainer}>
                                <Text style={EditResourceStyles.addCategorieText}>{'+'}</Text>
                            </TouchableOpacity>
                            <CategoriesModal client={client} showSelectCategories={showSelectCategories} setShowSelectCategories={setShowSelectCategories} setCategories={setCategories}/>
                        </View>
                        <InputTextDescription defaultValue={resource.description} onChangeText={(text) => setDescription(text)}/>
                        <ButtonFile text={'Ajouter un fichier'} callBack={onClickAddFile}/>
                        {
                            attachmentsToShow.map((attachment, index) => 
                                <MediaButton 
                                    isDeleted={true} 
                                    key={index} 
                                    idAttachement={index} 
                                    attachment={attachment} 
                                    attachementsToDelete={attachmentsToDelete} 
                                    setAttachementsToDelete={setAttachmentsToDelete} 
                                    attachementsToShow={attachmentsToShow}
                                    setAttachementsToShow={setAttachmentsToShow}
                                />
                            )
                        }
                        {
                            attachmentsBuilder.map((attachment, index) => 
                                <MediaButton 
                                    isDeleted={true} 
                                    key={index}
                                    idAttachement={index} 
                                    attachment={attachment.file!} 
                                    attachmentsBuilder={attachmentsBuilder} 
                                    setAttachementsBuilder={setAttachmentsBuilder} 
                                />
                            )
                        }
                        <View style={EditResourceStyles.switchContainer}>
                            <Switch trackColor={{false: COLORS.ComponentBackground, true: COLORS.ComponentBackground}} thumbColor={COLORS.AccentColor} onValueChange={toggleSwitch} value={isPublic}/>
                            <Text style={{color: COLORS.Black}}> Privé / Publique </Text>
                        </View>
                        <InputButton label={'Modifier'} isDisabled={isLoading} isLoading={isLoading} callBack={onClickSend} style={EditResourceStyles.sendButton}/>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}