import { View } from 'react-native'
import React from 'react'
import CommonStyles from '../../Styles/CommonStyles'
import TopBar from '../../Components/Input/TopBar'
import { ScrollView } from 'react-native-gesture-handler'
import { NavigationParamList } from '../../Types/navigation'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import InputButton from '../../Components/Button/InputButton'
import AdminMenuStyles from '../../Styles/Screen/Admin/AdminMenuStyles'
import Header from '../../Components/Header'
import IconButton from '../../Components/Button/IconButton'

type Props = NativeStackScreenProps<NavigationParamList, 'AdminMenu'>;

export default function AdminMenuScreen({ route, navigation }: Props) {

    const client = route.params.client;
    const me = client.me;

    return (
        <View style={CommonStyles.container}>
        <TopBar hideSearchBar={true} hideHomeButton={false} client={client} navigation={navigation} />
            <View style={CommonStyles.content}>
                <View style={{marginTop : 20, marginLeft: 15}}>
                    <IconButton iconStyle={CommonStyles.returnBtnInFlatList} callBack={() => navigation.goBack()} iconSize={24} iconName={"arrow-left-top"}/>  
                </View>
                <View style={CommonStyles.headerComponentWithReturn}>
                    <Header label={"Administration"}/>
                </View>
                <ScrollView contentContainerStyle={AdminMenuStyles.itemsContainer}>
                    {
                        me?.isSuperAdmin && 
                        <View style={AdminMenuStyles.buttonContainer}>
                            <InputButton label="Utilisateurs" callBack={() => navigation.navigate('AdminUsers',{ client })} style={AdminMenuStyles.button}/>
                        </View>
                    }
                    {
                        me?.isAdmin && 
                        <View style={AdminMenuStyles.buttonContainer}>
                            <InputButton label="Catégories" callBack={() => navigation.navigate('AdminCategories',{ client })} style={AdminMenuStyles.button}/>
                        </View>
                    }
                    {
                        me?.isModerator && 
                        <View style={AdminMenuStyles.buttonContainer}>
                            <InputButton label="Validation de ressources" callBack={() => navigation.navigate('AdminResourcesValidations', { client })} style={AdminMenuStyles.button}/>
                        </View>
                    }
                </ScrollView>
            </View>
        </View>
    )
}