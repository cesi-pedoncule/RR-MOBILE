import React from 'react'
import { View, Text } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';

import CommentButtonStyles from '../../Styles/Components/Button/CommentButtonStyles';

interface Props {
	commentNumber: number;
}

export default function CommentButton({ commentNumber }: Props) {
    return (
        <View style={CommentButtonStyles.container}>
            <Text style={CommentButtonStyles.numberComment}>{commentNumber.toString()}</Text>
            <MaterialCommunityIcons style={CommentButtonStyles.commentBtn} name="comment-outline" size={24} color="black" />
        </View>
    )
}
