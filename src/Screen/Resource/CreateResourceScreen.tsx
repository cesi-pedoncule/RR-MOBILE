import { View, Text, ScrollView, TextInput, Switch, TouchableOpacity, FlatList, ToastAndroid} from 'react-native';
import React, { useState } from 'react';
import CommonStyles from '../../Styles/CommonStyles';
import TopBar from '../../Components/Input/TopBar';
import CreateResourceStyles from '../../Styles/Screen/Resource/CreateResourceStyles';
import InputTextDescription from '../../Components/Input/InputTextDescription';
import InputButton from '../../Components/Button/InputButton';
import { AttachmentBuilder, Category, ResourceBuilder } from 'rr-apilib';
import ButtonFile from '../../Components/Button/ButtonFile';
import { NavigationParamList } from '../../Types/navigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CategoriesModal from '../../Components/CategoriesModal';
import CategoryButton from '../../Components/Button/CategoryButton';
import { COLORS } from '../../Styles/Colors';
import IconButton from '../../Components/Button/IconButton';
import * as DocumentPicker from 'expo-document-picker';
import MediaButton from '../../Components/Button/MediaButton';

type Props = NativeStackScreenProps<NavigationParamList, 'CreateResourceScreen'>;

export default function CreateResourceScreen({ route, navigation }: Props) {
    const client = route.params.client;
    const user = client.auth.me;

    const [ attachmentsBuilder, setAttachmentsBuilder ] = useState<AttachmentBuilder[]>([]);
    const [ newResource ] = useState<ResourceBuilder>(new ResourceBuilder());
    const [ showSelectCategories, setShowSelectCategories ] = useState<boolean>(false);
    const [ isPublic, setIsPublic ] = useState<boolean>(false);
    const [ categories, setCategories ] = useState<Category[]>([]);
    const [ isLoading, setIsLoading ] = useState<boolean>(false);

    const toggleSwitch = () => setIsPublic(previousState => !previousState);

    const onClickSend = async () => {
        setIsLoading(true);

        try {
            newResource.setIsPublic(isPublic);
            newResource.setCategories(categories);
    
            newResource.setAttachments(attachmentsBuilder);
    
            if(user){
                await user.resources.create(newResource);
            }
            navigation.goBack();

        } catch(error) {
            ToastAndroid.show("Problème lors de la création" , ToastAndroid.CENTER);
        }

        setIsLoading(false);
    }

    const onClickAddCategory = () => {
        setShowSelectCategories(true);
    }

    const onClickAddFile = () => {
        DocumentPicker.getDocumentAsync({copyToCacheDirectory: false}).then((file) => {
            if(file.type === "success" && attachmentsBuilder.length < 6){
                const attachment = new AttachmentBuilder().setFile(file as any);
                attachmentsBuilder.push(attachment);
                setAttachmentsBuilder([...attachmentsBuilder ]);
            } else if (attachmentsBuilder.length == 6) {
                ToastAndroid.show("Vous avez atteint le seuil maximum de fichier importé" , ToastAndroid.CENTER);
            }
        })
    }



    return (
        <View style={CommonStyles.container}>
            <TopBar hideSearchBar={true} navigation={navigation} client={client}/>
            <View style={CommonStyles.content}>
                <IconButton iconStyle={CommonStyles.returnBtn} callBack={() => navigation.goBack()} iconSize={24} iconName={"arrow-left-top"}/>  
                <ScrollView style={CommonStyles.itemsContainer} showsVerticalScrollIndicator={false}>
                    <View style={CreateResourceStyles.container}>
                        <TextInput style={CreateResourceStyles.addNameResource} placeholder={"Titre de la ressource"} onChangeText={(text) => newResource.setTitle(text)}/>
                        <View style={CreateResourceStyles.categorieContainer}>
                            <FlatList showsHorizontalScrollIndicator={false} horizontal style={CreateResourceStyles.categorieList} 
                                data={categories}
                                renderItem={({item}) => <CategoryButton navigation={navigation} category={item}/>}
                                keyExtractor={item => item.id}
                            />
                            <TouchableOpacity onPress={onClickAddCategory} style={CreateResourceStyles.addCategorieContainer}>
                                <Text style={CreateResourceStyles.addCategorieText}>{'+'}</Text>
                            </TouchableOpacity>
                            <CategoriesModal client={client} showSelectCategories={showSelectCategories} setShowSelectCategories={setShowSelectCategories} setCategories={setCategories}/>
                        </View>
                        <InputTextDescription onChangeText={(text) => newResource.setDescription(text)} defaultValue={""}/>
                        <ButtonFile text={'Ajouter un fichier'} callBack={onClickAddFile}/>
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
                        <View style={CreateResourceStyles.switchContainer}>
                            <Switch trackColor={{false: COLORS.ComponentBackground, true: COLORS.ComponentBackground}} thumbColor={COLORS.AccentColor} onValueChange={toggleSwitch} value={isPublic}/>
                            <Text style={{color: COLORS.Black}}> Privé / Publique </Text>
                        </View>
                        <View style={CreateResourceStyles.sendButtonContainer}>
                            <InputButton label={'Envoyer'} isDisabled={isLoading} isLoading={isLoading} callBack={onClickSend} style={CreateResourceStyles.sendButton}/>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}