import { View, TouchableHighlight, TextInput } from 'react-native'
import React, { useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import InputTextCommentStyles from '../../Styles/Components/Input/InputTextCommentStyles'
import { Comment, CommentBuilder, Resource } from 'rr-apilib';

interface Props {
    resource: Resource;
    setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
}

export default function InputTextComment({resource, setComments}:Props) {
    
    const [inputText, setInputText] = useState('');

    const onClickAddComment = async () => {
        const builder = new CommentBuilder()
            .setComment(inputText)
            .setRessource(resource);

        const res = await resource.comments.create(builder);
        setComments(Array.from(res.comments.cache.values()));

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