import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import CategoryCardStyles from '../../Styles/Components/Card/CategoryCardStyles';
import { Category } from 'rr-apilib';

interface Props {
    navigation: any;
    category: Category;
}

export default function CategoryCard({ navigation, category }:Props) {
    
    const handleOnPress = () => {

        if (category.resources.cache.size === 0) {
            alert("Cette catégorie ne contient aucune ressource.")
        } else {
            navigation.navigate('CategoryDetails', { category: category })
        }
    }
    
    return (
        <TouchableOpacity style={CategoryCardStyles.cardBackground} onPress={handleOnPress}>
            <Text style={CategoryCardStyles.cardTitle} numberOfLines={2}>{category.name}</Text>
            <Text style={CategoryCardStyles.cardText}>{category.resources.cache.size.toString() + " Ressource(s)"}</Text>
        </TouchableOpacity>
    )
}