import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, Text, View } from "react-native";
import Header from "../components/Header";
import InputButton from "../components/InputButton";
import Link from "../components/Link";
import commonStyles from "../styles/commonStyles";
import LoginStyles from "../styles/LoginStyles";
import { StackNavigationProp } from "@react-navigation/stack";
import InputText from "../components/InputText";

type LoginStackParamList = {
    Home: undefined;
    Register: undefined;
};

export default function LoginScreen() {
    const navigation = useNavigation<StackNavigationProp<LoginStackParamList>>();

    const onClickRegisterText = () => {
        navigation.navigate('Register');
    }

    const onClickLoginButton = () => {
        navigation.navigate('Home');
    }

    return (
        <View style={commonStyles.container}>
            <Image source={require('../assets/rr-logo.png')} style={commonStyles.logo} />
            <View style={commonStyles.content}>
                <Header label="Connexion" />
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
            </View>
        </View>
    )
}