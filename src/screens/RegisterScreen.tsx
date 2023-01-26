import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, Text, View } from "react-native";
import Header from "../components/Header";
import InputButton from "../components/InputButton";
import Link from "../components/Link";
import commonStyles from "../styles/commonStyles";
import LoginStyles from "../styles/LoginStyles";
import RegisterStyles from "../styles/RegisterStyles";
import { StackNavigationProp } from "@react-navigation/stack";

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
                        <Text>Nom</Text>
                        <Text>Prénom</Text>
                        <Text>Email</Text>
                        <Text>Mot de passe</Text>
                        <Text>Confirmation de mot de passe</Text>
                    </View>
                    <View style={RegisterStyles.registerContainer}>
                        <Text>
                            Déjà un compte ? 
                            <Link label="Connectez-vous maintenant" callBack={onClickLoginText} />
                        </Text>
                        <InputButton label="Valider" callBack={onClickRegisterButton} style={RegisterStyles.registerButton} />
                    </View>
                </View>
            </View>
        </View>
    );
}