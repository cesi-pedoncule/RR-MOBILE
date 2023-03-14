import { useState } from "react";
import { Resource } from "rr-apilib";
import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import CommonStyles from "../Styles/CommonStyles";
import CategoryDetailsStyles from "../Styles/Screen/CategoryDetailsStyles";

import Header from "../Components/Header";
import TopBar from "../Components/Input/TopBar";
import { NavigationParamList } from "../Types/navigation";
import ResourceCard from "../Components/Card/ResourceCard";
import ReturnButton from "../Components/Button/ReturnButton";
import ButtonShowMoreItems from "../Components/Button/ButtonShowMoreItems";

type Props = NativeStackScreenProps<NavigationParamList, 'CategoryDetails'>;

export default function CategoryDetailsScreen ({ navigation, route }: Props) {

    const category = route.params.category;
    const [ resources, setResources ] = useState<Resource[]>(Array.from(category.resources.cache.values()));
    const [ resourcesFiltered, setResourcesFiltered ] = useState<Resource[]>(Array.from(category.resources.cache.values()));

    const [ showMoreItems, setShowMoreItems ] = useState(false);

    const onClickShowMoreItems = () => {
        setShowMoreItems(true);
    }

    const handleChangeSearch = (text: string) => {
        const filteredResources = resources.filter((resource: Resource) => {
            return resource.title.toLowerCase().includes(text.toLowerCase());
        });
        setResourcesFiltered(filteredResources);
    }

    return (
        <View style={CommonStyles.container}>
            <TopBar onChangeSearch={handleChangeSearch} navigation={navigation} />
            <View style={CommonStyles.content}>
                <ReturnButton />
                <View style={CategoryDetailsStyles.headerContainer}>
                    <Header label={category.name}/>
                </View>            
                <ScrollView style={CommonStyles.scrollView}>
                    <View style={CategoryDetailsStyles.resourcesContainer}>
                        {
                            resourcesFiltered.map((resource, i) => {
                                return <ResourceCard key={i} resource={resource} setResources={setResources} navigation={navigation} />
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
            </View>
        </View>
    )
}