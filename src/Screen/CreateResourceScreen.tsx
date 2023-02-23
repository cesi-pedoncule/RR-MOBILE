import { View, Text, ScrollView, TextInput, TouchableHighlight, Switch } from 'react-native'
import React, { useState } from 'react'
import CommonStyles from '../Styles/CommonStyles'
import TopBar from '../Components/Input/TopBar'
import NavBar from '../Components/NavBar'
import ReturnButton from '../Components/Button/ReturnButton'
import CreateResourceStyles from '../Styles/Screen/CreateResourceStyles'
import InputTextDescription from '../Components/Input/InputTextDescription'
import InputButton from '../Components/Button/InputButton'
import { Client } from 'rr-apilib'
import ButtonFile from '../Components/Button/ButtonFile'

export default function CreateResourceScreen({route} : any) {
    const client = route.params as Client;

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const onClickSend = () => {
        alert("TODO");
    }

    const onClickAddCategory = () => {
        alert("TODO");
    }

    const onClickAddFile = () => {
        alert("TODO");
    }

    return (
        <View style={CommonStyles.container}>
            <TopBar hideSearchBar={true}/>
            <View style={CommonStyles.content}>
                <ReturnButton/>
                <ScrollView style={CommonStyles.scrollView}>
                    <View style={CreateResourceStyles.container}>
                        <TextInput style={CreateResourceStyles.addNameResource} placeholder={"Titre de la ressource"}/>
                        <View style={CreateResourceStyles.categorieList}>
                            <TouchableHighlight onPress={onClickAddCategory} underlayColor={"#F0F0F0"}  style={CreateResourceStyles.addCategorieContainer}>
                                <Text style={CreateResourceStyles.addCategorieText}>{'+'}</Text>
                            </TouchableHighlight>
                        </View>
                        <InputTextDescription/>
                        <ButtonFile text={'Ajouter un fichier'} callBack={onClickAddFile}/>
                        <View style={CreateResourceStyles.switchContainer}>
                            <Switch style={CreateResourceStyles.switch} trackColor={{false: '#F0F0F0', true: '#F0F0F0'}} thumbColor={'#03989E'} onValueChange={toggleSwitch} value={isEnabled}/>
                            <Text>Privé / Publique</Text>
                        </View>
                        <InputButton label={'Envoyer'} callBack={onClickSend} style={CreateResourceStyles.sendButton}/>
                    </View>
                </ScrollView>
                <NavBar client={client}/>
            </View>
        </View>
    )
}