import { Image } from 'react-native'
import NavBarStyles from '../Styles/Components/NavBarStyles'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Client } from 'rr-apilib';
import { COLORS } from '../Styles/Colors';
import ResourcesScreen from '../Screen/ResourcesScreen';
import CategoriesScreen from '../Screen/CategoriesScreen';
import ShareResourceScreen from '../Screen/ShareResourceScreen';
import ProfileScreen from '../Screen/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function NavBar({ route }: any) {
    const client = route.params as Client;

    return (
        <Tab.Navigator
            initialRouteName="Login"
            screenOptions={{
                tabBarInactiveTintColor: COLORS.AccentColor,
                tabBarActiveTintColor: COLORS.ForegroundFocused,
                tabBarShowLabel: true,
                tabBarHideOnKeyboard: true,
                headerShown: false,
                tabBarStyle: NavBarStyles.container,     
            }} 
        >
            <Tab.Screen
                name="Resources"
                component={ResourcesScreen}
                options={{
                    tabBarLabel: 'Ressources',
                    tabBarIcon: ({ focused }) => (
                        focused ?
                        <Image source={require('../assets/RessourcesFocused.png')} style={NavBarStyles.logo}/>
                        :
                        <Image source={require('../assets/Ressources.png')} style={NavBarStyles.logo}/>
                    ),
                    tabBarLabelStyle : NavBarStyles.text
                }}
                initialParams={client}
            />
            <Tab.Screen
                name="Catégories"
                component={CategoriesScreen}
                options={{
                    tabBarLabel: 'Catégories',
                    tabBarIcon: ({ focused }) => (
                        focused ?
                        <Image source={require('../assets/CatalogueFocused.png')} style={NavBarStyles.logo}/>
                        :
                        <Image source={require('../assets/Catalogue.png')} style={NavBarStyles.logo}/>
                    ),
                    tabBarLabelStyle : NavBarStyles.text
                }}
                initialParams={client}
            />
            <Tab.Screen
                name="Partager"
                component={ShareResourceScreen}
                options={{
                    tabBarLabel: 'Partager',
                    tabBarIcon: ({ focused }) => (
                        focused ?
                        <Image source={require('../assets/PartageFocused.png')} style={NavBarStyles.logo}/>
                        :
                        <Image source={require('../assets/Partage.png')} style={NavBarStyles.logo}/>
                    ),
                    tabBarLabelStyle : NavBarStyles.text
                }}
                initialParams={client}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ focused }) => (
                        focused ?
                        <Image source={require('../assets/ProfileFocused.png')} style={NavBarStyles.logo}/>
                        :
                        <Image source={require('../assets/Profile.png')} style={NavBarStyles.logo}/>
                    ),
                    tabBarLabelStyle : NavBarStyles.text
                }}
                initialParams={client}
            />
        </Tab.Navigator>
    )
}