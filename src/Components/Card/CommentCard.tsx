import { View, Text } from 'react-native'
import React from 'react'
import CommentCardStyles from '../../Styles/Components/Card/CommentCardStyles';

interface Props {
    userName: string;
    comment: string;
}

export default function CommentCard({userName, comment}:Props) {
  return (
    <View style={CommentCardStyles.cardBackground}>
      <Text style={CommentCardStyles.cardUser}>{userName}</Text>
      <Text style={CommentCardStyles.cardComment}>{comment}</Text>
    </View>
  )
}