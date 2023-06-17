import React from 'react'
import { User } from 'rr-apilib';
import { Text, TouchableOpacity } from 'react-native'
import { NavigationParamList } from '../../Types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import UserCardStyles from '../../Styles/Components/Card/UserCardStyles';

interface Props {
    navigation: NativeStackNavigationProp<NavigationParamList>;
    user: User | null;
}

export default function UserCard({ navigation, user }:Props) {
    
    const handleOnPress = () => {
        if(user && user.id !== user.client.me?.id) {
            navigation.navigate('UserDetails', {
                user: user,
                client: user.client, 
            })
        } else if(user) {
            navigation.navigate('Profile', {
                client: user.client, 
            })
        }
    }
    
    return (
        <TouchableOpacity style={UserCardStyles.cardBackground} onPress={handleOnPress}>
            <Text style={UserCardStyles.cardTitle} numberOfLines={2}>{user?.name}</Text>
            <Text style={UserCardStyles.cardText}>{user?.followers.cache.size.toString() + " Follower(s)"}</Text>
        </TouchableOpacity>
    )
}