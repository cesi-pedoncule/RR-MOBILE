import { useCallback, useEffect, useState } from "react";
import { Resource } from "rr-apilib";
import { ActivityIndicator, FlatList, RefreshControl, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import CommonStyles from "../Styles/CommonStyles";
import CategoryDetailsStyles from "../Styles/Screen/CategoryDetailsStyles";
import Header from "../Components/Header";
import TopBar from "../Components/Input/TopBar";
import { NavigationParamList } from "../Types/navigation";
import ResourceCardWithUser from "../Components/Card/ResourceCardWithUser";
import { COLORS } from "../Styles/Colors";
import IconButton from "../Components/Button/IconButton";

type Props = NativeStackScreenProps<NavigationParamList, 'CategoryDetails'>;

export default function CategoryDetailsScreen ({ navigation, route }: Props) {
    const category = route.params.category;
    const client = route.params.client;

    const [ searchText, setSearchText ] = useState<string>('');
    const [ resourcesFiltered, setResourcesFiltered ] = useState<Resource[]>([]);
    const [ refreshing, setRefreshing ] = useState(false);

    const handleChangeSearch = (text: string) => {
        setSearchText(text);
		const filteredResources = Array.from(category.resources.getValidateResources().values()).filter((resource) =>
			resource.title.toLowerCase().includes(searchText.toLowerCase())
		);
		setResourcesFiltered(filteredResources.splice(0, 6));
	}

    useEffect(() => {
        navigation.addListener('focus', () => {
            onRefresh();
        });
    }, [navigation]);

    const onRefresh = () => {
        const newCategorie = client.categories.cache.get(category.id);
        if(newCategorie){
            const refreshResources:Resource[] = Array.from(newCategorie.resources.getValidateResources().values());
            setResourcesFiltered([...refreshResources.slice(0, 6)]);
            setRefreshing(false);
            setSearchText('');
        }
    };

    const onRefreshFetchAll = useCallback(async () => {
        setRefreshing(true);
        await client.resources.fetchAll();
        const newCategorie = client.categories.cache.get(category.id);
        if(newCategorie){
            const refreshResources:Resource[] = Array.from(newCategorie.resources.getValidateResources().values());
            setResourcesFiltered([...refreshResources.slice(0, 6)]);
            setRefreshing(false);
            setSearchText('');
        }
    }, []);

    const renderFooter = () => {
		return (
			<View>
				{
					searchText.length === 0 && category.resources.getValidateResources().size >= 6 && resourcesFiltered.length !== category.resources.getValidateResources().size && resourcesFiltered.length != 0 &&
					<ActivityIndicator size="large" color={COLORS.AccentColor} style={CommonStyles.loadMoreContent} />
				}	
			</View>
		)
	}

	const renderHeader = () => {
		return (
			<View style={CommonStyles.listHeaderComponent}>
                <IconButton iconStyle={CommonStyles.returnBtnInFlatList} callBack={() => navigation.goBack()} iconSize={24} iconName={"arrow-left-top"}/>  
				<Header label={category.name}/>
			</View>
		)
	}

	const onShowMoreItems = () => {
        searchText.length === 0 &&
		setResourcesFiltered(resourcesFiltered.concat(Array.from(category.resources.getValidateResources().values()).slice(resourcesFiltered.length, resourcesFiltered.length + 6)));
	}

    return (
        <View style={CommonStyles.container}>
            <TopBar value={searchText} onChangeSearch={handleChangeSearch} navigation={navigation} client={client} />
            <View style={CommonStyles.content}>
                <FlatList style={CommonStyles.itemsContainer} 
                    ListEmptyComponent={<Text style={CommonStyles.textEmptyResult}>Aucune ressource n'a été trouvée.</Text>}
                    contentContainerStyle = {CategoryDetailsStyles.resourcesContainer}
                    data={resourcesFiltered}
                    renderItem={({item}) => <ResourceCardWithUser resourceData={item} navigation={navigation} onDoubleClick={onRefresh}/>}
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