import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';

import ButtonFileStyles from '../../Styles/Components/Button/ButtonFileStyles'
import { COLORS } from '../../Styles/Colors';

interface Props {
    text: string;
    callBack: () => void;
}

export default function ButtonFile({ text, callBack } : Props) {
    return (
        <TouchableOpacity style={ButtonFileStyles.buttonFileContainer} onPress={callBack}>
            <Text style={{color: COLORS.Black, width: '80%'}}>{text}</Text>
            <MaterialCommunityIcons name="arrow-down" size={24} color={COLORS.Black}/>
        </TouchableOpacity>
    )
}