import React from "react";
import { ScrollView, Text, View } from "react-native";
import Header from "../Components/Header";
import InputButton from "../Components/Button/InputButton";
import Link from "../Components/Button/Link";
import CommonStyles from "../Styles/CommonStyles";
import LoginStyles from "../Styles/Screen/LoginStyles";
import RegisterStyles from "../Styles/Screen/RegisterStyles";
import InputText from "../Components/Input/InputText";
import TopBar from "../Components/Input/TopBar";

export default function RegisterScreen({navigation}: any) {
    const onClickLoginText = () => {
        navigation.navigate('Login');
    }

    const onClickRegisterButton = () => {
        navigation.navigate('Resources');
    }

    return (
        <View style={CommonStyles.container}>
            <TopBar hideSearchBar={true} navigation={navigation} />
            <View style={CommonStyles.content}>
                <Header label="Inscription" />
                <ScrollView style={CommonStyles.scrollView}>
                    <View>
                        <View style={LoginStyles.loginContainer}>
                            <InputText placeholder="Nom" type='default' />
                            <InputText placeholder="Prénom" type='default' />
                            <InputText placeholder="Email" type='email-address' />
                            <InputText placeholder="Mot de passe" type='default' secureTextEntry={true} />
                            <InputText placeholder="Confirmation de mot de passe" type='default' secureTextEntry={true} />
                        </View>
                        <View style={RegisterStyles.registerContainer}>
                            <View style={RegisterStyles.texContainer}>
                                <Text> Déjà un compte ? </Text>
                                <Link label="Connectez-vous maintenant" callBack={onClickLoginText} />
                            </View>
                            <InputButton label="Valider" callBack={onClickRegisterButton} style={RegisterStyles.registerButton} />
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}