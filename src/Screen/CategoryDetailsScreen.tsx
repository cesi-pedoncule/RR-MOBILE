import { useState } from "react";
import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Category, Resource } from "rr-apilib";
import ButtonShowMoreItems from "../Components/Button/ButtonShowMoreItems";
import ReturnButton from "../Components/Button/ReturnButton";
import ResourceCard from "../Components/Card/ResourceCard";
import TopBar from "../Components/Input/TopBar";
import CommonStyles from "../Styles/CommonStyles";
import ResourcesStyles from "../Styles/Screen/ResourcesStyles";

interface Props {
    navigation: any;
    route: any;
}

export default function CategoryDetailsScreen ({ navigation, route }: Props) {

    const category = route.params.category as Category;
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
                <ScrollView style={CommonStyles.scrollView}>
                    <View style={ResourcesStyles.resourcesContainer}>
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