import { View, Text, TextInput, KeyboardType } from 'react-native'
import React from 'react'
import inputTextStyles from '../../styles/Component/InputTextStyles';

interface Props {
  placeholder: string;
  type: KeyboardType;
  secureTextEntry?: boolean
}

export default function InputText({placeholder, type, secureTextEntry=false} : Props) {
  return (
    <View style={inputTextStyles.txtFieldBackground}>
      <Text style={inputTextStyles.txtFieldText}>{placeholder}</Text>
      <TextInput style={inputTextStyles.txtFieldInput} keyboardType={type} secureTextEntry={secureTextEntry} />
    </View>
  )
}