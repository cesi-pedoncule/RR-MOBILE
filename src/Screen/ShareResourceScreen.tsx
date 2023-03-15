import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator } from 'react-native'
import { Resource } from "rr-apilib";
import ButtonShowMoreItems from "../Components/Button/ButtonShowMoreItems";
import InputButton from "../Components/Button/InputButton";
import TopBar from "../Components/Input/TopBar";
import ResourceCard from "../Components/Card/ResourceCard";
import CommonStyles from "../Styles/CommonStyles";
import ShareResourceStyles from "../Styles/Screen/ShareResourceStyles";
import useResources from "../Hooks/useResources";
import { COLORS } from "../Styles/Colors";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NavigationParamList } from "../Types/navigation";

type Props = NativeStackScreenProps<NavigationParamList, 'ShareResource'>;

export default function ShareResourceScreen({ route, navigation }: Props) {
	
	const client = route.params.client;
	const user = client.auth.me;

	const {resources, setResources, loading} = useResources({ client });
	const [ resourcesFiltered, setResourcesFiltered ] = useState<Resource[]>(resources);

	if(user != null){
		//user.resources.refresh();
		//setResources(Array.from(user.resources.cache.values()));
	} 
	else{
		navigation.navigate("Login", { client });
	}

	const onClickShowMoreItems = () => {
		setResourcesFiltered(resourcesFiltered.concat(resources.slice(resourcesFiltered.length, resourcesFiltered.length + 6)));
	}

	const onClickShareNewItem = () => {
		navigation.navigate("CreateResourceScreen", { client });
	}

	const handleChangeSearch = (text: string) => {
		const filteredResources = Array.from(client.resources.cache.values()).filter((resource) => {
			return resource.title.toLowerCase().includes(text.toLowerCase());
		});
		setResources(filteredResources);
		setResourcesFiltered(filteredResources.splice(0, 6));
	}

	useEffect(() => {
        if (resourcesFiltered.length === 0 && resources.length !== 0 && !loading) {
            setResourcesFiltered(resources.slice(0, 6));
        }
    }, [resources, loading])

  	return (
		<View style={CommonStyles.container}>
			<TopBar onChangeSearch={handleChangeSearch} navigation={navigation} />
			<View style={CommonStyles.content}> 
				<Text style={ShareResourceStyles.textSaves}>Enregitrées</Text>
				{
					loading ?  <ActivityIndicator size="large" color={COLORS.AccentColor} style={CommonStyles.loader} /> :
					<ScrollView style={CommonStyles.scrollView}>
						<View style={ShareResourceStyles.resourcesContainer}>
							{
								resourcesFiltered.map((resource, i) => {
									return <ResourceCard key={i} resource={resource} navigation={navigation} setResources={setResources} setResourcesFiltered={setResourcesFiltered} client={client} inShareResourceScreens={true}/>
								})
							}
							{
								resources.length >= 6 && resourcesFiltered.length !== resources.length && <ButtonShowMoreItems callBack={onClickShowMoreItems} />
							}
							{
								resourcesFiltered.length === 0 && <Text style={CommonStyles.textEmptyResult}>Aucune ressource n'a été trouvée.</Text>
							}
						</View>
					</ScrollView>
				}
				{
					user &&
					<View style={ShareResourceStyles.buttonsContainer}>
						<InputButton label="Nouvelle Ressource" callBack={onClickShareNewItem} style={ShareResourceStyles.addResourceBtn}/>
					</View>
				}
			</View>
		</View>
  	)
}