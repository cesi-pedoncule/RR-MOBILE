import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { View, Text } from 'react-native'
import { Client } from "rr-apilib";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import TopBar from "../components/TopBar";
import commonStyles from "../styles/commonStyles";
import ProfileStyles from "../styles/ProfileStyles";

type HomeStackParamList = {
    Home: undefined;
};

export default function ProfilScreen({route}: any) {
    
    const client = route.params as Client;
    const navigation = useNavigation<StackNavigationProp<HomeStackParamList>>();
    
    const user = client.auth.me;
    const userProfilName = user?.name + ' ' + user?.firstname;

    const checkUserIsConnected = () => {
        if (!user) {
            navigation.navigate('Home');
        }
    }

    useEffect(() => {
        checkUserIsConnected();
    }, []);

    return (
        <View style={commonStyles.container}>
            <TopBar hideSearchBar={true} />
            <View style={commonStyles.contentWithTopBar}>
                <Header label={userProfilName} displayHomeButton={false} />
                <View style={ProfileStyles.profileContainer}>
                    <Text style={ProfileStyles.profileSubTitle}>{user?.resources.size} enregistrement(s)</Text>
                    <Text style={ProfileStyles.profileDescription}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed efficitur risus tempus, eleifend sem in, ornare quam. Integer ultrices</Text>
                    <Text style={[commonStyles.title, ProfileStyles.profileTitle]}>Statistiques</Text>
                    <Text>Graph : // TODO </Text>
                </View>
            </View>
            <NavBar client={client} />
        </View>
    )
}