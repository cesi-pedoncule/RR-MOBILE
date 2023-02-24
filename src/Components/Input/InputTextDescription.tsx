import { TextInput } from 'react-native'
import React from 'react'
import InputTextDescriptionStyles from '../../Styles/Components/Input/InputTextDescriptionStyles'
import { ResourceBuilder } from 'rr-apilib'

interface Props {
    newResource: ResourceBuilder;
}

export default function InputTextDescription({newResource} : Props) {
    return (
        <TextInput multiline={true} style={InputTextDescriptionStyles.container} placeholder={"Description de la ressource"} onChangeText={(text) => newResource.setDescription(text)}/>
    )
}