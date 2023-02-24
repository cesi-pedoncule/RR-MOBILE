import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CommentButtonStyles from '../../Styles/Components/Button/CommentButtonStyles';

interface Props {
	callBack: () => void;
	commentNumber: number;
}

export default function CommentButton({ callBack, commentNumber }: Props) {
    return (
        <View style={CommentButtonStyles.container}>
            <Text style={CommentButtonStyles.numberComment}>{commentNumber.toString()}</Text>
            <TouchableOpacity style={CommentButtonStyles.commentBtn} onPress={callBack}>
                {
                    <MaterialCommunityIcons name="comment-outline" size={24} color="black" />
                }
            </TouchableOpacity>
        </View>
    )
}
