import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from 'react-native'
import Header from "../../Components/Header";
import StatDashBoard from "../../Components/StatDashBoard";
import TopBar from "../../Components/Input/TopBar";
import CommonStyles from "../../Styles/CommonStyles";
import ProfileStyles from "../../Styles/Screen/User/ProfileStyles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NavigationParamList } from "../../Types/navigation";
import { Resource, User } from "rr-apilib";
import UserCard from "../../Components/Card/User/UserCard";
import ResourceLikedCard from "../../Components/Card/Resource/ResourceLikedCard";
import InputButton from "../../Components/Button/InputButton";

type Props = NativeStackScreenProps<NavigationParamList, 'Profile'>;

export default function ProfileScreen({ route, navigation }: Props) {

    const client = route.params.client;
    const me = client.auth.me;
    const userProfileName = me?.name + ' ' + me?.firstname;

    const [ followsUser, setFollowsUser ] = useState(me ? Array.from(me.follows.values()) : []);
    const [ followersUser, setFollowersUser ] = useState<User[] | null>([]);
    const [ resourcesLiked, setResourcesLiked ] = useState(me ? Array.from(me.likedResources.values()): [])

    useEffect(() => {
        navigation.addListener('focus', () => {
            onRefresh();
        });
        if (me == null) {
            navigation.navigate('Login', { client });
        }
    });

    const onRefresh = () => {
        const refreshResources:Resource[] = me ? Array.from(me.likedResources.values()): [];
        setResourcesLiked([...refreshResources]);
        
        if(me) {
            const refreshFollowers: User[] = new Array();
            for(const userFollower of me.followers.cache.values()){
                userFollower.follower && refreshFollowers.push(userFollower.follower);
            }
            setFollowersUser([...refreshFollowers]);
        }

        const refreshFollows = me ? Array.from(me.follows.values()) : [];
        setFollowsUser([...refreshFollows]);
    };

    return (
        <View style={CommonStyles.container}>
            <TopBar hideSearchBar={true} hideLogout={false} client={client} navigation={navigation} />
            {
                me && ( 
                    <View style={CommonStyles.content}>
                        <ScrollView style={CommonStyles.itemsContainer} showsVerticalScrollIndicator={false}>
                            <Header label={userProfileName}/>
                            <View style={ProfileStyles.profileContainer}>
                                <Text style={ProfileStyles.profileSubTitle}>{me?.resources.cache.size} enregistrement(s)</Text>
                                <Text style={ProfileStyles.profileDescription}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed efficitur risus tempus, eleifend sem in, ornare quam. Integer ultrices</Text>
                                <Text style={[CommonStyles.title, ProfileStyles.profileTitle]} numberOfLines={1}>Statistiques</Text>
                                <StatDashBoard user={me}/>
                                {
                                    followsUser.length !== 0 && 
                                    <View style={ProfileStyles.itemsContainer}>
                                        <Text style={ProfileStyles.textHolder}>Personnes suivi : ({followsUser.length})</Text>
                                        <ScrollView style={ProfileStyles.itemsScrollView} horizontal showsHorizontalScrollIndicator={false}>
                                            {
                                                followsUser.map((user, id) => 
                                                    <View style={ProfileStyles.itemContainer} key={id}>
                                                        <UserCard key={id} navigation={navigation} user={user.user}/>
                                                    </View>
                                                )
                                            }
                                        </ScrollView>
                                    </View>
                                }
                                {
                                    followersUser && followersUser.length !== 0 && 
                                    <View style={ProfileStyles.itemsContainer}>
                                        <Text style={ProfileStyles.textHolder}>Personnes qui nous suive : ({followersUser.length})</Text>
                                        <ScrollView style={ProfileStyles.itemsScrollView} horizontal showsHorizontalScrollIndicator={false}>
                                            {
                                                followersUser.map((user, id) => 
                                                    <View style={ProfileStyles.itemContainer} key={id}>
                                                        <UserCard key={id} navigation={navigation} user={user}/>
                                                    </View>
                                                )
                                            }
                                        </ScrollView>
                                    </View>
                                }
                                {
                                    resourcesLiked.length !== 0 &&
                                    <View style={ProfileStyles.itemsContainer}>
                                        <Text style={ProfileStyles.textHolder}>Ressource aimé : ({resourcesLiked.length})</Text>
                                        <ScrollView style={ProfileStyles.itemsScrollView} horizontal showsHorizontalScrollIndicator={false}>
                                            {
                                                resourcesLiked.map((resource, id) => 
                                                    <View style={{marginHorizontal: 5}} key={id}>
                                                        <ResourceLikedCard key={id} navigation={navigation} resourceData={resource} onDoubleClick={onRefresh}/>
                                                    </View>
                                                )
                                            }
                                        </ScrollView>
                                    </View>
                                }
                                {
                                    me.isAdmin &&
                                    <InputButton label="Administration" callBack={()=> navigation.navigate("AdminMenu", { client })} style={ProfileStyles.buttonAdmin}/>
                                }
                            </View>
                        </ScrollView>
                    </View>
                )
            }
        </View>
    )
}