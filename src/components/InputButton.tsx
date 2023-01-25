import { StyleSheet, TouchableHighlight, Text, View } from 'react-native'
import React from 'react'
import commonStyles from '../styles/commonStyles';

interface Props {
  label: string;
  callBack: ()=>void;
}

export default function InputButton({ label, callBack}: Props) {
  return (
    <TouchableHighlight style={commonStyles.btnBackground} onPress={callBack} underlayColor={"#000000"}>
        <Text style={commonStyles.btnText}>{label}</Text>
    </TouchableHighlight>
  )
}