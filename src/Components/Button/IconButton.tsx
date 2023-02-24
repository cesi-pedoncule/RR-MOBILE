import { TouchableOpacity } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import deleteButtonStyles from '../../Styles/Components/Button/IconButtonStyles';

interface Props {
    callBack: ()=>void;
    name: any;
}

export default function IconButton({callBack, name} : Props) {
    return (
        <TouchableOpacity onPress={callBack} style={deleteButtonStyles.container}>
            <MaterialCommunityIcons name={name} size={24} color="black" />
        </TouchableOpacity>
    )
}