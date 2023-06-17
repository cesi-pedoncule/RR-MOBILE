import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Client } from 'rr-apilib';
import LoginScreen from './src/Screen/LoginScreen';
import RegisterScreen from './src/Screen/RegisterScreen';
import ResourceDetailsScreen from './src/Screen/ResourceDetailsScreen';
import CreateResourceScreen from './src/Screen/CreateResourceScreen';
import NavBar from './src/Components/NavBar';
import EditResourceScreen from './src/Screen/EditResourceScreen';
import CategoryDetailsScreen from './src/Screen/CategoryDetailsScreen';
import { NavigationParamList } from './src/Types/navigation';
import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Image, LogBox, View } from 'react-native';
import CommonStyles from './src/Styles/CommonStyles';
import { COLORS } from './src/Styles/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import SendResetPasswordScreen from './src/Screen/SendResetPasswordScreen';
import UserDetailsScreen from './src/Screen/UserDetailsScreen';

const Stack = createStackNavigator<NavigationParamList>();

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
]);


type Props = NativeStackScreenProps<NavigationParamList, 'Resources'>;

export default function App({ navigation }: Props) {

    const [ isLoad, setIsLoad ] = useState<boolean>(false);
    const client = useMemo(() => new Client(), []);

    const loadClient = async () => {
        await client.fetch();

        const refresh_token = await AsyncStorage.getItem('refresh_token');

        if (refresh_token !== null) {
            client.auth.refresh_token = refresh_token;

            try {
                await client.auth.refresh();
            } catch (error) {
                await AsyncStorage.removeItem('refresh_token');
                navigation.navigate('Resources', { client });                
            }
        }

        setIsLoad(true);
    }

    useEffect(() => {
        loadClient();
    }, [])

    if(!isLoad) {
        return (
            <View style={CommonStyles.container}>
                <ActivityIndicator style={CommonStyles.firstLoader} size="large" color={COLORS.LightBackgroundColor}/>
                <Image style={CommonStyles.image} source={require("./src/assets/splash.png")}/>
            </View>
        )
    }

    return (
        <NavigationContainer>
            <Stack.Navigator 
                screenOptions={{
                    headerShown: false,
                    animationEnabled: false
                }}
            >
                <Stack.Screen name="NavBar" component={NavBar} options={{ headerShown: false }} initialParams={{ client }}/>
                <Stack.Screen name="Login" component={LoginScreen} initialParams={{ client }} />
                <Stack.Screen name="SendResetPassword" component={SendResetPasswordScreen} initialParams={{ client }} />
                <Stack.Screen name="UserDetails" component={UserDetailsScreen} initialParams={{ client }} />
                <Stack.Screen name="Register" component={RegisterScreen} initialParams={{ client }} />
                <Stack.Screen name="ResourceDetails" component={ResourceDetailsScreen} initialParams={{ client }} />
                <Stack.Screen name="CategoryDetails" component={CategoryDetailsScreen} initialParams={{ client }} />
                <Stack.Screen name="CreateResourceScreen" component={CreateResourceScreen} initialParams={{ client }} />
                <Stack.Screen name="EditResourceScreen" component={EditResourceScreen} initialParams={{ client }} />
            </Stack.Navigator>
        </NavigationContainer>
  );
}