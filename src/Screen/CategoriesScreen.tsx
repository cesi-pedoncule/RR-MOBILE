import React, { useCallback, useEffect, useState } from "react";
import { View, Text, ActivityIndicator, FlatList, RefreshControl } from 'react-native'
import CommonStyles from "../Styles/CommonStyles";
import TopBar from "../Components/Input/TopBar";
import CategoryCard from "../Components/Card/CategoryCard";
import CategoryStyles from "../Styles/Screen/CategoryStyles";
import { COLORS } from "../Styles/Colors";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigationParamList } from "../Types/navigation";
import Header from "../Components/Header";
import { Category } from "rr-apilib";

type Props = NativeStackScreenProps<NavigationParamList, 'Categories'>;

export default function CategoriesScreen({ route, navigation }: Props) {

    const client = route.params.client;

    const [ searchText, setSearchText ] = useState<string>('');
    const [ categoriesFiltered, setCategoriesFiltered ] = useState<Category[]>([]);
    const [ refreshing, setRefreshing ] = useState(false);

    const handleChangeSearch = (text: string) => {
        setSearchText(text);
        const filteredCategories = Array.from(client.categories.cache.values()).filter((category) => 
            category.name.toLowerCase().includes(searchText.toLowerCase()) && category.isVisible
        );
        setCategoriesFiltered([...filteredCategories.slice(0, 8)]);
    }
  
    useEffect(() => {
        navigation.addListener('focus', () => {
            onRefresh();
        });
    }, [navigation])

    const onRefresh = () => {
        const refreshCategories:Category[] = Array.from(client.categories.cache.filter((category) => category.isVisible).values());
		setCategoriesFiltered([...refreshCategories.slice(0, 8)]);
		setRefreshing(false);
        setSearchText('');
 	 };

      const onRefreshFetchAll = useCallback(async () => {
        setRefreshing(true);
        await client.categories.fetchAll();
        const refreshCategories:Category[] = Array.from(client.categories.cache.filter((category) => category.isVisible).values());
		setCategoriesFiltered([...refreshCategories.slice(0, 8)]);
		setRefreshing(false);
        setSearchText('');
 	 }, []);

    const renderFooter = () => {
		return (
			<View>
				{
					searchText.length === 0 && client.categories.cache.size >= 8  && categoriesFiltered.length !== client.categories.cache.size && categoriesFiltered.length != 0 &&
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
        searchText.length === 0 && 
		setCategoriesFiltered(categoriesFiltered.concat(Array.from(client.categories.cache.values()).slice(categoriesFiltered.length, categoriesFiltered.length + 6)));
	}

    return (
        <View style={CommonStyles.container}>
            <TopBar value={searchText} onChangeSearch={handleChangeSearch} navigation={navigation} client={client} />
            <View style={CommonStyles.content}>
                <FlatList style={CommonStyles.itemsContainer} 
                    ListEmptyComponent={<Text style={CommonStyles.textEmptyResult}>Aucune catégorie n'a été trouvée.</Text>}
                    columnWrapperStyle={CategoryStyles.columnWrapperStyle}
                    contentContainerStyle={CategoryStyles.categoriesContainer}
                    initialNumToRender={2}
                    numColumns={2}
                    data={categoriesFiltered}
                    renderItem={({item, index}) => 
                        <View style={{flex: 1,marginLeft: index % 2 !== 0 ? 20 : 0}}>
                            <CategoryCard category={item} navigation={navigation} resources={Array.from(item.resources.getValidateResources().values())}/>
                        </View>
                    }
                    keyExtractor={item => item.id}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefreshFetchAll} />}
                    ListHeaderComponent={renderHeader}
                    ListFooterComponent={renderFooter}
                    onEndReached={onShowMoreItems}
                    onEndReachedThreshold={0}
                />
            </View>
        </View>
    )
}