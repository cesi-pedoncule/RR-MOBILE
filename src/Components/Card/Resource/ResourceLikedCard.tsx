import React, { useState } from 'react'
import { Resource, User } from 'rr-apilib';
import { GestureResponderEvent, Text, TouchableOpacity, View } from 'react-native'
import { NavigationParamList } from '../../../Types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ResourceLikedCardStyles from '../../../Styles/Components/Card/Resource/ResourceLikedCardStyles';
import { likeClickHandle } from '../../../Functions/Utils';
import LikeButton from '../../Button/LikeButton';

interface Props {
    navigation: NativeStackNavigationProp<NavigationParamList>;
    resourceData: Resource;
    onDoubleClick: () => void;
}

export default function ResourceLikedCard({ navigation, resourceData, onDoubleClick }:Props) {

    const [resource, setResource] = useState<Resource>(resourceData);
    const username = resourceData.creator ? `${resourceData.creator.name} ${resourceData.creator.firstname}` : "Utilisateur inconnu";

    let timeout: NodeJS.Timeout | null = null;

    const onPress = async (e: GestureResponderEvent) => {

        e.preventDefault();

        if(timeout) {
            clearTimeout(timeout);
            timeout = null;
            await likeClickHandle(resourceData, setResource);
            return onDoubleClick();
        }

        timeout = setTimeout(() => {
            timeout = null;
            onClickDetailResource();
        }, 300);
    }

    const onClickDetailResource = () => {
        navigation.navigate('ResourceDetails', {
            resource: resourceData,
            client: resourceData.client,
        });
    }
    
    return (
        <TouchableOpacity style={ResourceLikedCardStyles.cardBackground} onPress={onPress}>
            <Text style={ResourceLikedCardStyles.cardTitle} numberOfLines={2}>{resourceData.title}</Text>
            <View style={ResourceLikedCardStyles.lineAuthorLikeContainer}>
                <View>
                    <Text style={ResourceLikedCardStyles.cardText}>{username}</Text>
                </View>
                <LikeButton resource={resource} setResource={setResource} onClick={onDoubleClick}/>
            </View>
        </TouchableOpacity>
    )
}