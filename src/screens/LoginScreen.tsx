import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import Header from "../components/Header";
import InputButton from "../components/Button/InputButton";
import Link from "../components/Link";
import commonStyles from "../styles/commonStyles";
import LoginStyles from "../styles/Screen/LoginStyles";
import { StackNavigationProp } from "@react-navigation/stack";
import InputText from "../components/Input/InputText";
import { Client } from "rr-apilib";

type LoginStackParamList = {
    Home: undefined;
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
            navigation.navigate('Home');
        } catch (error) {
            alert('Mauvais identifiants');
        }
        setIsLoading(false);
    }

    const checkIsAuth = () => {
        if (client.auth.me != null) {
            navigation.navigate('Home');
        }
    }

    useEffect(() => {
        checkIsAuth();
    }, []);

    return (
        <View style={commonStyles.container}>
            <View style={commonStyles.content}>
                <Header label="Connexion" />
                <View>
                    {
                        isLoading ? <ActivityIndicator size="large" color="#0000ff" style={commonStyles.loader} /> : 
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