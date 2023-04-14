import { View, TextInput, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import InputTextCommentStyles from '../../Styles/Components/Input/InputTextCommentStyles'
import { Comment, CommentBuilder, Resource } from 'rr-apilib';
import { COLORS } from '../../Styles/Colors';

interface Props {
    resource: Resource;
    setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
}

export default function InputTextComment({resource, setComments}:Props) {
    
    const [inputText, setInputText] = useState('');

    const onClickAddComment = async () => {
        try {
            if(inputText != ''){
                const builder = new CommentBuilder()
                    .setComment(inputText)
                    .setRessource(resource);

                const res = await resource.comments.create(builder);
                const comments = Array.from(res.comments.sort().values());

                setComments(comments);
            } else {
                ToastAndroid.show("La zone de texte est vide" , ToastAndroid.CENTER);
            }
        } catch(error) {
            ToastAndroid.show("Problème lors de l'ajout d'un commentaire" , ToastAndroid.CENTER);
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