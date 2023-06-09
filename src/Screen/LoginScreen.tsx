import React, { useEffect, useState } from "react";
import { ScrollView, Text, ToastAndroid, View } from "react-native";
import Header from "../Components/Header";
import InputButton from "../Components/Button/InputButton";
import Link from "../Components/Button/Link";
import CommonStyles from "../Styles/CommonStyles";
import LoginStyles from "../Styles/Screen/LoginStyles";
import InputText from "../Components/Input/InputText";
import TopBar from "../Components/Input/TopBar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NavigationParamList } from "../Types/navigation";

type Props = NativeStackScreenProps<NavigationParamList, 'Login'>

export default function LoginScreen({ route, navigation }: Props) {
    
    const [ isLoading, setIsLoading ] = useState<boolean>(true);
    const [ email, setEmail ] = useState<string>('');
    const [ password, setPassword ] = useState<string>('');
    const client = route.params.client;

    const onClickRegisterText = () => {
        navigation.navigate('Register', { client });
    }

    const onClickLoginButton = async () => {
        setIsLoading(true);

        try {
            await client.login(email, password);
            await AsyncStorage.setItem('token', client.auth.token+'');
            await AsyncStorage.setItem('refresh_token', client.auth.refresh_token+'');

            navigation.navigate('Resources', { client });

        } catch (error) {
            ToastAndroid.show('Mauvais identifiants' , ToastAndroid.CENTER);
        }
        setIsLoading(false);
    }

    const checkIsAuth = async () => {
        
        if (client.auth.me != null) {
            navigation.navigate('Resources', { client });
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
                    // navigation.navigate('');
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
            <TopBar hideSearchBar={true} navigation={navigation} client={client}/>
            <View style={CommonStyles.content}>
                <View style={LoginStyles.container}>
                    <View>
                        <ScrollView style={CommonStyles.itemsContainer}>
                            <Header label="Connexion" />
                            <View style={LoginStyles.loginContainer}>
                                <InputText placeholder="Email" type='email-address' onChangeText={(value) => setEmail(value)}/>
                                <InputText placeholder="Mot de passe" type='default' secureTextEntry={true} onChangeText={(value) => setPassword(value)}/>
                            </View>
                            <View style={LoginStyles.registerContainer}>
                                <Text style={LoginStyles.text}> Pas de compte ? </Text>
                                <Link label="Inscrivez-vous maintenant" callBack={onClickRegisterText}/>
                                <InputButton isDisabled={isLoading} isLoading={isLoading} label="Se connecter" callBack={onClickLoginButton} style={LoginStyles.loginButton} />
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </View>
        </View>
    )
}