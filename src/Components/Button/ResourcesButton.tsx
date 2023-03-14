import React from "react";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Props {
    style?: any;
    navigation:any;
}

export default function ResourcesButton({style, navigation} : Props) {
    const onPressButton = () => {
        navigation.navigate('Resources');
    }

    return (
        <TouchableOpacity style={[style]} onPress={onPressButton}>
            <MaterialCommunityIcons name="bookshelf" size={24} color="black" />
        </TouchableOpacity>
    );
}