import React from 'react';
import { View, StyleSheet,Image,Text } from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import{ AuthContext } from './context';

export function DrawerContent(props) {

  const { signOut } = React.useContext(AuthContext);

    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={[styles.drawerContent,{marginTop:-5}]}>
                    <View style={{backgroundColor:'#2E84EA',paddingVertical:17,paddingHorizontal:5,flexDirection:'row',justifyContent:'center'}}>
                        <View style={{width:'80%',flexDirection:'row',alignItems:'center'}}>
                           <Icon 
                                name="home-outline" 
                                color={'white'}
                                size={22}
                                />
                        <Text style={{paddingLeft:27}}>Home</Text>
                        </View> 
                        <View style={{justifyContent:'center'}}>
                            <Image source={require('../assets/flipkart.png')}
                            style={{width:20,height:20,resizeMode:'contain'}}
                            />
                        </View>
                    </View>
                          
                </View>
                <DrawerItem 
                    icon={({color, size}) => (
                        <Icon 
                        name="exit-to-app" 
                        color={color}
                        size={size}
                        />
                    )}
                    label="cart"
                    onPress={() => {props.navigation.navigate('Home')}}
                />
            </DrawerContentScrollView>
         
                <DrawerItem 
                    icon={({color, size}) => (
                        <Icon 
                        name="exit-to-app" 
                        color={color}
                        size={size}
                        />
                    )}
                    label="Sign Out"
                    onPress={() =>{signOut()}}
                />
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });