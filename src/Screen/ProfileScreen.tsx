import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { View, Text, ScrollView } from 'react-native'
import { Client } from "rr-apilib";
import InputButton from "../Components/Button/InputButton";
import Header from "../Components/Header";
import NavBar from "../Components/NavBar";
import StatDashBoard from "../Components/StatDashBoard";
import TopBar from "../Components/Input/TopBar";
import CommonStyles from "../Styles/CommonStyles";
import ProfileStyles from "../Styles/Screen/ProfileStyles";

type ProfileStackParamList = {
    Resources: undefined;
    Login: undefined;
};

export default function ProfileScreen({route}: any) {

    const client = route.params as Client;
    const navigation = useNavigation<StackNavigationProp<ProfileStackParamList>>();
    
    const user = client.auth.me;
    
    user?.resources.refresh();

    const userProfileName = user?.name + ' ' + user?.firstname;

    const checkUserIsConnected = () => {
        if (!user) {
            navigation.navigate('Resources');
        }
    }

    useEffect(() => {
        checkUserIsConnected();
    }, []);

    return (
        <View style={CommonStyles.container}>
            <TopBar hideSearchBar={true} hideLogout={false} client={client} />
            {
                user && ( 
                    <View style={CommonStyles.content}>
                        <ScrollView style={CommonStyles.scrollView}>
                            <Header label={userProfileName}/>
                            <View style={ProfileStyles.profileContainer}>
                                <Text style={ProfileStyles.profileSubTitle}>{user?.resources.cache.size} enregistrement(s)</Text>
                                <Text style={ProfileStyles.profileDescription}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed efficitur risus tempus, eleifend sem in, ornare quam. Integer ultrices</Text>
                                <Text style={[CommonStyles.title, ProfileStyles.profileTitle]} numberOfLines={1}>Statistiques</Text>
                                <StatDashBoard user={user} />
                            </View>
                        </ScrollView>
                        <NavBar client={client} profileIsFocused={true}/>
                    </View>
                )
            }
        </View>
    )
}