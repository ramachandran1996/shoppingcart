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
import Productlists from '../components/listview';
const width = Math.round(Dimensions.get('window').width);

function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
}

export default ({ navigation,route }) => {
    // const props = route.params.name && route.params.name?route.params.name:'hi'
    const [iscart,setIscart ] = React.useState([]);
    React.useEffect(() => {
        if (route.params?.name) {
             setIscart(route.params.name)
        }
      }, [route.params?.name]);
    // const props = route.params==undefined?route.params:setIscart(route.params.name)
    
    const [isLoading, setIsLoading] = React.useState(true);
    const [isFilterlist, setIsFilterlist] = React.useState(false);
    const [isFilterswitch, setIsFilterswitch] = React.useState(false);
    const [isActivemicro, setIsActivemicro] = React.useState(false);
    const [isActivemac, setIsActivemac] = React.useState(false);
    const [isArray, setIsArray] = React.useState(lists);
    let sortinglist = [...lists];
    // console.log('name',props)
sorthandling = ()=>{
    setIsLoading(!isLoading)
    if(isLoading){
    const ascending = isArray.sort(function(first, second) {
        return parseFloat(first.rating) - parseFloat(second.rating);
    });
    setIsArray(ascending)
    }else{
    const descending =  isArray.sort(function(first, second) {
        return parseFloat(second.rating) - parseFloat(first.rating);
    });
    setIsArray(descending)
    }
 
    // console.log('sortinglist',sortinglist)
}
filterhandling = () => {
    setIsFilterlist(!isFilterlist);
}
 filterlisthandling = (name)=>{
    setIsFilterswitch(!isFilterswitch);
    if(name=='Microsoft'){
    setIsActivemicro(!isActivemicro)
    }
    if(name=='Apple'){
    setIsActivemac(!isActivemac)
    }
 
    console.log('filterlist',isActivemac,isActivemicro);
  
        // setArray(isArray);
 
} 
console.log('render',isActivemicro,isActivemac);

morechanges =()=>{
    if(isActivemicro==true && isActivemac==false ){
        let  updatedlist = lists.filter((item)=>item.productname.includes('Microsoft'))
        //   console.log('result',updatedlist);
          setIsArray(updatedlist)
        }else if(isActivemicro==false && isActivemac==true )
        {
          let  updatedlist = lists.filter((item)=>item.productname.includes('Apple'))
            //   console.log('result',updatedlist);
              setIsArray(updatedlist)
         }else if(isActivemac==false && isActivemicro==false){
             setIsArray(lists)
         }else{
              setIsArray([]) 
        }
}

React.useEffect(() => {
    // function will be called on each "isElementVisible" change
    this.morechanges()
  }, [isActivemac,isActivemicro])
return(
    <ScrollView style={{flex:1}}>
            {
              iscart && iscart.length>0?iscart.map((item,index)=>{return(
              index==0? <View key={item.key} style={{flexDirection:'row',justifyContent:'flex-end',marginTop:10}}>
                   <TouchableOpacity onPress={()=>{navigation.navigate('Cart',{cartlist:iscart})}} style={{flexDirection:'row'}}>
                   <Icon name={'shopping-cart'}
                   size={22}
                   />
                  <Text  style={{position:'relative',left:-3,top:-10,color:'red',fontSize:18,fontWeight:'bold'}}>{iscart.length}</Text>
                  </TouchableOpacity>
                 </View>:null
              )}
              ):<View style={{flexDirection:'row',justifyContent:'flex-end',marginTop:10}}>
              <TouchableOpacity onPress={()=>{navigation.navigate('Cart',{cartlist:iscart})}} style={{flexDirection:'row'}}>
              <Icon name={'shopping-cart'}
              size={22}
              />
             <Text  style={{position:'relative',left:-3,top:-10,color:'red',fontSize:18,fontWeight:'bold'}}>0</Text>
             </TouchableOpacity>
            </View>
          }
      <View style={{flexDirection:'row',backgroundColor:'white',width:width,height:50}}>
         <TouchableOpacity style={{width:width/2-10,backgroundColor:'#DEDFDB',margin:5,justifyContent:'center',alignItems:'center'}}
         onPress={()=>{this.sorthandling()}}
         >
            <Icon
            name={'sort'}
            size={22}
            style={{position:'absolute',left:50}}
            />
           <Text>Sort</Text>
       
         </TouchableOpacity>
         <TouchableOpacity style={{width:width/2-10,backgroundColor:'#DEDFDB',margin:5,justifyContent:'center',alignItems:'center'}}
         onPress={()=>{
             filterhandling()
         }}
         >
         
         <MaterialCommunityIcons
            name={'filter'}
            size={22}
            style={{position:'absolute',left:50}}
            />
        
           <Text>filter</Text>
         </TouchableOpacity>
      </View>
     {isFilterlist?<View style={{backgroundColor:'#DEDFDB',width:width,height:width/2,justifyContent:'center',alignItems:'center'}}>
          <TouchableOpacity style={{padding:5,backgroundColor:isActivemicro?'blue':'white',margin:5,width:width-100}}
          onPress={()=>{this.filterlisthandling('Microsoft')}}
          >
              <Text style={{textAlign:'center'}}>Microsoft</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{padding:5,backgroundColor:isActivemac?'blue':'white',margin:5,width:width-100}}
             onPress={()=>{this.filterlisthandling('Apple')}}
          >
              <Text style={{textAlign:'center'}}>Mac</Text>
          </TouchableOpacity>
      </View>:null}
    <View style={{flex:1,flexDirection:'row',flexWrap:'wrap',justifyContent:'space-evenly'}}>
     {
       isArray.map((item)=>{
         return(       
          <Productlists 
          key={item.key}
          image={item.image}
          price={item.price}
          productname={item.productname}
          numberofratingtotal={item.numberofratingtotal}
          onPress={()=>{navigation.push("Product", { name: item,cartlist:item,updatedlist:iscart })}}
          BankOffer={item.BankOffer}
          id={item.key}
          rating={item.rating}
        //   finalresult={iscart}
          />
            
         )               
       })
     }  
     </View>

 {/* <View style={{marginBottom:10}}>
 <Button
   title="React Native School"
   onPress={() =>
     navigation.push("Details", { name: "React Native School" })
   }
 />
  </View>
  <View style={{marginBottom:10}}>
 <Button title="Drawer" onPress={() => navigation.toggleDrawer()} />
 </View> */}
 </ScrollView>
)
}