import React, { useEffect, useState } from "react";
import { ScrollView, Text, ToastAndroid, View } from "react-native";
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
    const [ passwordConfirm, setPasswordConfirm ] = useState<string>("");
    const [ isDisabled, setIsDisabled] = useState<boolean>(true);
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const [ isValidName, setIsValidName] = useState<boolean>(true)
    const [ isValidFirstname, setIsValidFirstname] = useState<boolean>(true)
    const [ isValidEmail, setIsValidEmail] = useState<boolean>(true)
    const [ isValidPassword, setIsValidPassword] = useState<boolean>(true)
    const [ isValidPasswordConfirm, setIsValidPasswordConfirm] = useState<boolean>(true)

    const client = route.params.client;
    const onClickLoginText = () => {
        navigation.navigate('Login', { client });
    }

    const onClickRegisterButton = async () => {
        setIsLoading(true);

        try {
            await client.users.create(newUser);
            await client.login(newUser.email, newUser.password);
            
             navigation.navigate('Resources', { client });
        } catch (error) {
            ToastAndroid.show("Problème lors de l'inscription", ToastAndroid.CENTER);
            setIsDisabled(true);
        }
        
        setIsLoading(false);
    }

    const validateEmail = (email:string) => {
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(email);
    };

    const validatePassword = (password:string) => {
        return /[A-Z]/.test(password) && /[0-9]/.test(password) && /[A-Za-z0-9]{7,13}$/.test(password);
    };

    const onBlurEmail = () => {
        !validateEmail(newUser.email) && 
        ToastAndroid.show('Email invalide' , ToastAndroid.CENTER);
        setIsValidEmail(validateEmail(newUser.email) )
    }

    const onBlurPassword = () => {
        !validatePassword(newUser.password) &&
        ToastAndroid.show('Mot de passe invalide' , ToastAndroid.CENTER);
        setIsValidPassword(validatePassword(newUser.password))
    }

    const onBlurPasswordConfirm = () => {
        newUser.password != passwordConfirm &&
        ToastAndroid.show('Mots de passes différents ' , ToastAndroid.CENTER);
        setIsValidPasswordConfirm(newUser.password == passwordConfirm)
    }

    const onBlurFirstName = () => {
        newUser.firstname.length == 0 &&
        ToastAndroid.show('Prénom invalide' , ToastAndroid.CENTER);
        setIsValidFirstname(newUser.firstname.length != 0);
    }

    const onBlurName = () => {
        newUser.name.length == 0 &&
        ToastAndroid.show('Nom invalide' , ToastAndroid.CENTER);
        setIsValidName(newUser.name.length != 0)
    }

    useEffect(() => {
        !validateEmail(newUser.email) || !validatePassword(newUser.password) || newUser.password != passwordConfirm || newUser.firstname.length == 0 || newUser.name.length == 0 || isLoading ? 
        setIsDisabled(true) : setIsDisabled(false);
    });

    return (
        <View style={CommonStyles.container}>
            <TopBar hideSearchBar={true} hideHomeButton={false} navigation={navigation} client={client}/>
            <View style={CommonStyles.content}>
                <ScrollView style={CommonStyles.itemsContainer} showsVerticalScrollIndicator={false}>
                    <Header label="Inscription" />
                    <View style={LoginStyles.loginContainer}>
                        <InputText placeholder="Nom" type='default' onChangeText={(value) => newUser.setName(value)} onBlur={onBlurName} isValid={isValidName}/>
                        <InputText placeholder="Prénom" type='default' onChangeText={(value) => newUser.setFirstname(value)} onBlur={onBlurFirstName} isValid={isValidFirstname}/>
                        <InputText placeholder="Email" type='email-address' onChangeText={(value) => newUser.setEmail(value)} onBlur={onBlurEmail} isValid={isValidEmail} />
                        <InputText placeholder="Mot de passe" type='default' secureTextEntry={true} onChangeText={(value) => newUser.setPassword(value)} onBlur={onBlurPassword} isValid={isValidPassword} />
                        <View style={RegisterStyles.rulesContainer}>
                            <Text style={RegisterStyles.rulesText}>Minimum 1 majuscule</Text>
                            <Text style={RegisterStyles.rulesText}>Minimum 1 chiffre</Text>
                            <Text style={RegisterStyles.rulesText}>Entre 7-13 caractères</Text>
                        </View>
                        <InputText placeholder="Confirmation de mot de passe" type='default' secureTextEntry={true} onChangeText={(value) => setPasswordConfirm(value)} onBlur={onBlurPasswordConfirm} isValid={isValidPasswordConfirm} />
                    </View>
                    <View style={RegisterStyles.registerContainer}>
                        <Text style={{color: COLORS.Black,}}> Déjà un compte ? </Text>
                        <Link label="Connectez-vous maintenant" callBack={onClickLoginText} />
                        <InputButton isLoading={isLoading} label="Valider" callBack={onClickRegisterButton} style={RegisterStyles.registerButton} isDisabled={isDisabled}/>
                    </View>              
                </ScrollView>
            </View>
        </View>
    );
}