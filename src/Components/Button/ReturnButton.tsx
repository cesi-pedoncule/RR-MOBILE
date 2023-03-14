import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

import ReturnButtonStyles from '../../Styles/Components/Button/ReturnButtonStyles';

export default function ReturnButton() {
    
    const navigation = useNavigation();

    return (
        <TouchableOpacity style={ReturnButtonStyles.returnBtn} onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="arrow-left-top" size={24} color="black" />
        </TouchableOpacity>
    )
}