import { View, TextInput, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import InputTextCommentStyles from '../../Styles/Components/Input/InputTextCommentStyles'
import { Comment, CommentBuilder, Resource } from 'rr-apilib';
import IconButton from '../Button/IconButton';

interface Props {
    resource: Resource;
    setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
}

export default function InputTextComment({resource, setComments}:Props) {
    
    const [inputText, setInputText] = useState('');
    const [ isLoading, setIsLoading ] = useState<boolean>(false);

    const onClickAddComment = async () => {
        setIsLoading(true);

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
        setIsLoading(false);
    }

    return (
        <View style={InputTextCommentStyles.txtFieldBackground}>
            <TextInput style={InputTextCommentStyles.txtFieldInput} multiline={true} value={inputText} onChangeText={(newInputText) => setInputText(newInputText)}/>
            <IconButton 
                isDisabled={isLoading} 
                isLoading={isLoading} 
                callBack={onClickAddComment} 
                iconStyle={InputTextCommentStyles.sendButtonInput} 
                iconSize={24} 
                iconName={"comment-arrow-left-outline"} 
            />
        </View>
    )
}