import { View, Text, ScrollView, Switch, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import CommonStyles from '../Styles/CommonStyles'
import EditResourceStyles from '../Styles/Screen/EditResourceStyles'
import TopBar from '../Components/Input/TopBar'
import ReturnButton from '../Components/Button/ReturnButton'
import InputButton from '../Components/Button/InputButton'
import InputTextDescription from '../Components/Input/InputTextDescription'
import ButtonFile from '../Components/Button/ButtonFile'
import { Client, Resource } from 'rr-apilib'
import { COLORS } from '../Styles/Colors'

export default function EditResourceScreen({route, navigation} : any) {

    const client = route.params as Client;
    const resource = route.params.resource as Resource;

    const [isPublic, setIsPublic] = useState(resource.isPublic);
    
    const toggleSwitch = () => setIsPublic(previousState => !previousState);

    const onClickSend = () => {
        client.resources.edit(resource);
        navigation.goBack();
    }

    const onClickAddCategory = () => {
        alert("TODO");
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
                    <View style={EditResourceStyles.container}>
                        <TextInput style={EditResourceStyles.addNameResource} placeholder={"Titre de la ressource"} onChangeText={(text) => resource.title=text}></TextInput>
                        <View style={EditResourceStyles.categorieList}>
                            <TouchableOpacity onPress={onClickAddCategory} style={EditResourceStyles.addCategorieContainer}>
                                <Text style={EditResourceStyles.addCategorieText}>{'+'}</Text>
                            </TouchableOpacity>
                        </View>
                        <InputTextDescription onChangeText={(text) => resource.description=text}></InputTextDescription>
                        <ButtonFile text={'Ajouter un fichier'} callBack={onClickAddFile}/>
                        <View style={EditResourceStyles.switchContainer}>
                            <Switch trackColor={{false: COLORS.ComponentBackground, true: COLORS.ComponentBackground}} thumbColor={COLORS.AccentColor} onValueChange={toggleSwitch} value={isPublic}/>
                            <Text> Privé / Publique </Text>
                        </View>
                        <InputButton label={'Envoyer'} callBack={onClickSend} style={EditResourceStyles.sendButton}/>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}