import { NavigationContainer } from '@react-navigation/native';
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
import { useState } from 'react';
import { ActivityIndicator, Image, View } from 'react-native';
import CommonStyles from './src/Styles/CommonStyles';
import { COLORS } from './src/Styles/Colors';

const Stack = createStackNavigator<NavigationParamList>();
const client = new Client();

export default function App() {

    const [ isLoad, setIsLoad ] = useState<boolean>(false);

    const loadClient = async () => {
        await client.fetch();
        setIsLoad(true);
    }

    loadClient();

    if(!isLoad) {
        return (
            <View style={CommonStyles.container}>
                <ActivityIndicator size="large" color={COLORS.LightBackgroundColor}/>
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
                <Stack.Screen name="Register" component={RegisterScreen} initialParams={{ client }} />
                <Stack.Screen name="ResourceDetails" component={ResourceDetailsScreen} initialParams={{ client }} />
                <Stack.Screen name="CategoryDetails" component={CategoryDetailsScreen} initialParams={{ client }} />
                <Stack.Screen name="CreateResourceScreen" component={CreateResourceScreen} initialParams={{ client }} />
                <Stack.Screen name="EditResourceScreen" component={EditResourceScreen} initialParams={{ client }} />
            </Stack.Navigator>
        </NavigationContainer>
  );
}