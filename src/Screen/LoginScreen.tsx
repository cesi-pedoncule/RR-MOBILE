import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import Header from "../Components/Header";
import InputButton from "../Components/Button/InputButton";
import Link from "../Components/Button/Link";
import CommonStyles from "../Styles/CommonStyles";
import LoginStyles from "../Styles/Screen/LoginStyles";
import InputText from "../Components/Input/InputText";
import { Client } from "rr-apilib";
import TopBar from "../Components/Input/TopBar";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({ route, navigation }: any) {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const client = route.params as Client;

    const onClickRegisterText = () => {
        navigation.navigate('Register');
    }

    const onClickLoginButton = async () => {
        setIsLoading(true);

        try {
            await client.auth.login('user0@example.com', 'password');
            await AsyncStorage.setItem('token', client.auth.token+'');
            await AsyncStorage.setItem('refresh_token', client.auth.refresh_token+'');

            await client.users.fetchAll();
            await client.categories.fetchAll();
            await client.resources.fetchAll();
            await client.validations.fetchAll();

            navigation.navigate('Resources');
        } catch (error) {
            alert('Mauvais identifiants');
        }
        setIsLoading(false);
    }

    const checkIsAuth = async () => {

        await client.users.fetchAll();
        await client.categories.fetchAll();
        await client.resources.fetchAll();
        await client.validations.fetchAll();
        
        if (client.auth.me != null) {
            navigation.navigate('Resources');
        } else {
            // Check if token is in storage
            const token = await AsyncStorage.getItem('token');
            const refresh_token = await AsyncStorage.getItem('refresh_token');

            if (token != null && refresh_token != null) {

                // Set token and refresh token
                client.auth.token = token;
                client.auth.refresh_token = refresh_token;

                // Try to refresh token
                try {
                    await client.auth.refresh();
                    navigation.navigate('Resources');
                } catch (error) {
                    await AsyncStorage.removeItem('token');
                    await AsyncStorage.removeItem('refresh_token');
                }
            } 

            setIsLoading(false);
        }
    }

    useEffect(() => {
        checkIsAuth();
    }, []);

    return (
        <View style={CommonStyles.container}>
            <TopBar hideSearchBar={true} navigation={navigation} />
            <View style={CommonStyles.content}>
                <View style={LoginStyles.container}>
                    {
                        isLoading ? <ActivityIndicator size="large" color="#0000ff" style={CommonStyles.loader} /> : 
                        <View>
                            
                            <Header label="Connexion" />
                            <ScrollView style={CommonStyles.scrollView}>
                                <View style={LoginStyles.loginContainer}>
                                    <InputText placeholder="Email" type='email-address' />
                                    <InputText placeholder="Mot de passe" type='default' secureTextEntry={true} />
                                </View>
                                <View style={LoginStyles.registerContainer}>
                                    <View style={LoginStyles.texContainer}>
                                        <Text style={LoginStyles.text}> Pas de compte ? </Text>
                                        <Link label="Inscrivez-vous maintenant" callBack={onClickRegisterText}/>
                                    </View>
                                    <InputButton label="Se connecter" callBack={onClickLoginButton} style={LoginStyles.loginButton} />
                                </View>
                            </ScrollView>
                        </View>
                    }
                </View>
            </View>
        </View>
    )
}