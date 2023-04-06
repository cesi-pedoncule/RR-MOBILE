import { View, Text, TextInput, KeyboardType } from 'react-native'
import React from 'react'
import inputTextStyles from '../../Styles/Components/Input/InputTextStyles';

interface Props {
  placeholder: string;
  type: KeyboardType;
  secureTextEntry?: boolean;
  onChangeText?: (value: string) => void;
}

export default function InputText({placeholder, type, secureTextEntry=false, onChangeText = (text: string) => {} } : Props) {
  return (
    <View style={inputTextStyles.txtFieldBackground}>
      <Text style={inputTextStyles.txtFieldText}>{placeholder}</Text>
      <TextInput style={inputTextStyles.txtFieldInput} keyboardType={type} secureTextEntry={secureTextEntry} onChangeText={(text) => {onChangeText(text)}} />
    </View>
  )
}