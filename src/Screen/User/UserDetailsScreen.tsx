import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, ToastAndroid } from 'react-native'
import Header from "../../Components/Header";
import StatDashBoard from "../../Components/StatDashBoard";
import TopBar from "../../Components/Input/TopBar";
import CommonStyles from "../../Styles/CommonStyles";
import UserDetailsStyles from "../../Styles/Screen/User/UserDetailsStyles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NavigationParamList } from "../../Types/navigation";
import { Resource } from "rr-apilib";
import UserCard from "../../Components/Card/User/UserCard";
import ResourceLikedCard from "../../Components/Card/Resource/ResourceLikedCard";
import IconButton from "../../Components/Button/IconButton";

type Props = NativeStackScreenProps<NavigationParamList, 'UserDetails'>;

export default function UserDetailsScreen({ route, navigation }: Props) {

    const client = route.params.client;
    const user = route.params.user;
    const userProfileName = user?.name + ' ' + user?.firstname;

    const [ followsUser, setFollowsUser ] = useState(user ? Array.from(user.follows.values()) : []);
    const [ followersUser, setFollowersUser ] = useState(user ? Array.from(user.followers.cache.values()) : []);
    const [ resourcesLiked, setResourcesLiked ] = useState(user ? Array.from(user.likedResources.values()): []);
    const [ isFollow, setIsFollow ] = useState<boolean>(false);

    useEffect(() => {
        navigation.addListener('focus', () => {
            onRefresh();
        });
    });

    const onRefresh = () => {
        const refreshResources:Resource[] = user ? Array.from(user.likedResources.values()): [];
        setResourcesLiked([...refreshResources]);
        
        const refreshFollowers = user ? Array.from(user.followers.cache.values()) : [];
        setFollowersUser([...refreshFollowers]);

        const refreshFollows = user ? Array.from(user.follows.values()) : [];
        setFollowsUser([...refreshFollows]);
    };

    const onClikFollowUser = async () => {
        try {
            user && await user.follow();
            setIsFollow(true);
        } catch (error) {
            ToastAndroid.show("Problème lors du follow" , ToastAndroid.CENTER);
        }
    };

    const onClikUnFollowUser = async () => {
        try {
            user && await user.unfollow();
            setIsFollow(false);
        } catch (error) {
            ToastAndroid.show("Problème lors du unFolllow" , ToastAndroid.CENTER);
        }
    };

    return (
        <View style={CommonStyles.container}>
            <TopBar hideSearchBar={true} client={client} navigation={navigation} />
            {
                user && ( 
                    <View style={CommonStyles.content}>
                        <View style={UserDetailsStyles.returnFollowContainer}>
                            <IconButton iconStyle={CommonStyles.returnBtnInFlatList} callBack={() => navigation.goBack()} iconSize={24} iconName={"arrow-left-top"}/> 
                            {
                                isFollow ?
                                <IconButton iconStyle={CommonStyles.returnBtnInFlatList} callBack={onClikUnFollowUser} iconSize={24} iconName={"cards-heart"}/> 
                                :
                                <IconButton iconStyle={CommonStyles.returnBtnInFlatList} callBack={onClikFollowUser} iconSize={24} iconName={"cards-heart-outline"}/> 
                            }
                        </View>
                        <View style={CommonStyles.headerComponentWithReturn}>
                            <Header label={userProfileName}/>
                        </View>
                        <ScrollView style={UserDetailsStyles.scrollViewContainer} showsVerticalScrollIndicator={false}>
                            <View style={UserDetailsStyles.profileContainer}>
                                <Text style={UserDetailsStyles.profileSubTitle}>{user?.resources.cache.size} enregistrement(s)</Text>
                                <Text style={UserDetailsStyles.profileDescription}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed efficitur risus tempus, eleifend sem in, ornare quam. Integer ultrices</Text>
                                <Text style={[CommonStyles.title, UserDetailsStyles.profileTitle]} numberOfLines={1}>Statistiques</Text>
                                <StatDashBoard user={user}/>
                                {
                                    followsUser.length !== 0 &&
                                    <View style={UserDetailsStyles.itemsContainer}>
                                        <Text style={UserDetailsStyles.textHolder}>Personnes suivi : ({followsUser.length})</Text>
                                        <ScrollView style={UserDetailsStyles.itemsScrollView} horizontal showsHorizontalScrollIndicator={false}>
                                            {
                                                followsUser.map((user, id) => 
                                                    <View style={UserDetailsStyles.itemContainer} key={id}>
                                                        <UserCard key={id} navigation={navigation} user={user.user}/>
                                                    </View>
                                                )
                                            }
                                        </ScrollView>
                                    </View>
                                }
                                {
                                    followersUser.length !== 0 &&
                                    <View style={UserDetailsStyles.itemsContainer}>
                                        <Text style={UserDetailsStyles.textHolder}>Personnes qui nous suive : ({followersUser.length})</Text>
                                        <ScrollView style={UserDetailsStyles.itemsScrollView} horizontal showsHorizontalScrollIndicator={false}>
                                            {
                                                followersUser.map((user, id) => 
                                                    <View style={UserDetailsStyles.itemContainer} key={id}>
                                                        <UserCard key={id} navigation={navigation} user={user.user}/>
                                                    </View>
                                                )
                                            }
                                        </ScrollView>
                                    </View>
                                }
                                {
                                    resourcesLiked.length !== 0 && 
                                    <View style={UserDetailsStyles.itemsContainer}>
                                        <Text style={UserDetailsStyles.textHolder}>Ressource aimé : ({resourcesLiked.length})</Text>
                                        <ScrollView style={UserDetailsStyles.itemsScrollView} horizontal showsHorizontalScrollIndicator={false}>
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
                            </View>
                        </ScrollView>
                    </View>
                )
            }
        </View>
    )
}