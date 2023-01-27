import { View, Text } from 'react-native'
import React from 'react'
import ResourceCardStyles from '../styles/ResourceCardStyles';

interface Props {
  user: string;
  title: string;
  description: string;
}

export default function ResourceCard({user, title, description}:Props) {
  return (
    <View style={ResourceCardStyles.cardBackground}>
      <View>
        <Text style={ResourceCardStyles.cardUser}>{user}</Text>
        <Text style={ResourceCardStyles.cardTitle}>{title}</Text>
      </View>
      <Text style={ResourceCardStyles.cardText}>{description}</Text>
    </View>
  )
}