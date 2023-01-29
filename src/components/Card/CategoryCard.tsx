import { View, Text } from 'react-native'
import React from 'react'
import CategoryCardStyles from '../../styles/CategoryCardStyles';

interface Props {
    title: string;
    numberResource: number;
}

export default function CategoryCard({title, numberResource}:Props) {
  return (
    <View style={CategoryCardStyles.cardBackground}>
      <Text style={CategoryCardStyles.cardTitle}>{title}</Text>
      <Text style={CategoryCardStyles.cardText}>{numberResource.toString() + ' Ressource(s)'}</Text>
    </View>
  )
}