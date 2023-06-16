import { Modal, TouchableOpacity, View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import MultiSelect from 'react-native-multiple-select';
import { Category, Client, Resource } from 'rr-apilib';
import CategoriesModalStyles from '../Styles/Components/CategoriesModalStyles';
import { COLORS } from '../Styles/Colors';
import Header from './Header';

interface Props {
    client: Client;
    resource?: Resource;
    setCategories ?: React.Dispatch<React.SetStateAction<Category[]>>;
    showSelectCategories: boolean;
    setShowSelectCategories: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CategoriesModal({client, resource, setCategories, showSelectCategories, setShowSelectCategories}: Props) {

    const items = Array.from(client.categories.cache.filter((category) => category.isVisible));
    const [ selectedItems, setSelectedItems ] = useState<string[]>(new Array());

    const onSelectedItemsChange = (selectedItems:string[]) => {
        const newCategories: Category[]= [];
        setSelectedItems(selectedItems);
       
        selectedItems.map((selectItem) => {
            const categorie = client.categories.cache.get(selectItem);

            if(categorie){
                newCategories.push(categorie)
            }
        })
        
        setCategories &&
            setCategories([...newCategories]);

        resource &&
            resource.categories.set([...newCategories]);
    };

    useEffect(() => {
        if(resource) {
            for(const category of resource.categories.cache.values()) {
                selectedItems.push(category.id);
            }
        }
    }, []);

    return (
        <Modal animationType="slide" transparent={true} visible={showSelectCategories} onRequestClose={() => { setShowSelectCategories(!showSelectCategories); }}>
            <View style={CategoriesModalStyles.container}>
                <View style={CategoriesModalStyles.modalContainer}>
                <Header label={'Ajouter des catégories'}/>
                    <View style={CategoriesModalStyles.multiSelectContainer}>
                            <MultiSelect
                                hideTags
                                fixedHeight={true}
                                items={items}
                                uniqueKey="id"
                                displayKey="name"
                                onSelectedItemsChange={onSelectedItemsChange}
                                selectedItems={selectedItems}
                                selectText="Sélectioner une catégorie"
                                searchInputPlaceholderText="Chercher une catégorie..."
                                tagRemoveIconColor={COLORS.AccentColor}
                                tagBorderColor={COLORS.TagColor}
                                tagTextColor={COLORS.Black}
                                selectedItemTextColor={COLORS.AccentColor}
                                selectedItemIconColor={COLORS.AccentColor}
                                itemTextColor={COLORS.Black}
                                searchInputStyle={{ color: COLORS.Black }}
                                hideSubmitButton={true}
                                styleRowList={{backgroundColor: COLORS.LightBackgroundColor}}
                                hideDropdown={true}
                                noItemsText="Pas de catégories trouvées"
                                styleInputGroup={{backgroundColor: COLORS.LightBackgroundColor}}
                                styleDropdownMenuSubsection={{backgroundColor: COLORS.LightBackgroundColor, height: 50, paddingLeft: 5}}
                            />
                    </View>
                    <TouchableOpacity style={CategoriesModalStyles.button} onPress={() => setShowSelectCategories(!showSelectCategories)}>
                        <Text style={CategoriesModalStyles.textButton}>Valider</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}