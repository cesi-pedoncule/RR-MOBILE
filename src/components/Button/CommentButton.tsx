import { View, Text, TouchableHighlight } from 'react-native'
import React from 'react'
import CommentButtonStyles from '../../styles/Component/CommentButtonStyles';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Props {
	callBack: ()=>void;
	commentNumber:number;
  }

export default function CommentButton({ callBack, commentNumber }: Props) {
  return (
    <View style={CommentButtonStyles.container}>
      <Text style={CommentButtonStyles.numberComment}>{commentNumber.toString()}</Text>
			<TouchableHighlight style={CommentButtonStyles.commentBtn} onPress={callBack}>
				{
                    <MaterialCommunityIcons name="comment-outline" size={24} color="black" />
				}
			</TouchableHighlight>
    </View>
  )
}
