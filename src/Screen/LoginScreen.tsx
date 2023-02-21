import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import Header from "../Components/Header";
import InputButton from "../Components/Button/InputButton";
import Link from "../Components/Button/Link";
import CommonStyles from "../Styles/CommonStyles";
import LoginStyles from "../Styles/Screen/LoginStyles";
import { StackNavigationProp } from "@react-navigation/stack";
import InputText from "../Components/Input/InputText";
import { Client } from "rr-apilib";
import TopBar from "../Components/Input/TopBar";

type LoginStackParamList = {
    Resources: undefined;
    Register: undefined;
};


export default function LoginScreen({ route }: any) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const client = route.params as Client;
    const navigation = useNavigation<StackNavigationProp<LoginStackParamList>>();

    const onClickRegisterText = () => {
        navigation.navigate('Register');
    }

    const onClickLoginButton = async () => {
        setIsLoading(true);
        try {
            await client.auth.login('user0@example.com', 'password');
            navigation.navigate('Resources');
        } catch (error) {
            alert('Mauvais identifiants');
        }
        setIsLoading(false);
    }

    const checkIsAuth = () => {
        if (client.auth.me != null) {
            navigation.navigate('Resources');
        }
    }

    useEffect(() => {
        checkIsAuth();
    }, []);

    return (
        <View style={CommonStyles.container}>
            <TopBar hideSearchBar={true} />
            <View style={CommonStyles.content}>
                <Header label="Connexion" />
                <View>
                    {
                        isLoading ? <ActivityIndicator size="large" color="#0000ff" style={CommonStyles.loader} /> : 
                        <View>
                            <View style={LoginStyles.loginContainer}>
                                <InputText placeholder="Email" type='email-address' />
                                <InputText placeholder="Mot de passe" type='default' secureTextEntry={true} />
                            </View>
                            <View style={LoginStyles.registerContainer}>
                                <Text>
                                    Pas de compte ? 
                                    <Link label="Inscrivez-vous maintenant" callBack={onClickRegisterText} />
                                </Text>
                                <InputButton label="Se connecter" callBack={onClickLoginButton} style={LoginStyles.loginButton} />
                            </View>
                        </View>
                    }
                </View>
            </View>
        </View>
    )
}