import { View, TextInput, FlatList, Text, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../../Components/Header'
import CommonStyles from '../../../Styles/CommonStyles'
import IconButton from '../../../Components/Button/IconButton'
import TopBar from '../../../Components/Input/TopBar'
import { NavigationParamList } from '../../../Types/navigation'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import AdminUserStyle from '../../../Styles/Screen/Admin/User/AdminUserStyle'
import { APIUserRole, APIUserRoleType, Resource } from 'rr-apilib'
import { ScrollView } from 'react-native-gesture-handler'
import RolesModal from '../../../Components/RolesModal'
import ResourceCardWithUser from '../../../Components/Card/Resource/ResourceCardWithUser'
import InputButton from '../../../Components/Button/InputButton'

type Props = NativeStackScreenProps<NavigationParamList, 'AdminUser'>;

export default function AdminUserScreen({ route, navigation }: Props) {

    const client = route.params.client;
    const user = route.params.user;
    const userProfileName = user?.name + ' ' + user?.firstname;

    const rolesExisting = [
        {id: 0, name: "Utilisateur simple", role: APIUserRole.User},
        {id: 1, name: "Moderateur", role: APIUserRole.Moderator},
        {id: 2, name: "Admin", role: APIUserRole.Admin},
        {id: 3, name: "Super-admin", role: APIUserRole.SuperAdmin},
    ];

    const [ showSelectModal, setShowSelectModal ] = useState<boolean>(false);
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const [ name, setName ] = useState<string>('');
    const [ firstname, setFirstname ] = useState<string>('');
    const [ roles, setRoles ] = useState<APIUserRoleType[]>([]);
    const [ rolesName, setRolesName ] = useState<string[]>([]);
    const [ resources, setResources ] = useState<Resource[]>([]);

    const onClickEditUser = async () => {
        if (user) {
            setIsLoading(true);
            try {
                user.name = name;
                user.firstname = firstname;
                user.roles = roles;
    
                await client.users.edit(user);
    
                navigation.goBack();
            } catch (error) {
                ToastAndroid.show("Problème lors de la modification de l'utilisateur" , ToastAndroid.CENTER);
            }
            setIsLoading(false);
        }
    }

    const onRefresh =  () => {
        const refreshResources:Resource[] = Array.from(user.resources.cache.values());
        setResources([...refreshResources.slice(0, 6)]);
    };

    const onChangeRoles = (apiRoles: any[]) => {
        setRoles([...apiRoles]);
        const newRolesName:string[] = new Array();
        for(const apiRole of apiRoles){
            for(const roleExisting of rolesExisting){
                if(apiRole === roleExisting.role) {
                    newRolesName.push(roleExisting.name);
                }
            }
        }
        setRolesName(newRolesName);
    }

    useEffect(() => {      
        navigation.addListener('focus', () => {
            onRefresh();
        });  
        if(user && (name === user.name || name === '') && (firstname === user.firstname || firstname === '')) {
            setName(user ? user.name : '');
            setFirstname(user ? user.firstname : '');
            setRoles(user ? user.roles : []);
            onChangeRoles(user ? user.roles : []);
        }

    }, [client.auth.me, client.users.cache, name, firstname, user, navigation]);

    return (
        <View style={CommonStyles.container}>
        <TopBar hideSearchBar={true} hideHomeButton={false} client={client} navigation={navigation} />
            <View style={CommonStyles.content}>
                <View style={{marginTop : 20, marginLeft: 15}}>
                    <IconButton iconStyle={CommonStyles.returnBtnInFlatList} callBack={() => navigation.goBack()} iconSize={24} iconName={"arrow-left-top"}/>  
                </View>
                <View style={CommonStyles.headerComponentWithReturn}>
                    <Header label={userProfileName}/>
                </View>
                <ScrollView contentContainerStyle={AdminUserStyle.scrollViewContainer}>
                    <TextInput style={AdminUserStyle.inputText} placeholder={"Titre de la ressource"} defaultValue={name} onChangeText={(text) => setName(text)}/>
                    <TextInput style={AdminUserStyle.inputText} placeholder={"Titre de la ressource"} defaultValue={firstname} onChangeText={(text) => setFirstname(text)}/>
                    <View style={AdminUserStyle.roleContainer}>
                        <FlatList showsHorizontalScrollIndicator={false} horizontal style={AdminUserStyle.roleList} 
                            data={rolesName}
                            renderItem={({item, index}) => <View style={{marginRight: 5}}><Text style={AdminUserStyle.roleText} key={index}>{item} </Text></View>}
                        />
                        <TouchableOpacity onPress={() => setShowSelectModal(true)} style={AdminUserStyle.addRoleContainer}>
                            <Text style={AdminUserStyle.addRoleText}>{'+'}</Text>
                        </TouchableOpacity>
                        <RolesModal showSelectModal={showSelectModal} setShowSelectModal={setShowSelectModal} value={user.roles} onChange={onChangeRoles}/>
                    </View>
                    <InputButton isLoading={isLoading} label="Modifier" callBack={onClickEditUser} style={AdminUserStyle.button}/>
                    <View style={AdminUserStyle.booksContainer}>
                        {resources.length !== 0 && <Text style={AdminUserStyle.textHolder}>Ressource(s) : ({resources.length})</Text>}
                        {
                            resources.map((resource, id) => 
                                <ResourceCardWithUser key={id} navigation={navigation} resourceData={resource} onDoubleClick={onRefresh}/>
                            )
                        }
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}