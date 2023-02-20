import { TouchableHighlight, Text } from 'react-native'
import React from 'react'
import InputButtonStyles from '../../styles/Component/InputButtonStyles';

interface Props {
  label: string;
  callBack: ()=>void;
  style?: any;
}

export default function InputButton({ label, callBack, style}: Props) {
    return (
        <TouchableHighlight style={[InputButtonStyles.btnBackground, style]} onPress={callBack} underlayColor={"#FFFFFF"}>
            <Text style={InputButtonStyles.btnText}>{label}</Text>
        </TouchableHighlight>
    )
}