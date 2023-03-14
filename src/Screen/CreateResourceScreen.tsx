import { View, Text, ScrollView, TextInput, Switch, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import CommonStyles from '../Styles/CommonStyles'
import TopBar from '../Components/Input/TopBar'
import ReturnButton from '../Components/Button/ReturnButton'
import CreateResourceStyles from '../Styles/Screen/CreateResourceStyles'
import InputTextDescription from '../Components/Input/InputTextDescription'
import InputButton from '../Components/Button/InputButton'
import { Client, ResourceBuilder } from 'rr-apilib'
import ButtonFile from '../Components/Button/ButtonFile'

export default function CreateResourceScreen({route, navigation} : any) {
    const client = route.params as Client;
    const [newResource] = useState<ResourceBuilder>(new ResourceBuilder());

    const [isPublic, setIsPublic] = useState(false);
    const toggleSwitch = () => setIsPublic(previousState => !previousState);

    const onClickSend = () => {
        newResource.setIsPublic(isPublic);
        client.resources.create(newResource);
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
                    <View style={CreateResourceStyles.container}>
                        <TextInput style={CreateResourceStyles.addNameResource} placeholder={"Titre de la ressource"} onChangeText={(text) => newResource.setTitle(text)}/>
                        <View style={CreateResourceStyles.categorieList}>
                            <TouchableOpacity onPress={onClickAddCategory} style={CreateResourceStyles.addCategorieContainer}>
                                <Text style={CreateResourceStyles.addCategorieText}>{'+'}</Text>
                            </TouchableOpacity>
                        </View>
                        <InputTextDescription onChangeText={(text) => newResource.setDescription(text)} defaultValue={""}/>
                        <ButtonFile text={'Ajouter un fichier'} callBack={onClickAddFile}/>
                        <View style={CreateResourceStyles.switchContainer}>
                            <Switch trackColor={{false: '#F0F0F0', true: '#F0F0F0'}} thumbColor={'#03989E'} onValueChange={toggleSwitch} value={isPublic}/>
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