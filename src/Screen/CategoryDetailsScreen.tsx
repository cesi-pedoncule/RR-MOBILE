import { useEffect, useState } from "react";
import { Resource } from "rr-apilib";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
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
    const [ resources, setResources ] = useState<Resource[]>(Array.from(category.resources.cache.values()));
    const [ resourcesFiltered, setResourcesFiltered ] = useState<Resource[]>([]);

    const handleChangeSearch = (text: string) => {
		const filteredResources = Array.from(category.resources.cache.values()).filter((resource) => {
			return resource.title.toLowerCase().includes(text.toLowerCase());
		});
		setResources(filteredResources);
		setResourcesFiltered(filteredResources.splice(0, 6));
	}

    useEffect(() => {
        if (resourcesFiltered.length === 0 && resources.length !== 0) {
            setResourcesFiltered(resources.slice(0, 6));
        }
    }, [resources])

    const renderFooter = () => {
		return (
			<View>
				{
					resources.length >= 6 && resourcesFiltered.length !== resources.length &&
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
		setResourcesFiltered(resourcesFiltered.concat(resources.slice(resourcesFiltered.length, resourcesFiltered.length + 6)));
	}

    return (
        <View style={CommonStyles.container}>
            <TopBar onChangeSearch={handleChangeSearch} navigation={navigation} />
            <View style={CommonStyles.content}>
                <FlatList style={CommonStyles.itemsContainer} 
                    ListEmptyComponent={<Text style={CommonStyles.textEmptyResult}>Aucune ressource n'a été trouvée.</Text>}
                    contentContainerStyle = {CategoryDetailsStyles.resourcesContainer}
                    data={resourcesFiltered}
                    renderItem={({item}) => <ResourceCardWithUser resource={item} navigation={navigation}/>}
                    keyExtractor={item => item.id}
                    ListHeaderComponent={renderHeader}
                    ListFooterComponent={renderFooter}
                    onEndReached={onShowMoreItems}
                    onEndReachedThreshold={0}
                />
            </View>
        </View>
    )
}