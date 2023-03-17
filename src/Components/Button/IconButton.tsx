import React from 'react'
import { TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import deleteButtonStyles from '../../Styles/Components/Button/IconButtonStyles'
import { COLORS } from '../../Styles/Colors';

interface Props {
    callBack: () => void;
    size: number;
    name: any;
    color?: string;
    style?: any;
}

export default function IconButton({ callBack, name, size, color=COLORS.Black, style }: Props) {
    return (
        <TouchableOpacity onPress={callBack} style={[deleteButtonStyles.container, style]}>
            <MaterialCommunityIcons name={name} size={size} color={color} />
        </TouchableOpacity>
    )
}