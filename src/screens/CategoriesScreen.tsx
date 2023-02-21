import React, { useState } from "react";
import { View, ScrollView, Text } from 'react-native'
import { Category, Client } from "rr-apilib";
import NavBar from "../components/NavBar";
import commonStyles from "../styles/commonStyles";
import ButtonShowMoreItems from "../components/Button/ButtonShowMoreItems";
import TopBar from "../components/TopBar";
import CategoryCard from "../components/Card/CategoryCard";

export default function CategoriesScreen({ route }: any) {
    const client = route.params as Client;
    const [showMoreItems, setShowMoreItems] = useState<boolean>(false);
    const [categories, setCategories] = useState<Category[]>(Array.from(client.categories.cache.values()));

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
        <View style={commonStyles.container}>
            <TopBar onChangeSearch={handleChangeSearch} />
            <View style={commonStyles.content}> 
                <ScrollView style={commonStyles.scrollViewCategories}>
                    <View style={commonStyles.categoriesContainer}>
                        {
                            categories.map((category, i) => {
                                if ((!showMoreItems && i < 6) || showMoreItems) {
                                    return <CategoryCard category={category} key={i} ></CategoryCard>
                                }
                            })
                        }
                        {
                            !showMoreItems ?
                            <ButtonShowMoreItems callBack={onClickShowMoreItems} />
                            : null
                        }
                    </View>
                </ScrollView>
                <NavBar client={client}/>
            </View>
        </View>
    )
}