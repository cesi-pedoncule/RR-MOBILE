import { TextInput } from 'react-native'
import React from 'react'
import InputTextDescriptionStyles from '../../Styles/Components/Input/InputTextDescriptionStyles'

interface Props {
    onChangeText: (text:string) => void;
    defaultValue: string | any;
}

export default function InputTextDescription({onChangeText, defaultValue} : Props) {
    return (
        <TextInput multiline={true} style={InputTextDescriptionStyles.container} placeholder={"Description de la ressource"} defaultValue={defaultValue} onChangeText={onChangeText}/>
    )
}