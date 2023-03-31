import React from 'react'
import { TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { COLORS } from '../../Styles/Colors';
import IconButtonStyles from '../../Styles/Components/Button/IconButtonStyles';

interface Props {
    callBack: () => void;
    iconSize: number;
    iconName: any;
    iconColor?: string;
    iconStyle?: any;
}

export default function IconButton({ callBack, iconName, iconSize, iconColor=COLORS.Black, iconStyle }: Props) {
    return (
        <TouchableOpacity onPress={callBack} style={[IconButtonStyles.buttonContainer, iconStyle]}>
            <MaterialCommunityIcons name={iconName} size={iconSize} color={iconColor} />
        </TouchableOpacity>
    )
}