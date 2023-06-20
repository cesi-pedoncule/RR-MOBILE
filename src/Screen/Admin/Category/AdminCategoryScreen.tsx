import { View, Text, Switch, TextInput, ScrollView, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import TopBar from '../../../Components/Input/TopBar';
import CommonStyles from '../../../Styles/CommonStyles';
import IconButton from '../../../Components/Button/IconButton';
import InputButton from '../../../Components/Button/InputButton';
import { NavigationParamList } from '../../../Types/navigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { COLORS } from '../../../Styles/Colors';
import AdminCategoryStyles from '../../../Styles/Screen/Admin/Category/AdminCategoryStyles';

type Props = NativeStackScreenProps<NavigationParamList, 'AdminCategory'>;

export default function AdminCategoryScreen({ route, navigation }: Props) {

    const client = route.params.client;
    const category = route.params.category;
    
    const toggleSwitch = () => setIsVisible(previousState => !previousState);

    const [ name, setName ] = useState<string>(category.name);
    const [ isVisible, setIsVisible ] = useState<boolean>(category.isVisible);
    const [ isLoadingEdit, setIsLoadingEdit ] = useState<boolean>(false);
    const [ isLoadingDelete, setIsLoadingDelete ] = useState<boolean>(false);

    const onClickSend = async () => {
        setIsLoadingEdit(true);

        if(name !== "") {
            try {
                category.name = name;
                category.isVisible = isVisible;
        
                await client.categories.edit(category);
    
                navigation.goBack();
            } catch(error) {
                ToastAndroid.show("Problème lors de la modification" , ToastAndroid.CENTER);
            }
        } else {
            ToastAndroid.show("Veuillez mettre un titre" , ToastAndroid.CENTER);
        }

        setIsLoadingEdit(false);
    };

    const onClickDelete = async () => {
        setIsLoadingDelete(true);

        try {
            await client.categories.delete(category);

            navigation.goBack();
        } catch(error) {
            ToastAndroid.show("Problème lors de la suppression" , ToastAndroid.CENTER);
        }

        setIsLoadingDelete(false);
    };

    return (
        <View style={CommonStyles.container}>
            <TopBar hideSearchBar={true} hideHomeButton={false} client={client} navigation={navigation} />
            <View style={CommonStyles.content}>
                <View style={{marginTop : 20, marginLeft: 15}}>
                    <IconButton iconStyle={CommonStyles.returnBtnInFlatList} callBack={() => navigation.goBack()} iconSize={24} iconName={"arrow-left-top"}/>  
                </View>
                <ScrollView contentContainerStyle={AdminCategoryStyles.scrollViewContainer}>
                    <TextInput style={AdminCategoryStyles.addNameCategory} placeholder={"Titre de la catégorie"} onChangeText={(text) => setName(text)} defaultValue={name}/>
                    <View style={AdminCategoryStyles.switchContainer}>
                        <Switch trackColor={{false: COLORS.ComponentBackground, true: COLORS.ComponentBackground}} thumbColor={COLORS.AccentColor} onValueChange={toggleSwitch} value={isVisible}/>
                        <Text style={{color: COLORS.Black}}> Invisible / Visible </Text>
                    </View>
                    <View style={AdminCategoryStyles.buttonsContainer}>
                        <InputButton label={'Modifier'} isDisabled={isLoadingEdit || isLoadingDelete} isLoading={isLoadingEdit} callBack={onClickSend} style={AdminCategoryStyles.sendButton}/>
                        <InputButton label={'Suppprimer'} isDisabled={isLoadingEdit || isLoadingDelete} isLoading={isLoadingDelete} callBack={onClickDelete} style={AdminCategoryStyles.sendButton}/>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}