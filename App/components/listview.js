import React,{useEffect} from "react";
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

import { AuthContext } from "../context";
import { useIsFocused } from '@react-navigation/native';
import lists from '../../App/data/lists';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const width = Math.round(Dimensions.get('window').width);

export default ({ image, productname, numberofratingtotal,price, onPress,BankOffer,addFunc,id,rating,addstyle,button,addtocart,finalresult }) => (   <>    
    {
       finalresult && finalresult.length>0?finalresult.map((item,index)=>{
           return(
               <View key={item.key} style={{flexDirection:'row'}}>
                   <Icon name={'shopping-cart'}
                   size={22}
                   />
           <Text style={{position:'relative',left:50}} >{item.units}</Text>
           </View>
           )
       }):<View/>
   } 
    <TouchableOpacity style={[{width:width/2-5,height:width-100,margin:2,padding:2,backgroundColor:'white'},addstyle]} key={id} onPress={onPress}>
      <View style={{backgroundColor:'white',flex:1,alignItems:'center',paddingHorizontal:5}}>
        <View style={{width:100,height:100,}}>
          <Image source={{uri:image}}
          style={{width:'100%',height:'100%',resizeMode:"contain"}}
          />
        </View>
        <View style={{
         //  backgroundColor:'red'
       }}>
           <Text numberOfLines={3} style={{paddingVertical:2}}>{productname}</Text>
          </View>
          <View style={{height:20,width:'100%',flexDirection:'row',alignContent:'center',justifyContent:'space-evenly'}}>
      
           <Text style={{paddingHorizontal:5,elevation:2,width:40,backgroundColor:'#79E79F',textAlign:'center'}}>{rating}</Text>  
           <Text  style={{paddingLeft:10}}>{numberofratingtotal}</Text>   
 
            </View>
       <Text style={{fontSize:22,fontWeight:"bold",alignSelf:'center',color:"#787C79",}}>{price}</Text>
  <View style={{flexDirection:'row',alignSelf:'center',marginTop:10}}>
  <Icon 
      name={'local-offer'}
      color={'#A3DE3A'}
      size={22}
      style={{width:20,marginRight:3
     }}
      />
     <Text style={{color:'#1B1F20',width:150}} numberOfLines={1}>{BankOffer}</Text>
    </View>
        </View>
     </TouchableOpacity>
    {button && <TouchableOpacity style={{width:width/2,backgroundColor:'#DEDFDB',margin:5,justifyContent:'center',alignItems:'center',height:50}}
        //  onPress={() => addFunc({image, productname, numberofratingtotal,price,BankOffer,rating,units: 1,key:id})}
         onPress={addtocart}
         >     
           <Text>Add to cart</Text>
       
         </TouchableOpacity>
         }
     </>
)