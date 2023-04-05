import { View, Text, ScrollView, Switch, TouchableOpacity, TextInput, FlatList } from 'react-native'
import React, { useState } from 'react'
import CommonStyles from '../Styles/CommonStyles'
import EditResourceStyles from '../Styles/Screen/EditResourceStyles'
import TopBar from '../Components/Input/TopBar'
import InputButton from '../Components/Button/InputButton'
import InputTextDescription from '../Components/Input/InputTextDescription'
import ButtonFile from '../Components/Button/ButtonFile'
import { COLORS } from '../Styles/Colors'
import { NavigationParamList } from '../Types/navigation'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import CategoriesModal from '../Components/CategoriesModal'
import CategoryButton from '../Components/Button/CategoryButton'
import { Category } from 'rr-apilib'
import IconButton from '../Components/Button/IconButton'

type Props = NativeStackScreenProps<NavigationParamList, 'EditResourceScreen'>;

export default function EditResourceScreen({ route, navigation }: Props) {

    const client = route.params.client;
    const resource = route.params.resource;

    var title = resource.title;
    var description = resource.description;

    const [categories, setCategories] = useState<Category[]>(Array.from(resource.categories.cache.values()));
    const [showSelectCategories, setShowSelectCategories] = useState<boolean>(false);
    const [isPublic, setIsPublic] = useState(resource.isPublic);
    const toggleSwitch = () => setIsPublic(previousState => !previousState);

    const onClickSend = async () => {
        resource.title = title;
        resource.description = description;
        
        resource.categories.cache.map((category) => {
            resource.categories.remove(category);
        });
        categories.map((category) => {
            resource.categories.add(category);
        })
        
        await client.resources.edit(resource);
        navigation.goBack();
    }

    const onClickAddCategory = () => {
        setShowSelectCategories(true);
    }

    const onClickAddFile = () => {
        alert("TODO");
    }

    return (
        <View style={CommonStyles.container}>
            <TopBar hideSearchBar={true} navigation={navigation}/>
            <View style={CommonStyles.content}>
                <IconButton iconStyle={CommonStyles.returnBtn} callBack={() => navigation.goBack()} iconSize={24} iconName={"arrow-left-top"}/>  
                <ScrollView style={CommonStyles.itemsContainer}>
                    <View style={EditResourceStyles.container}>
                        <TextInput style={EditResourceStyles.addNameResource} placeholder={"Titre de la ressource"} defaultValue={title} onChangeText={(text) => title=text}></TextInput>
                        <View style={EditResourceStyles.categorieContainer}>
                            <FlatList showsHorizontalScrollIndicator={false} horizontal style={EditResourceStyles.categorieList} 
                                data={categories}
                                renderItem={({item}) => <CategoryButton navigation={navigation} category={item}/>}
                                keyExtractor={item => item.id}
                            />
                            <TouchableOpacity onPress={onClickAddCategory} style={EditResourceStyles.addCategorieContainer}>
                                <Text style={EditResourceStyles.addCategorieText}>{'+'}</Text>
                            </TouchableOpacity>
                            <CategoriesModal client={client} showSelectCategories={showSelectCategories} setShowSelectCategories={setShowSelectCategories} categories={categories} setCategories={setCategories}/>
                        </View>
                        <InputTextDescription defaultValue={description} onChangeText={(text) => description=text}></InputTextDescription>
                        <ButtonFile text={'Ajouter un fichier'} callBack={onClickAddFile}/>
                        <View style={EditResourceStyles.switchContainer}>
                            <Switch trackColor={{false: COLORS.ComponentBackground, true: COLORS.ComponentBackground}} thumbColor={COLORS.AccentColor} onValueChange={toggleSwitch} value={isPublic}/>
                            <Text style={{color: COLORS.Black}}> Privé / Publique </Text>
                        </View>
                        <InputButton label={'Modifier'} callBack={onClickSend} style={EditResourceStyles.sendButton}/>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}