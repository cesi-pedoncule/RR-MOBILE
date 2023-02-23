import React, { useState } from "react";
import { View, Text, ScrollView } from 'react-native'
import { Client, Resource } from "rr-apilib";
import ButtonShowMoreItems from "../Components/Button/ButtonShowMoreItems";
import NavBar from "../Components/NavBar";
import InputButton from "../Components/Button/InputButton";
import TopBar from "../Components/Input/TopBar";
import ResourceCard from "../Components/Card/ResourceCard";
import CommonStyles from "../Styles/CommonStyles";
import ShareResourceStyles from "../Styles/Screen/ShareResourceStyles";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";


type ShareResourceStackParamList = {
    ResourceDetails: {resource: Resource};
	CreateResourceScreen: undefined;
}

export default function ShareResourceScreen({ route }: any) {
	const navigation = useNavigation<StackNavigationProp<ShareResourceStackParamList>>();

	const client = route.params as Client;
	const user = client.auth.me;

  	const [showMoreItems, setShowMoreItems] = useState<boolean>(false);
	const [resources, setResources] = useState<Resource[]>(Array.from(client.resources.cache.values()));

	const onClickShowMoreItems = () => {
		setShowMoreItems(true);
	}

	const onClickShareNewItem = () => {
		navigation.navigate('CreateResourceScreen');
	}

	const handleChangeSearch = (text: string) => {
		const filteredResources = Array.from(client.resources.cache.values()).filter((resource) => {
			return resource.title.toLowerCase().includes(text.toLowerCase());
		});
		setResources(filteredResources);
	}

  return (
	<View style={CommonStyles.container}>
		<TopBar onChangeSearch={handleChangeSearch} />
		<View style={CommonStyles.content}> 
			<Text style={ShareResourceStyles.textSaves}>Enregitrées</Text>
			{
				resources.length === 0 ?
				<Text>Aucune ressource enregistrée</Text>
				:
				<ScrollView style={ShareResourceStyles.resourcesContainer} contentContainerStyle={CommonStyles.scrollViewCenter}>
					{
						resources.map((resource, i) => {
							if ((!showMoreItems && i < 2) || showMoreItems) {
								return <ResourceCard key={i} resource={resource} callBack={() => navigation.navigate('ResourceDetails', {resource: resource})} inShareResourceScreens={true}/>
							}
						})
					}
					{ 
						!showMoreItems && resources.length >= 6 && <ButtonShowMoreItems callBack={onClickShowMoreItems} /> 
					}
				</ScrollView>
			}
			{
				 user &&
				<View style={ShareResourceStyles.buttonsContainer}>
					<InputButton label="Nouvelle Ressource" callBack={onClickShareNewItem} style={ShareResourceStyles.addResourceBtn}></InputButton>
				</View>
			}
			<NavBar client={client} shareResourceIsFocused={true}/>
		</View>
	</View>
  )
}