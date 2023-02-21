import React from 'react'
import { View, Text } from 'react-native'

import CategoryCardStyles from '../../Styles/Components/Card/CategoryCardStyles';
import { Category } from 'rr-apilib';

interface Props {
    category: Category;
}

export default function CategoryCard({ category }:Props) {
    return (
        <View style={CategoryCardStyles.cardBackground}>
            <Text style={CategoryCardStyles.cardTitle} numberOfLines={2}>{category.name}</Text>
            <Text style={CategoryCardStyles.cardText}>{category.resources.size.toString() + ' Ressource(s)'}</Text>
        </View>
    )
}