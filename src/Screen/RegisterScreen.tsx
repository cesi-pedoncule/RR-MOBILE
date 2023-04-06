import React, { useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
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
import { COLORS } from '../Styles/Colors';
import { UserBuilder } from "rr-apilib";

type Props = NativeStackScreenProps<NavigationParamList, 'Register'>;

export default function RegisterScreen({ route, navigation }: Props) {

    const [ newUser ] = useState<UserBuilder>(new UserBuilder());
    const [ passwordConfirm, setPasswordConfirm ] = useState<string>('');

    const [ isLoading, setIsLoading ] = useState<boolean>(false);

    const client = route.params.client;
    const onClickLoginText = () => {
        navigation.navigate('Login', { client });
    }

    const onClickRegisterButton = async () => {

        try {
            setIsLoading(true);
            const user = await client.users.create(newUser);
            await client.login(newUser.email, newUser.password);
            setIsLoading(false);
        } catch (error) {
            alert("Problème lors de l'inscription");
        }

        navigation.navigate('Resources', { client });
    }

    return (
        <View style={CommonStyles.container}>
            <TopBar hideSearchBar={true} navigation={navigation} />
            <View style={CommonStyles.content}>
                <ScrollView style={CommonStyles.itemsContainer}>
                    <Header label="Inscription" />
                    {
                        isLoading ? <ActivityIndicator size="large" color={COLORS.AccentColor} style={CommonStyles.loader} /> : <View>
                        <View style={LoginStyles.loginContainer}>
                            <InputText placeholder="Nom" type='default' onChangeText={(value) => newUser.setName(value)} />
                            <InputText placeholder="Prénom" type='default' onChangeText={(value) => newUser.setFirstname(value)} />
                            <InputText placeholder="Email" type='email-address' onChangeText={(value) => newUser.setEmail(value)} />
                            <InputText placeholder="Mot de passe" type='default' secureTextEntry={true} onChangeText={(value) => newUser.setPassword(value)} />
                            <InputText placeholder="Confirmation de mot de passe" type='default' secureTextEntry={true} onChangeText={(value) => setPasswordConfirm(value)} />
                        </View>
                        <View style={RegisterStyles.registerContainer}>
                            <Text style={{color: COLORS.Black,}}> Déjà un compte ? </Text>
                            <Link label="Connectez-vous maintenant" callBack={onClickLoginText} />
                            <InputButton label="Valider" callBack={onClickRegisterButton} style={RegisterStyles.registerButton} isDisabled={newUser.password !== passwordConfirm && passwordConfirm.length < 0} />
                        </View>
                    </View>
                    }
                    
                </ScrollView>
            </View>
        </View>
    );
}