import { View, Text, TouchableHighlight, TextInput } from 'react-native'
import React, { useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import InputTextCommentStyles from '../../Styles/Components/Input/InputTextCommentStyles'
import { CommentBuilder, Resource } from 'rr-apilib';

interface Props {
    resource: Resource;
}

export default function InputTextComment({resource}:Props) {
    
    const [inputText, setInputText] = useState('');

    const onClickAddComment = () => {
        const builder = new CommentBuilder()
            .setComment(inputText)
            .setRessource(resource);
        resource.comments.create(builder);
        setInputText('');
    }

    return (
        <View style={InputTextCommentStyles.txtFieldBackground}>
            <TextInput style={InputTextCommentStyles.txtFieldInput} multiline={true} value={inputText} onChangeText={(newInputText) => setInputText(newInputText)}/>
            <TouchableHighlight onPress={onClickAddComment} underlayColor={"#FFFFFF"}>
				{
					<MaterialCommunityIcons style={InputTextCommentStyles.sendButtonInput} name="comment-arrow-left-outline" size={24} color="black" />
				}
			</TouchableHighlight>
        </View>
    )
}