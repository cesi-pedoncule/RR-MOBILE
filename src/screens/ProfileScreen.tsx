import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { View, Text } from 'react-native'
import { Client } from "rr-apilib";
import InputButton from "../components/Button/InputButton";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import StatDashBoard from "../components/StatDashBoard";
import TopBar from "../components/TopBar";
import commonStyles from "../styles/commonStyles";
import ProfileStyles from "../styles/Screen/ProfileStyles";

type HomeStackParamList = {
    Home: undefined;
    Login: undefined;
};

export default function ProfileScreen({route}: any) {
    
    const client = route.params as Client;
    const navigation = useNavigation<StackNavigationProp<HomeStackParamList>>();
    
    const user = client.auth.me;
    const userProfileName = user?.name + ' ' + user?.firstname;

    const checkUserIsConnected = () => {
        if (!user) {
            navigation.navigate('Home');
        }
    }

    const onClickDisconnect = () => {
        navigation.navigate('Login');
    }

    useEffect(() => {
        checkUserIsConnected();
    }, []);

    return (
        <View style={commonStyles.container}>
            <TopBar hideSearchBar={true} />
            {
                user && ( 
                    <View style={commonStyles.content}>
                        <Header label={userProfileName} displayHomeButton={false} />
                        <View style={ProfileStyles.profileContainer}>
                            <Text style={ProfileStyles.profileSubTitle}>{user?.resources.size} enregistrement(s)</Text>
                            <Text style={ProfileStyles.profileDescription}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed efficitur risus tempus, eleifend sem in, ornare quam. Integer ultrices</Text>
                            <Text style={[commonStyles.title, ProfileStyles.profileTitle]}>Statistiques</Text>
                            <View style={ProfileStyles.statsContainer}>
                                <StatDashBoard user={user} />
                            </View>
                            <View style={ProfileStyles.disconnectContainer}>
                                <InputButton label={"Déconnexion"} callBack={onClickDisconnect}/>
                            </View>
                        </View>
                        <NavBar client={client} />
                    </View>
                )
            }
        </View>
    )
}