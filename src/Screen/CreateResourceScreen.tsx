import { View, Text, ScrollView, TextInput, Switch, TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import CommonStyles from '../Styles/CommonStyles'
import TopBar from '../Components/Input/TopBar'
import ReturnButton from '../Components/Button/ReturnButton'
import CreateResourceStyles from '../Styles/Screen/CreateResourceStyles'
import InputTextDescription from '../Components/Input/InputTextDescription'
import InputButton from '../Components/Button/InputButton'
import { Category, ResourceBuilder } from 'rr-apilib'
import ButtonFile from '../Components/Button/ButtonFile'
import { NavigationParamList } from '../Types/navigation'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import CategoriesModal from '../Components/CategoriesModal'
import CategoryButton from '../Components/Button/CategoryButton'
import { COLORS } from '../Styles/Colors'

type Props = NativeStackScreenProps<NavigationParamList, 'CreateResourceScreen'>;

export default function CreateResourceScreen({ route, navigation }: Props) {
    const client = route.params.client;

    const [newResource] = useState<ResourceBuilder>(new ResourceBuilder());
    const [showSelectCategories, setShowSelectCategories] = useState<boolean>(false);
    const [isPublic, setIsPublic] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const toggleSwitch = () => setIsPublic(previousState => !previousState);

    const onClickSend = () => {
        newResource.setIsPublic(isPublic);
        newResource.setCategories(categories);
        client.resources.create(newResource);
        navigation.goBack();
    }

    const onClickAddCategory = () => {
        setShowSelectCategories(true);
    }

    const onClickAddFile = () => {
        alert("TODO");
    }

    return (
        <View style={CommonStyles.container}>
            <TopBar hideSearchBar={true} navigation={navigation}/>
            <View style={CommonStyles.content}>
                <ReturnButton/>
                <ScrollView style={CommonStyles.scrollView}>
                    <View style={CreateResourceStyles.container}>
                        <TextInput style={CreateResourceStyles.addNameResource} placeholder={"Titre de la ressource"} onChangeText={(text) => newResource.setTitle(text)}/>
                        <ScrollView showsHorizontalScrollIndicator={false} horizontal style={CreateResourceStyles.categorieList}>
                            {
                                categories.map((category, id) => 
                                    <CategoryButton key={id} navigation={navigation} category={category}/>
                                )
                            }
                            <TouchableOpacity onPress={onClickAddCategory} style={CreateResourceStyles.addCategorieContainer}>
                                <Text style={CreateResourceStyles.addCategorieText}>{'+'}</Text>
                            </TouchableOpacity>
                            <CategoriesModal client={client} showSelectCategories={showSelectCategories} setShowSelectCategories={setShowSelectCategories} categories={categories} setCategories={setCategories}/>
                        </ScrollView>
                        <InputTextDescription onChangeText={(text) => newResource.setDescription(text)} defaultValue={""}/>
                        <ButtonFile text={'Ajouter un fichier'} callBack={onClickAddFile}/>
                        <View style={CreateResourceStyles.switchContainer}>
                            <Switch trackColor={{false: COLORS.ComponentBackground, true: COLORS.ComponentBackground}} thumbColor={COLORS.AccentColor} onValueChange={toggleSwitch} value={isPublic}/>
                            <Text> Privé / Publique </Text>
                        </View>
                        <View style={CreateResourceStyles.sendButtonContainer}>
                            <InputButton label={'Envoyer'} callBack={onClickSend} style={CreateResourceStyles.sendButton}/>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}