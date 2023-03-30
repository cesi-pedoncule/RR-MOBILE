import { View, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import InputTextCommentStyles from '../../Styles/Components/Input/InputTextCommentStyles'
import { Comment, CommentBuilder, Resource } from 'rr-apilib';
import { COLORS } from '../../Styles/Colors';

interface Props {
    resource: Resource;
    setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
    setCommentsSlice: React.Dispatch<React.SetStateAction<Comment[]>>;
}

export default function InputTextComment({resource, setComments, setCommentsSlice}:Props) {
    
    const [inputText, setInputText] = useState('');

    const onClickAddComment = async () => {
        if(inputText != ''){
            const builder = new CommentBuilder()
                .setComment(inputText)
                .setRessource(resource);

            const res = await resource.comments.create(builder);
            const comments = Array.from(res.comments.cache.values());

            setComments(comments);
            setCommentsSlice(comments.reverse());
        } else {
            alert("La zone de texte est vide")
        }

        setInputText('');
    }

    return (
        <View style={InputTextCommentStyles.txtFieldBackground}>
            <TextInput style={InputTextCommentStyles.txtFieldInput} multiline={true} value={inputText} onChangeText={(newInputText) => setInputText(newInputText)}/>
            <TouchableOpacity onPress={onClickAddComment}>
				{
					<MaterialCommunityIcons style={InputTextCommentStyles.sendButtonInput} name="comment-arrow-left-outline" size={24} color={COLORS.Black} />
				}
			</TouchableOpacity>
        </View>
    )
}