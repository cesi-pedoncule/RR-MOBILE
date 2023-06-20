import { View, Text, FlatList, ActivityIndicator, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationParamList } from '../../../Types/navigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CommonStyles from '../../../Styles/CommonStyles';
import TopBar from '../../../Components/Input/TopBar';
import IconButton from '../../../Components/Button/IconButton';
import Header from '../../../Components/Header';
import { COLORS } from '../../../Styles/Colors';
import { User } from 'rr-apilib';
import AdminUsersStyles from '../../../Styles/Screen/Admin/User/AdminUsersStyles';
import UserCardAdmin from '../../../Components/Card/User/UserCardAdmin';

type Props = NativeStackScreenProps<NavigationParamList, 'AdminUsers'>;

export default function AdminUsersScreen({ route, navigation }: Props) {
    
    const client = route.params.client;

    const [ searchText, setSearchText ] = useState<string>('');
    const [ users, setUsers ] = useState<User[]>([]);
    const [ refreshing, setRefreshing ] = useState(false);

    const handleChangeSearch = (text: string) => {
        setSearchText(text);
        const filteredUsers = Array.from(client.users.cache.values()).filter((category) => 
            category.name.toLowerCase().includes(text.toLowerCase())
        );
        setUsers([...filteredUsers.slice(0, 8)]);
    }
  
    useEffect(() => {
        navigation.addListener('focus', () => {
            onRefresh();
        });
    }, [navigation])

    const onRefresh = () => {
        const refreshUsers = Array.from(client.users.cache.values());
		setUsers([...refreshUsers.slice(0, 8)]);
		setRefreshing(false);
        setSearchText('');
 	 };

      const onRefreshFetchAll = async () => {
        setRefreshing(true);
        await client.users.fetchAll();
        const refreshUsers = Array.from(client.users.cache.values());
		setUsers([...refreshUsers.slice(0, 8)]);
		setRefreshing(false);
        setSearchText('');
 	 };

    const renderFooter = () => {
		return (
			<View>
				{
					searchText.length === 0 && client.users.cache.size >= 8  && users.length !== client.users.cache.size && users.length != 0 &&
					<ActivityIndicator size="large" color={COLORS.AccentColor} style={CommonStyles.loadMoreContent} />
				}	
			</View>
		)
	}

	const onShowMoreItems = () => {
        searchText.length === 0 && 
		setUsers(users.concat(Array.from(client.users.cache.values()).slice(users.length, users.length + 6)));
	}

    return (
        <View style={CommonStyles.container}>
            <TopBar value={searchText} onChangeSearch={handleChangeSearch} navigation={navigation} client={client} hideHomeButton={false}/>
            <View style={CommonStyles.content}>
                <View style={{ marginTop : 20, paddingHorizontal: 15 }}>
                    <IconButton iconStyle={CommonStyles.returnBtnInFlatList} callBack={() => navigation.goBack()} iconSize={24} iconName={"arrow-left-top"}/> 
                </View>
                <View style={CommonStyles.headerComponentWithReturn}>
                    <Header label={"Les utilisateurs"}/>
                </View>
                <FlatList style={{marginTop: 20, marginBottom: 10}} 
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={<Text style={CommonStyles.textEmptyResult}>Aucun utilisateur n'a été trouvée.</Text>}
                    columnWrapperStyle={AdminUsersStyles.columnWrapperStyle}
                    contentContainerStyle={AdminUsersStyles.categoriesContainer}
                    initialNumToRender={2}
                    numColumns={2}
                    data={users}
                    renderItem={({item, index}) => 
                        <View style={{flex: 1, marginLeft: index % 2 !== 0 ? 20 : 0, marginBottom: 15}}>
                            <UserCardAdmin key={index} navigation={navigation} user={item}/>
                        </View>
                    }
                    keyExtractor={item => item.id}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefreshFetchAll} />}
                    ListFooterComponent={renderFooter}
                    onEndReached={onShowMoreItems}
                    onEndReachedThreshold={0}
                />
            </View>
        </View>
    )
}