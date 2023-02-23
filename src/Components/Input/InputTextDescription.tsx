import { TextInput, View } from 'react-native'
import React from 'react'
import InputTextDescriptionStyles from '../../Styles/Components/Input/InputTextDescriptionStyles'

export default function InputTextDescription() {
    return (
        <TextInput multiline={true} style={InputTextDescriptionStyles.container} placeholder={"Description de la ressource"}/>
    )
}