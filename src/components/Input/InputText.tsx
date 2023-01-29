import { View, Text, TextInput, KeyboardType } from 'react-native'
import React from 'react'
import commonStyles from '../../styles/commonStyles';

interface Props {
  placeholder: string;
  type: KeyboardType;
  secureTextEntry?: boolean
}

export default function InputText({placeholder, type, secureTextEntry=false} : Props) {
  return (
    <View style={commonStyles.txtFieldBackground}>
      <Text style={commonStyles.txtFieldText}>{placeholder}</Text>
      <TextInput style={commonStyles.txtFieldInput} keyboardType={type} secureTextEntry={secureTextEntry} />
    </View>
  )
}