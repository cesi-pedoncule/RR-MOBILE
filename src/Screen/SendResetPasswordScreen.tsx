import { View, Text, ScrollView, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { NavigationParamList } from '../Types/navigation'
import CommonStyles from '../Styles/CommonStyles'
import TopBar from '../Components/Input/TopBar'
import Header from '../Components/Header'
import InputButton from '../Components/Button/InputButton'
import SendResetPasswordStyles from '../Styles/Screen/SendResetPasswordStyles'
import InputText from '../Components/Input/InputText'
import IconButton from '../Components/Button/IconButton'

type Props = NativeStackScreenProps<NavigationParamList, 'SendResetPassword'>

export default function SendResetPasswordScreen({ route, navigation }: Props) {
    
    const client = route.params.client;

    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const [ email, setEmail ] = useState<string>('');
    const [ isValidEmail, setIsValidEmail] = useState<boolean>(true)

    const onClickSendReset = async () => {
        setIsLoading(true);
        if(isValidEmail && email != "") {
            try {
                await client.auth.sendResetPasswordMail(email);
                navigation.navigate("Login", { client })
            } catch (error) {
                ToastAndroid.show("Une erreur s'est produite " , ToastAndroid.CENTER);
                console.log(error)
            }
        } else {
            setIsValidEmail(false);
            ToastAndroid.show('Veuiller entrer un mail valide' , ToastAndroid.CENTER);
        }
        setIsLoading(false);
    };

    const validateEmail = (email:string) => {
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(email);
    };

    const onBlurEmail = () => {
        !validateEmail(email) && 
        ToastAndroid.show('Email invalide' , ToastAndroid.CENTER);
        setIsValidEmail(validateEmail(email) )
    }


    return (
        <View style={CommonStyles.container}>
            <TopBar hideSearchBar={true} hideHomeButton={false} navigation={navigation} client={client}/>
            <View style={CommonStyles.content}>
                <View style={SendResetPasswordStyles.container}>
                    <View style={{marginTop : 20, marginLeft: 15}}>
                        <IconButton iconStyle={CommonStyles.returnBtnInFlatList} callBack={() => navigation.goBack()} iconSize={24} iconName={"arrow-left-top"}/>  
                    </View>
                    <ScrollView style={CommonStyles.itemsContainer} showsVerticalScrollIndicator={false}>
                        <View style={{alignItems: 'center', paddingHorizontal: 30}}>
                            <Header label="Renitialisation du mot de passe" />
                        </View>
                        <View style={SendResetPasswordStyles.loginContainer}>
                            <InputText placeholder="Email" type='email-address' onChangeText={(value) => setEmail(value)} onBlur={onBlurEmail} isValid={isValidEmail} />
                        </View>
                        <View style={SendResetPasswordStyles.sendMailContainer}>
                            <InputButton isLoading={isLoading} label="Envoyer la demande" callBack={onClickSendReset} style={SendResetPasswordStyles.loginButton} />
                        </View>
                    </ScrollView>
                </View>
            </View>
        </View>
    )
}