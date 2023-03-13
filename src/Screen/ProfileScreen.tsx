import React from "react";
import { View, Text, ScrollView } from 'react-native'
import { Client } from "rr-apilib";
import Header from "../Components/Header";
import StatDashBoard from "../Components/StatDashBoard";
import TopBar from "../Components/Input/TopBar";
import CommonStyles from "../Styles/CommonStyles";
import ProfileStyles from "../Styles/Screen/ProfileStyles";

export default function ProfileScreen({route, navigation}: any) {
    const client = route.params as Client;
    const user = client.auth.me;

    if (user == null) {
        navigation.navigate('Login');
        return <View></View>;
    }
    
    user.resources.refresh();

    const userProfileName = user?.name + ' ' + user?.firstname;

    return (
        <View style={CommonStyles.container}>
            <TopBar hideSearchBar={true} hideLogout={false} client={client} navigation={navigation} />
            {
                user && ( 
                    <View style={CommonStyles.content}>
                        <ScrollView style={CommonStyles.scrollViewWithNavBar}>
                            <Header label={userProfileName}/>
                            <View style={ProfileStyles.profileContainer}>
                                <Text style={ProfileStyles.profileSubTitle}>{user?.resources.cache.size} enregistrement(s)</Text>
                                <Text style={ProfileStyles.profileDescription}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed efficitur risus tempus, eleifend sem in, ornare quam. Integer ultrices</Text>
                                <Text style={[CommonStyles.title, ProfileStyles.profileTitle]} numberOfLines={1}>Statistiques</Text>
                                <StatDashBoard user={user}/>
                            </View>
                        </ScrollView>
                    </View>
                )
            }
        </View>
    )
}