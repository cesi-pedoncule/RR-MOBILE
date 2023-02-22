import { View, Text, TouchableHighlight, TextInput } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import InputTextCommentStyles from '../../Styles/Components/Input/InputTextCommentStyles'

interface Props {
    callBack: ()=>void;
}

export default function InputTextComment({callBack}:Props) {
    
    return (
        <View style={InputTextCommentStyles.txtFieldBackground}>
            <TextInput style={InputTextCommentStyles.txtFieldInput} multiline={true}/>
            <TouchableHighlight onPress={callBack} underlayColor={"#FFFFFF"}>
				{
					<MaterialCommunityIcons style={InputTextCommentStyles.sendButtonInput} name="comment-arrow-left-outline" size={24} color="black" />
				}
			</TouchableHighlight>
        </View>
    )
}