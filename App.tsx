import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import RessourcesScreen from './src/screens/RessourcesScreen';
import ProfilScreen from './src/screens/ProfilScreen';
import ShareCreateScreen from './src/screens/ShareCreateScreen';
import CategoriesScreen from './src/screens/CategoriesScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Categories" component={CategoriesScreen} />
        <Stack.Screen name="Profil" component={ProfilScreen} />
        <Stack.Screen name="ShareCreate" component={ShareCreateScreen} />
        <Stack.Screen name="Ressources" component={RessourcesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}