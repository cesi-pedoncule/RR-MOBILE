import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/Screen/LoginScreen';
import RegisterScreen from './src/Screen/RegisterScreen';
import { Client } from 'rr-apilib';
import ResourceDetailsScreen from './src/Screen/ResourceDetailsScreen';
import CreateResourceScreen from './src/Screen/CreateResourceScreen';
import NavBar from './src/Components/NavBar';

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
        <Stack.Screen name="NavBar" component={NavBar} options={{ headerShown: false }} initialParams={client}/>
        <Stack.Screen name="Login" component={LoginScreen} initialParams={client} />
        <Stack.Screen name="Register" component={RegisterScreen} initialParams={client} />
        <Stack.Screen name="ResourceDetails" component={ResourceDetailsScreen} initialParams={client} />
        <Stack.Screen name="CreateResourceScreen" component={CreateResourceScreen} initialParams={client} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}