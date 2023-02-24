import { TouchableOpacity } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import deleteButtonStyles from '../../Styles/Components/Button/IconButtonStyles';

interface Props {
    callBack: ()=>void;
    size: number;
    name: any;
    color: string;
    style?: any;
}

export default function IconButton({callBack, name, size, color, style} : Props) {
    return (
        <TouchableOpacity onPress={callBack} style={[deleteButtonStyles.container, style]}>
            <MaterialCommunityIcons name={name} size={size} color={color} />
        </TouchableOpacity>
    )
}