import { View, Text } from 'react-native'
import React from 'react'
import CategoryCardStyles from '../../styles/Component/CategoryCardStyles';
import { Category } from 'rr-apilib';

interface Props {
    category: Category;
}

export default function CategoryCard({title, numberResource}:Props) {
  return (
    <View style={CategoryCardStyles.cardBackground}>
      <Text style={CategoryCardStyles.cardTitle} numberOfLines={2}>{title}</Text>
      <Text style={CategoryCardStyles.cardText}>{numberResource.toString() + ' Ressource(s)'}</Text>
    </View>
  )
}