import { View, Text } from 'react-native'
import React from 'react'
import ResourceCardStyles from '../styles/ResourceCardStyles';

interface Props {
  user: string | undefined;
  title: string;
  description: string | null;
}

export default function ResourceCard({user="Utilisateur inconnu", title, description=''}:Props) {
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