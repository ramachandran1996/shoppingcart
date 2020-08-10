import React from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  Button,
  Image,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Dimensions} from "react-native";

import { AuthContext } from './context';
import { useIsFocused } from '@react-navigation/native';
import lists from '../App/data/lists';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const width = Math.round(Dimensions.get('window').width);

function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 5,
    margin:10,
    
  }
});

const ScreenContainer = ({ children }) => (

  <View style={styles.container}>{children}</View>
);






export const Splash = () => (
  <View style={{justifyContent:'center',alignItems:'center',backgroundColor:'#2E84EA',flex:1}}>
    <Image source={require('../assets/flipkart.png')}
      style={{width:100,height:100,resizeMode:'contain'}}
    />
    <View style={{marginTop:10}}>
      <ActivityIndicator size={'small'}  color={'white'}/>
      </View>
      </View>
);

export const SignIn = ({ navigation }) => {
  const { signIn } = React.useContext(AuthContext);

  return (
    <ScreenContainer>
      <Text>Sign In  gg Screen</Text>
      <View style={{marginBottom:10,marginTop:10}}>
      <Button title="Sign In" onPress={() => signIn()} />
      </View>
      <View style={{marginBottom:10}}>
      <Button
        title="Create Account"
        onPress={() => navigation.push("CreateAccount")}
      />
      </View>
    </ScreenContainer>
  );
};

export const CreateAccount = () => {
  const { signUp } = React.useContext(AuthContext);

  return (
    <ScreenContainer>
      <Text>Create Account Screen</Text>
      <Button title="Sign Up" onPress={() => signUp()} />
    </ScreenContainer>
  );
};