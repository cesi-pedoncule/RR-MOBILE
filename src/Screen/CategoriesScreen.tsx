import React, { useEffect, useState } from "react";
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
import { Category } from "rr-apilib";

type Props = NativeStackScreenProps<NavigationParamList, 'Categories'>;

export default function CategoriesScreen({ route, navigation }: Props) {

    const client = route.params.client;

    const { categories, setCategories, loading } = useCategories({ client });
    const [ categoriesFiltered, setCategoriesFiltered ] = useState<Category[]>([]);

    const handleChangeSearch = (text: string) => {
        const filteredCategories = Array.from(client.categories.cache.values()).filter((category) => {
            return category.name.toLowerCase().includes(text.toLowerCase());
        });
        setCategories(filteredCategories);
        setCategoriesFiltered(filteredCategories.splice(0, 8))
    }
  
    useEffect(() => {
        if (categoriesFiltered.length === 0 && categories.length !== 0 && !loading) {
            setCategoriesFiltered(categories.slice(0, 8));
        }
    }, [categories, loading])

    const renderFooter = () => {
		return (
			<View>
				{
					categories.length >= 8  && categoriesFiltered.length !== categories.length &&
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
		setCategoriesFiltered(categoriesFiltered.concat(categories.slice(categoriesFiltered.length, categoriesFiltered.length + 6)));
	}

    return (
        <View style={CommonStyles.container}>
            <TopBar onChangeSearch={handleChangeSearch} navigation={navigation} />
            <View style={CommonStyles.content}>
                {
                    loading ? <ActivityIndicator size="large" color={COLORS.AccentColor} style={CommonStyles.loader} /> :
                    <FlatList style={CommonStyles.itemsContainer} 
                        ListEmptyComponent={<Text style={CommonStyles.textEmptyResult}>Aucune catégorie n'a été trouvée.</Text>}
                        columnWrapperStyle={CategoryStyles.columnWrapperStyle}
                        contentContainerStyle={CategoryStyles.categoriesContainer}
                        initialNumToRender={2}
                        numColumns={2}
                        data={categoriesFiltered}
                        renderItem={({item, index}) => 
                            <View style={{flex: 1,marginLeft: index % 2 !== 0 ? 20 : 0}}>
                                <CategoryCard category={item} navigation={navigation}/>
                            </View>
                        }
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