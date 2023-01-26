import { TouchableHighlight, Text } from 'react-native'
import React from 'react'
import commonStyles from '../styles/commonStyles';

interface Props {
  label: string;
  callBack: ()=>void;
  style?: any;
}

export default function InputButton({ label, callBack, style}: Props) {
  return (
    <TouchableHighlight style={[commonStyles.btnBackground, style]} onPress={callBack} underlayColor={"#FFFFFF"}>
        <Text style={commonStyles.btnText}>{label}</Text>
    </TouchableHighlight>
  )
}