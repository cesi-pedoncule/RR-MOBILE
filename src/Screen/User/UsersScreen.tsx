import React, { useCallback, useEffect, useState } from "react";
import { View, Text, ActivityIndicator, FlatList, RefreshControl } from 'react-native'
import CommonStyles from "../../Styles/CommonStyles";
import TopBar from "../../Components/Input/TopBar";
import UsersStyles from "../../Styles/Screen/User/UsersStyles";
import { COLORS } from "../../Styles/Colors";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigationParamList } from "../../Types/navigation";
import Header from "../../Components/Header";
import { Category, User } from "rr-apilib";
import UserCard from "../../Components/Card/User/UserCard";
import IconButton from "../../Components/Button/IconButton";

type Props = NativeStackScreenProps<NavigationParamList, 'Users'>;

export default function UsersScreen({ route, navigation }: Props) {

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

      const onRefreshFetchAll = useCallback(async () => {
        setRefreshing(true);
        await client.users.fetchAll();
        const refreshUsers = Array.from(client.users.cache.values());
		setUsers([...refreshUsers.slice(0, 8)]);
		setRefreshing(false);
        setSearchText('');
 	 }, []);

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

	const renderHeader = () => {
		return (
			<View style={CommonStyles.listHeaderComponent}>
				<Header label={"Les utilisateurs"}/>
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
                <FlatList style={{marginBottom: 10}} 
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={<Text style={CommonStyles.textEmptyResult}>Aucun utilisateur n'a été trouvée.</Text>}
                    columnWrapperStyle={UsersStyles.columnWrapperStyle}
                    contentContainerStyle={UsersStyles.categoriesContainer}
                    initialNumToRender={2}
                    numColumns={2}
                    data={users}
                    renderItem={({item, index}) => 
                        <View style={{flex: 1, marginLeft: index % 2 !== 0 ? 20 : 0, marginBottom: 15}}>
                            <UserCard key={index} navigation={navigation} user={item}/>
                        </View>
                    }
                    keyExtractor={item => item.id}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefreshFetchAll} />}
                    ListHeaderComponent={renderHeader}
                    ListFooterComponent={renderFooter}
                    onEndReached={onShowMoreItems}
                    onEndReachedThreshold={0}
                />
            </View>
        </View>
    )
}