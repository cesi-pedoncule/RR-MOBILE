import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/Screen/LoginScreen';
import RegisterScreen from './src/Screen/RegisterScreen';
import { Client } from 'rr-apilib';
import ResourcesScreen from './src/Screen/ResourcesScreen';
import ProfileScreen from './src/Screen/ProfileScreen';
import ShareResourceScreen from './src/Screen/ShareResourceScreen';
import CategoriesScreen from './src/Screen/CategoriesScreen';
import ResourceDetailsScreen from './src/Screen/ResourceDetailsScreen';

const Stack = createStackNavigator();
const client = new Client();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{
          headerShown: false,
          animationEnabled: false
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} initialParams={client} />
        <Stack.Screen name="Register" component={RegisterScreen} initialParams={client} />
        <Stack.Screen name="Categories" component={CategoriesScreen} initialParams={client} />
        <Stack.Screen name="Profile" component={ProfileScreen} initialParams={client} />
        <Stack.Screen name="ShareCreate" component={ShareResourceScreen} initialParams={client} />
        <Stack.Screen name="Resources" component={ResourcesScreen} initialParams={client} />
        <Stack.Screen name="ResourceDetails" component={ResourceDetailsScreen} initialParams={client} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}