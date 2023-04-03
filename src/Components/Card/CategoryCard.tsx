import React from 'react'
import { Category, Resource } from 'rr-apilib';
import { Text, TouchableOpacity } from 'react-native'
import { NavigationParamList } from '../../Types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import CategoryCardStyles from '../../Styles/Components/Card/CategoryCardStyles';

interface Props {
    navigation: NativeStackNavigationProp<NavigationParamList>;
    category: Category;
    resources:  Resource[]
}

export default function CategoryCard({ navigation, category, resources }:Props) {
    
    const handleOnPress = () => {

        if (category.resources.cache.size === 0) {
            alert("Cette catégorie ne contient aucune ressource.")
        } else {
            navigation.navigate('CategoryDetails', { category: category, client: category.client })
        }
    }
    
    return (
        <TouchableOpacity style={CategoryCardStyles.cardBackground} onPress={handleOnPress}>
            <Text style={CategoryCardStyles.cardTitle} numberOfLines={2}>{category.name}</Text>
            <Text style={CategoryCardStyles.cardText}>{resources.length.toString() + " Ressource(s)"}</Text>
        </TouchableOpacity>
    )
}