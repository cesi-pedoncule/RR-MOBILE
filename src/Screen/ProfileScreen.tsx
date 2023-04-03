import React, { useEffect } from "react";
import { View, Text, ScrollView } from 'react-native'
import Header from "../Components/Header";
import StatDashBoard from "../Components/StatDashBoard";
import TopBar from "../Components/Input/TopBar";
import CommonStyles from "../Styles/CommonStyles";
import ProfileStyles from "../Styles/Screen/ProfileStyles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NavigationParamList } from "../Types/navigation";

type Props = NativeStackScreenProps<NavigationParamList, 'Profile'>;

export default function ProfileScreen({ route, navigation }: Props) {
    const client = route.params.client;
    const user = client.auth.me;

    useEffect(() => {
        if (user == null) {
            navigation.navigate('Login', { client });
        }
    })

    const userProfileName = user?.name + ' ' + user?.firstname;

    return (
        <View style={CommonStyles.container}>
            <TopBar hideSearchBar={true} hideLogout={false} client={client} navigation={navigation} />
            {
                user && ( 
                    <View style={CommonStyles.content}>
                        <ScrollView style={CommonStyles.itemsContainer}>
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