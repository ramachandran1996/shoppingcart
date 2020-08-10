import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator} from "@react-navigation/drawer";
import { DrawerContent } from './DrawerContent';
import Icon from 'react-native-vector-icons/Ionicons';

import { AuthContext } from "./context";
import Homescreen from '../App/screens/Homescreen';
import Productscreen from '../App/screens/Productdescription';
import Cartscreen from '../App/screens/Cartscreen';
import {
  SignIn,
  CreateAccount,
  Splash
} from "./Screens";

const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      name="SignIn"
      component={SignIn}
      options={{ title: "Sign In" }}
    />
    <AuthStack.Screen
      name="CreateAccount"
      component={CreateAccount}
      options={{ title: "Create Account" }}
    />
  </AuthStack.Navigator>
);
const HomeStack = createStackNavigator();
const HomeStackScreen = ({navigation}) => (
  <HomeStack.Navigator screenOptions={{
          animationEnabled:false,
          headerStyle: {
          backgroundColor: '#009387',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
          fontWeight: 'bold'
          }
          
      }}
      initialRouteName={'Home'}
      
      >        
          <HomeStack.Screen name="Home" component={Homescreen} options={{
          title:'list of product',
          headerLeft: () => (
              <Icon.Button name="ios-menu" size={25} backgroundColor="#009387" onPress={() => navigation.openDrawer()}></Icon.Button>
          )
          }} 
          />
        <HomeStack.Screen name="Product" component={Productscreen} 
       options={{
          headerShown:false
          }}
        />
      <HomeStack.Screen name="Cart" component={Cartscreen} 
     options={{
       headerShown:false
       }}
       /> 
  </HomeStack.Navigator>
  );

const Drawer = createDrawerNavigator();
const DrawerScreen = () => (
  <Drawer.Navigator 
  initialRouteName="Home"
  drawerContent={props => <DrawerContent {...props} />}>
    <Drawer.Screen name="Home" component={HomeStackScreen} />
    <Drawer.Screen name="Homes" component={HomeStackScreen} />
  </Drawer.Navigator>
);

const RootStack = createStackNavigator();
const RootStackScreen = ({ userToken }) => (
  <RootStack.Navigator headerMode="none">
    {userToken ? (
      <RootStack.Screen
        name="App"
        component={DrawerScreen}
        options={{
          animationEnabled: false
        }}
      />
    ) : (
      <RootStack.Screen
        name="Auth"
        component={AuthStackScreen}
        options={{
          animationEnabled: false
        }}
      />
    )}
  </RootStack.Navigator>
);

export default () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);

  const authContext = React.useMemo(() => {
    return {
      signIn: () => {
        setIsLoading(false);
        setUserToken("asdf");
      },
      signUp: () => {
        setIsLoading(false);
        setUserToken("asdf");
      },
      signOut: () => {
        setIsLoading(false);
        setUserToken(null);
      }
    };
  }, []);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return <Splash />;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <RootStackScreen userToken={userToken} />
      </NavigationContainer>
    </AuthContext.Provider>
  );
};