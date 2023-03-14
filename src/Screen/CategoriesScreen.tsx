import React, { useState } from "react";
import { View, ScrollView, Text, ActivityIndicator } from 'react-native'
import { Client } from "rr-apilib";
import CommonStyles from "../Styles/CommonStyles";
import ButtonShowMoreItems from "../Components/Button/ButtonShowMoreItems";
import TopBar from "../Components/Input/TopBar";
import CategoryCard from "../Components/Card/CategoryCard";
import CategoryStyles from "../Styles/Screen/CategoryStyles";
import useCategories from "../Hooks/useCategories";
import { COLORS } from "../Styles/Colors";

export default function CategoriesScreen({ route, navigation }: any) {
    const client = route.params as Client;

    const { categories, setCategories, loading } = useCategories({ client });
    const [ showMoreItems, setShowMoreItems ] = useState<boolean>(false);

    const onClickShowMoreItems = () => {
        setShowMoreItems(true);
    }

    const handleChangeSearch = (text: string) => {
        const filteredCategories = Array.from(client.categories.cache.values()).filter((category) => {
            return category.name.toLowerCase().includes(text.toLowerCase());
        });
        setCategories(filteredCategories);
    }
  
    return (
        <View style={CommonStyles.container}>
            <TopBar onChangeSearch={handleChangeSearch} navigation={navigation} />
            <View style={CommonStyles.content}>
                {
                    loading ?  <ActivityIndicator size="large" color={COLORS.AccentColor} style={CommonStyles.loader} /> :
                    <ScrollView style={CommonStyles.scrollView}>
                        <View style={CategoryStyles.categoriesContainer}>
                            {
                                categories.map((category, i) => {
                                    if ((!showMoreItems && i < 6) || showMoreItems) {
                                        return <CategoryCard category={category} key={i} />
                                    }
                                })
                            }
                            {
                                categories.length == 0 && <Text style={CommonStyles.textEmptyResult}> Aucune catégorie n'a été trouvée. </Text>
                            }
                        </View>
                        <View style={CategoryStyles.showMoreItemsContainer}>
                            {
                                !showMoreItems && categories.length >= 6 && (
                                    <ButtonShowMoreItems callBack={onClickShowMoreItems} />
                                )
                            }
                        </View>
                    </ScrollView>
                }
            </View>
        </View>
    )
}