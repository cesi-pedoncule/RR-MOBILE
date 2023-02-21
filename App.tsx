import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import { Client } from 'rr-apilib';
import ResourcesScreen from './src/screens/ResourcesScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import ShareResourceScreen from './src/screens/ShareResourceScreen';
import CategoriesScreen from './src/screens/CategoriesScreen';
import ResourceDetailScreen from './src/screens/ResourceDetailScreen';

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
        <Stack.Screen name="ResourceDetail" component={ResourceDetailScreen} initialParams={client} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}