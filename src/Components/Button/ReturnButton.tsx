import React from 'react'
import { TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import ReturnButtonStyles from '../../Styles/Components/Button/ReturnButtonStyles';

type ReturnButtonStackParamList = {
    ShareCreate: undefined;
};

export default function ReturnButton() {
    const navigation = useNavigation<StackNavigationProp<ReturnButtonStackParamList>>();

    return (
        <TouchableOpacity style={ReturnButtonStyles.returnBtn} onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="arrow-left-top" size={24} color="black" />
        </TouchableOpacity>
    )
}