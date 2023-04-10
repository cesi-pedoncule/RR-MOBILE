import { View, Text, TextInput, KeyboardType, TextInputFocusEventData, NativeSyntheticEvent } from 'react-native'
import React from 'react'
import inputTextStyles from '../../Styles/Components/Input/InputTextStyles';

interface Props {
  placeholder: string;
  type: KeyboardType;
  secureTextEntry?: boolean;
  onChangeText?: (value: string) => void;
  onBlur?: () => void;
  isValid?: boolean,
}

export default function InputText({placeholder, type, secureTextEntry=false, onChangeText = (text: string) => {} , onBlur = () => {}, isValid = true} : Props) {
  return (
    <View style={isValid ? inputTextStyles.txtFieldBackground : inputTextStyles.txtFieldBackgroundNotValid}>
      <Text style={inputTextStyles.txtFieldText}>{placeholder}</Text>
      <TextInput style={inputTextStyles.txtFieldInput} keyboardType={type} secureTextEntry={secureTextEntry} onChangeText={(text) => {onChangeText(text)}} onBlur={onBlur}/>
    </View>
  )
}