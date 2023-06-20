import React from 'react'
import { User } from 'rr-apilib';
import { Text, TouchableOpacity } from 'react-native'
import { NavigationParamList } from '../../../Types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import UserCardStyles from '../../../Styles/Components/Card/User/UserCardStyles';

interface Props {
    navigation: NativeStackNavigationProp<NavigationParamList>;
    user: User | null;
}

export default function UserCardAdmin({ navigation, user }:Props) {
    
    const userProfileName = user?.name + ' ' + user?.firstname;

    const handleOnPress = () => {
        user &&
        navigation.navigate('AdminUser', {
            user: user,
            client: user.client, 
        })
    }
    
    return (
        <TouchableOpacity style={UserCardStyles.cardBackground} onPress={handleOnPress}>
            <Text style={UserCardStyles.cardTitle} numberOfLines={2}>{userProfileName}</Text>
            <Text style={UserCardStyles.cardText}>{user?.resources.cache.size.toString() + " Ressource(s)"}</Text>
        </TouchableOpacity>
    )
}