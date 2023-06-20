import { Modal, TouchableOpacity, View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import MultiSelect from 'react-native-multiple-select';
import { APIUserRole, APIUserRoleType, Client } from 'rr-apilib';
import CategoriesModalStyles from '../Styles/Components/CategoriesModalStyles';
import { COLORS } from '../Styles/Colors';
import Header from './Header';

interface Props {
    value : APIUserRoleType[];
    onChange: (value: APIUserRole[]) => void
    showSelectModal: boolean;
    setShowSelectModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function RolesModal({ value, onChange, showSelectModal, setShowSelectModal}: Props) {

    const [ selectedItems, setSelectedItems ] = useState<any[]>(new Array());

    const roles = [
        {id: 0, name: "Utilisateur simple", role: APIUserRole.User},
        {id: 1, name: "Moderateur", role: APIUserRole.Moderator},
        {id: 2, name: "Admin", role: APIUserRole.Admin},
        {id: 3, name: "Super-admin", role: APIUserRole.SuperAdmin},
    ];

    const onSelectedItemsChange = (selectedItems:APIUserRoleType[]) => {
        setSelectedItems(selectedItems);
        const newRoles:APIUserRole[] = new Array();
       
        selectedItems.map((selectItem) => {
            const newRole = roles.find((r) => r.role === selectItem);

            if(newRole){
                newRoles.push(newRole.role);
                onChange([...newRoles]);
            }
        })
    };

    useEffect(() => {
        for(const role of value) {
            selectedItems.push(role);
        }
    }, []);
    
    return (
        <Modal animationType="slide" transparent={true} visible={showSelectModal} onRequestClose={() => { setShowSelectModal(!showSelectModal); }}>
            <View style={CategoriesModalStyles.container}>
                <View style={CategoriesModalStyles.modalContainer}>
                <Header label={'Ajouter des rôles'}/>
                    <View style={CategoriesModalStyles.multiSelectContainer}>
                            <MultiSelect
                                fixedHeight={true}
                                items={roles}
                                uniqueKey={"role"}
                                displayKey="name"
                                onSelectedItemsChange={onSelectedItemsChange}
                                selectedItems={selectedItems}
                                selectText="Sélectioner un rôle"
                                searchInputPlaceholderText="Chercher un rôle..."
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
                    <TouchableOpacity style={CategoriesModalStyles.button} onPress={() => setShowSelectModal(!showSelectModal)}>
                        <Text style={CategoriesModalStyles.textButton}>Valider</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}