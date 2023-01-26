import { View, Text } from 'react-native'
import React from 'react'
import commonStyles from '../styles/commonStyles';

interface Props {
  user: string;
  title: string;
  description: string;
}

export default function ResourceCard({user, title, description}:Props) {
  return (
    <View style={commonStyles.cardBackground}>
      <View>
        <Text style={commonStyles.cardUser}>{user}</Text>
        <Text style={commonStyles.cardTitle}>{title}</Text>
      </View>
      <Text style={commonStyles.cardText}>{description}</Text>
    </View>
  )
}