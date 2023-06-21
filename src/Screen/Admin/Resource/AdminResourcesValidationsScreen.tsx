import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, Text, FlatList, RefreshControl } from 'react-native'
import { APIValidationState, Resource } from "rr-apilib";
import CommonStyles from "../../../Styles/CommonStyles";
import TopBar from "../../../Components/Input/TopBar";
import ResourcesStyles from "../../../Styles/Screen/Resource/ResourcesStyles";
import { COLORS } from "../../../Styles/Colors";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NavigationParamList } from "../../../Types/navigation";
import Header from "../../../Components/Header";
import IconButton from "../../../Components/Button/IconButton";
import AdminResourceCard from "../../../Components/Card/Resource/AdminResourceCard";

type Props = NativeStackScreenProps<NavigationParamList, 'AdminResourcesValidations'>;

export default function AdminResourcesValidationsScreen({ navigation, route } : Props) {
    
    const client = route.params.client;
    
    const [ searchText, setSearchText ] = useState<string>('');
    const [ resourcesFiltered, setResourcesFiltered ] = useState<Resource[]>([]);
    const [ refreshing, setRefreshing ] = useState(false);

    const handleChangeSearch = (text: string) => {
        setSearchText(text);
        const refreshResources = Array.from(client.resources.cache.filter((r) => r.validations.getLastValidationState()?.state === APIValidationState.Pending || !r.validations.getLastValidationState()).values());
        const filteredResources = refreshResources.filter((resource) =>
            resource.title.toLowerCase().includes(text.toLowerCase())
        );
        setResourcesFiltered([...filteredResources.splice(0, 6)]);
    }

    useEffect(() => {
        navigation.addListener('focus', () => {
            onRefresh();
        });
    }, [navigation]);

    const onRefresh =  () => {
        const refreshResources:Resource[] = Array.from(client.resources.cache.filter((r) => r.validations.getLastValidationState()?.state === APIValidationState.Pending || !r.validations.getLastValidationState()).values());
        setResourcesFiltered([...refreshResources.slice(0, 6)]);
        setRefreshing(false);
        setSearchText('');
    };

    const onRefreshFetchAll = async () => {
        setRefreshing(true)
        await client.resources.fetchAll();
        const refreshResources:Resource[] = Array.from(client.resources.cache.filter((r) => r.validations.getLastValidationState()?.state === APIValidationState.Pending || !r.validations.getLastValidationState()).values());
        setResourcesFiltered([...refreshResources.slice(0, 6)]);
        setRefreshing(false);
        setSearchText('');
    };

    const renderFooter = () => {
        const refreshResources = Array.from(client.resources.cache.filter((r) => r.validations.getLastValidationState()?.state === APIValidationState.Pending || !r.validations.getLastValidationState()));
		return (
			<View>
				{
					searchText.length === 0 && refreshResources.length >= 6 && resourcesFiltered.length !== refreshResources.length && resourcesFiltered.length != 0 &&
					<ActivityIndicator size="large" color={COLORS.AccentColor} style={CommonStyles.loadMoreContent} />
				}	
			</View>
		)
	}

	const onShowMoreItems = () => {
        searchText.length === 0 &&
		setResourcesFiltered(resourcesFiltered.concat(Array.from(client.resources.cache.filter((r) => 
            r.validations.getLastValidationState()?.state === APIValidationState.Pending || !r.validations.getLastValidationState()).values())
            .slice(resourcesFiltered.length, resourcesFiltered.length + 6)));
	}

    return (
        <View style={CommonStyles.container}>
            <TopBar onChangeSearch={handleChangeSearch} hideHomeButton={false} value={searchText} navigation={navigation} client={client}/>
            <View style={CommonStyles.content}>
                <View style={{ marginTop : 20, paddingHorizontal: 15 }}>
                    <IconButton iconStyle={CommonStyles.returnBtnInFlatList} callBack={() => navigation.goBack()} iconSize={24} iconName={"arrow-left-top"}/> 
                </View>
                <View style={CommonStyles.headerComponentWithReturn}>
                    <Header label={"Validation"}/>
                </View>
                <FlatList style={CommonStyles.itemsContainer} 
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={<Text style={CommonStyles.textEmptyResult}>Aucune ressource n'a été trouvée.</Text>}
                    contentContainerStyle = {ResourcesStyles.resourcesContainer}
                    data={resourcesFiltered}
                    renderItem={({item, index}) => <View style={{height: 210, marginBottom: 20}}><AdminResourceCard key={index} resourceData={item} navigation={navigation} onDoubleClick={onRefresh}/></View>}
                    keyExtractor={item => item.id}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefreshFetchAll} />}
                    ListFooterComponent={renderFooter}
                    onEndReached={onShowMoreItems}
                />
            </View>
        </View>
    )
}