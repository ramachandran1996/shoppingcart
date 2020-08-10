import React from "react";
import { View, Button,Text,Dimensions,SafeAreaView,StatusBar, TouchableOpacity} from "react-native";
import { isConfigurationAvailable } from "expo/build/AR";
import Icon from 'react-native-vector-icons/MaterialIcons';
const width = Math.round(Dimensions.get('window').width);
export default ({ navigation,route }) => {
    const [iscart,setIscart ] = React.useState([]);
    const cart = route.params.cartlist;
    React.useEffect(() => {
        setIscart(cart)
   
 }, []);
return(
    <SafeAreaView style={{flex:1}}>
      <StatusBar/>
        <View style={{flex:1,backgroundColor:'white'}}>
            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',height:50,backgroundColor:'white',elevation:5}}>
      <TouchableOpacity onPress={()=>{navigation.navigate("Home", { name: iscart,from:'add' })}} style={{padding:10}}>
          <Icon
          name={'arrow-back'}
          size={22}
          />
      </TouchableOpacity>
      <Text style={{flex:1,textAlign:'center',marginRight:20,fontSize:22}}>cartlist</Text>
      </View>
      <View style={{flex:1,justifyContent:'center'}}>
       {
        iscart && iscart.length>0?iscart.map((item)=>{
            return(
             <View key={item.key} style={{flexDirection:'row',justifyContent:'center',alignItems:'center',margin:10,elevation:5,backgroundColor:'white'}}>
                 <Text style={{width:width-100,padding:5}} numberOfLines={1}>{item.productname}</Text>
                 <Text style={{paddingHorizontal:5,backgroundColor:'#DEDFDB'}}>{item.units}</Text>
                 </View>
        )}):<Text>no cart item</Text>
        }
        </View>
     </View>
  </SafeAreaView>
);
}