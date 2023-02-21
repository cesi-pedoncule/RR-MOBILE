import React, { useState } from "react";
import { View, ScrollView, Text } from 'react-native'
import { Category, Client } from "rr-apilib";
import NavBar from "../components/NavBar";
import CommonStyles from "../styles/CommonStyles";
import ButtonShowMoreItems from "../components/Button/ButtonShowMoreItems";
import TopBar from "../components/TopBar";
import CategoryCard from "../components/Card/CategoryCard";
import CategoryStyles from "../styles/Screen/CategoryStyles";

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
        <View style={CommonStyles.container}>
            <TopBar onChangeSearch={handleChangeSearch} />
            <View style={CommonStyles.content}> 
                <ScrollView style={CommonStyles.scrollView}>
                    <View style={CategoryStyles.categoriesContainer}>
                        {
                            categories.map((category, i) => {
                                if ((!showMoreItems && i < 6) || showMoreItems) {
                                    return <CategoryCard category={category} key={i} ></CategoryCard>
                                }
                            })
                        }
                    </View>
                </ScrollView>
                <View style={CategoryStyles.showMoreItemsContainer}>
                    {
                        !showMoreItems ?
                        <ButtonShowMoreItems callBack={onClickShowMoreItems} />
                        : null
                    }
                </View>
                <NavBar client={client}/>
            </View>
        </View>
    )
}