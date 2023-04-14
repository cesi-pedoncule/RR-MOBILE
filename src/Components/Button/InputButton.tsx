import React from 'react'
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native'
import InputButtonStyles from '../../Styles/Components/Button/InputButtonStyles';
import { COLORS } from '../../Styles/Colors';

interface Props {
    label: string;
    callBack: () => void;
    style?: any;
    isDisabled?: boolean;
    isLoading?: boolean;
}

export default function InputButton({ label, callBack, style, isDisabled = false, isLoading = false }: Props) {
    return (
        <TouchableOpacity 
            style={[InputButtonStyles.btnBackground, style]} 
            onPress={callBack}
            disabled={isDisabled}
        >
            {
                isLoading ? <ActivityIndicator size="small" color={COLORS.White} /> :
                <Text style={InputButtonStyles.btnText}>{label}</Text>
            }
        </TouchableOpacity>
    )
}