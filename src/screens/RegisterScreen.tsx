import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, Text, View } from "react-native";
import Header from "../components/Header";
import InputButton from "../components/Button/InputButton";
import Link from "../components/Link";
import commonStyles from "../styles/commonStyles";
import LoginStyles from "../styles/LoginStyles";
import RegisterStyles from "../styles/RegisterStyles";
import { StackNavigationProp } from "@react-navigation/stack";
import InputText from "../components/Input/InputText";

type RegisterStackParamList = {
    Home: undefined;
    Login: undefined;
}

export default function RegisterScreen() {
    const navigation = useNavigation<StackNavigationProp<RegisterStackParamList>>();

    const onClickLoginText = () => {
        navigation.navigate('Login');
    }

    const onClickRegisterButton = () => {
        navigation.navigate('Home');
    }

    return (
        <View style={commonStyles.container}>
            <Image source={require('../assets/rr-logo.png')} style={commonStyles.logo} />
            <View style={commonStyles.content}>
                <Header label="Inscription" />
                <View>
                    <View style={LoginStyles.loginContainer}>
                        <InputText placeholder="Nom" type='default' />
                        <InputText placeholder="Prénom" type='default' />
                        <InputText placeholder="Email" type='email-address' />
                        <InputText placeholder="Mot de passe" type='default' secureTextEntry={true} />
                        <InputText placeholder="Confirmation de mot de passe" type='default' secureTextEntry={true} />
                    </View>
                    <View style={RegisterStyles.registerContainer}>
                        <Text>
                            {"Déjà un compte ?"} 
                            <Link label="Connectez-vous maintenant" callBack={onClickLoginText} />
                        </Text>
                        <InputButton label="Valider" callBack={onClickRegisterButton} style={RegisterStyles.registerButton} />
                    </View>
                </View>
            </View>
        </View>
    );
}