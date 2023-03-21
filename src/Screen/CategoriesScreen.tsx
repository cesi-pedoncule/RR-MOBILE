import React, { useState } from "react";
import { View, Text, ActivityIndicator, FlatList } from 'react-native'
import CommonStyles from "../Styles/CommonStyles";
import TopBar from "../Components/Input/TopBar";
import CategoryCard from "../Components/Card/CategoryCard";
import CategoryStyles from "../Styles/Screen/CategoryStyles";
import useCategories from "../Hooks/useCategories";
import { COLORS } from "../Styles/Colors";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigationParamList } from "../Types/navigation";
import Header from "../Components/Header";

type Props = NativeStackScreenProps<NavigationParamList, 'Categories'>;

export default function CategoriesScreen({ route, navigation }: Props) {

    const client = route.params.client;

    const { categories, setCategories, loading } = useCategories({ client });

    const handleChangeSearch = (text: string) => {
        const filteredCategories = Array.from(client.categories.cache.values()).filter((category) => {
            return category.name.toLowerCase().includes(text.toLowerCase());
        });
        setCategories(filteredCategories.splice(0, 6));
    }
  
    const renderFooter = () => {
		return (
			<View>
				{
					categories.length >= 6  &&
					<ActivityIndicator size="large" color={COLORS.AccentColor} style={CommonStyles.loadMoreContent} />
				}	
			</View>
		)
	}

	const renderHeader = () => {
		return (
			<View style={CommonStyles.listHeaderComponent}>
				<Header label={"Les catégories"}/>
			</View>
		)
	}

	const onShowMoreItems = () => {
		setCategories(categories.concat(categories.slice(categories.length, categories.length + 6)));
	}

    return (
        <View style={CommonStyles.container}>
            <TopBar onChangeSearch={handleChangeSearch} navigation={navigation} />
            <View style={CommonStyles.content}>
                {
                    loading ? <ActivityIndicator size="large" color={COLORS.AccentColor} style={CommonStyles.loader} /> :
                    <FlatList style={CommonStyles.scrollView} 
                        ListEmptyComponent={<Text style={CommonStyles.textEmptyResult}>Aucune catégorie n'a été trouvée.</Text>}
                        contentContainerStyle = {CategoryStyles.categoriesContainer}
                        data={categories}
                        renderItem={({item}) => <CategoryCard category={item} navigation={navigation}/>}
                        keyExtractor={item => item.id}
                        ListHeaderComponent={renderHeader}
                        ListFooterComponent={renderFooter}
                        onEndReached={onShowMoreItems}
                        onEndReachedThreshold={0}
                    />
                }
            </View>
        </View>
    )
}