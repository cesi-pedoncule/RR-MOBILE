import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';

import ButtonFileStyles from '../../Styles/Components/Button/ButtonFileStyles'

interface Props {
    text: string;
    callBack: () => void;
}

export default function ButtonFile({ text, callBack } : Props) {
    return (
        <TouchableOpacity style={ButtonFileStyles.container} onPress={callBack}>
            <Text>{text}</Text>
            <MaterialCommunityIcons name="arrow-down" size={24} color="black"/>
        </TouchableOpacity>
    )
}