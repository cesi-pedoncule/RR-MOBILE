import { View, TextInput, Text, Switch, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigationParamList } from '../../../Types/navigation';
import TopBar from '../../../Components/Input/TopBar';
import CommonStyles from '../../../Styles/CommonStyles';
import IconButton from '../../../Components/Button/IconButton';
import { ScrollView } from 'react-native-gesture-handler';
import AdminCreateCategoryStyles from '../../../Styles/Screen/Admin/Category/AdminCreateCategoryStyles';
import { CategoryBuilder } from 'rr-apilib';
import { COLORS } from '../../../Styles/Colors';
import InputButton from '../../../Components/Button/InputButton';

type Props = NativeStackScreenProps<NavigationParamList, 'AdminCreateCategory'>;

export default function AdminCreateCategoryScreen({ route, navigation }: Props) {

    const client = route.params.client;
    const toggleSwitch = () => setIsVisible(previousState => !previousState);

    const newCategory = new CategoryBuilder();
    const [ isVisible, setIsVisible ] = useState<boolean>(false);
    const [ isLoading, setIsLoading ] = useState<boolean>(false);

    const onClickSend = async () => {
        setIsLoading(true);

        if(newCategory.name !== "") {
            try {
                newCategory.setIsVisible(isVisible);
        
                await client.categories.create(newCategory);
    
                navigation.goBack();
            } catch(error) {
                ToastAndroid.show("Problème lors de la création" , ToastAndroid.CENTER);
            }
        } else {
            ToastAndroid.show("Veuillez mettre un titre" , ToastAndroid.CENTER);
        }

        setIsLoading(false);
    };

    return (
        <View style={CommonStyles.container}>
            <TopBar hideSearchBar={true} hideHomeButton={false} client={client} navigation={navigation} />
            <View style={CommonStyles.content}>
                <View style={{marginTop : 20, marginLeft: 15}}>
                    <IconButton iconStyle={CommonStyles.returnBtnInFlatList} callBack={() => navigation.goBack()} iconSize={24} iconName={"arrow-left-top"}/>  
                </View>
                <ScrollView contentContainerStyle={AdminCreateCategoryStyles.scrollViewContainer}>
                    <TextInput style={AdminCreateCategoryStyles.addNameCategory} placeholder={"Titre de la catégorie"} onChangeText={(text) => newCategory.setName(text)}/>
                    <View style={AdminCreateCategoryStyles.switchContainer}>
                        <Switch trackColor={{false: COLORS.ComponentBackground, true: COLORS.ComponentBackground}} thumbColor={COLORS.AccentColor} onValueChange={toggleSwitch} value={isVisible}/>
                        <Text style={{color: COLORS.Black}}> Invisible / Visible </Text>
                    </View>
                    <InputButton label={'Envoyer'} isDisabled={isLoading} isLoading={isLoading} callBack={onClickSend} style={AdminCreateCategoryStyles.sendButton}/>
                </ScrollView>
            </View>
        </View>
    )
}