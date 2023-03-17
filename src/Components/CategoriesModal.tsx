import { Modal, TouchableOpacity, View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import MultiSelect from 'react-native-multiple-select'
import { Category, Client } from 'rr-apilib'
import CategoriesModalStyles from '../Styles/Components/CategoriesModalStyles';
import { COLORS } from '../Styles/Colors';
import Header from './Header';

interface Props {
    client: Client;
    categories: Category[];
    setCategories: React.Dispatch<React.SetStateAction<Category[]>>
    showSelectCategories: boolean;
    setShowSelectCategories: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CategoriesModal({client, categories, setCategories, showSelectCategories, setShowSelectCategories}: Props) {
    const items = client.categories.cache.toJSON();
    const [selectedItems, setSelectedItems] = useState<string[]>();

    const onSelectedItemsChange = (selectedItems:string[]) => {
        const newCategories: Category[]= [];
        setSelectedItems(selectedItems);
        setCategories([]); 
        selectedItems.map((selectItem) => {
            const categorie = client.categories.cache.get(selectItem);

            if(categorie){
                newCategories.push(categorie)
            }
        })
        setCategories(newCategories);
    }

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
                                displayKey="name"
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