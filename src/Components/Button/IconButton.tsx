import React from 'react'
import { ActivityIndicator, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { COLORS } from '../../Styles/Colors';
import IconButtonStyles from '../../Styles/Components/Button/IconButtonStyles';

interface Props {
    callBack: () => void;
    iconSize: number;
    iconName: any;
    iconColor?: string;
    iconStyle?: any;
    isDisabled?: boolean;
    isLoading?: boolean;
}

export default function IconButton({ callBack, iconName, iconSize, iconColor=COLORS.Black, iconStyle, isDisabled = false, isLoading = false }: Props) {
    return (
        <TouchableOpacity onPress={callBack} style={[IconButtonStyles.buttonContainer, iconStyle]} disabled={isDisabled}>
            {
                isLoading ? <ActivityIndicator size="small" color={COLORS.Black} /> :
                <MaterialCommunityIcons name={iconName} size={iconSize} color={iconColor} />
            }
        </TouchableOpacity>
    )
}