import { View, Text } from 'react-native'
import React from 'react'
import CategoryCardStyles from '../../styles/Component/CategoryCardStyles';
import { Category } from 'rr-apilib';

interface Props {
    category: Category;
}

export default function CategoryCard({category}:Props) {
    return (
        <View style={CategoryCardStyles.cardBackground}>
            <Text style={CategoryCardStyles.cardTitle}>{category.name}</Text>
            <Text style={CategoryCardStyles.cardText}>{category.resources.size.toString() + ' Ressource(s)'}</Text>
        </View>
    )
}