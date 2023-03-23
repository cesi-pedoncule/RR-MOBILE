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
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NavigationParamList } from "../Types/navigation";
import { COLORS } from "../Styles/Colors";

type Props = NativeStackScreenProps<NavigationParamList, 'Register'>;

export default function RegisterScreen({ route, navigation }: Props) {

    const client = route.params.client;
    const onClickLoginText = () => {
        navigation.navigate('Login', { client });
    }

    const onClickRegisterButton = () => {
        navigation.navigate('Register', { client });
    }

    return (
        <View style={CommonStyles.container}>
            <TopBar hideSearchBar={true} navigation={navigation} />
            <View style={CommonStyles.content}>
                <Header label="Inscription" />
                <ScrollView style={CommonStyles.itemsContainer}>
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
                                <Text style={{color: COLORS.Black,}}> Déjà un compte ? </Text>
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