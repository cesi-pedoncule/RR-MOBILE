import React from 'react'
import { TouchableOpacity, Text } from 'react-native'

import InputButtonStyles from '../../Styles/Components/Button/InputButtonStyles';

interface Props {
    label: string;
    callBack: () => void;
    style?: any;
    isDisabled?: boolean;
}

export default function InputButton({ label, callBack, style, isDisabled = false }: Props) {
    return (
        <TouchableOpacity 
            style={[InputButtonStyles.btnBackground, style]} 
            onPress={callBack}
            disabled={isDisabled}
        >
            <Text style={InputButtonStyles.btnText}>{label}</Text>
        </TouchableOpacity>
    )
}