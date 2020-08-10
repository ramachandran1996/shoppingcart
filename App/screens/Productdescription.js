import React from "react";
import { View, Button,Text,Dimensions,TouchableOpacity,StatusBar,SafeAreaView } from "react-native";
import Productlists from '../components/listview';
import Icon from 'react-native-vector-icons/MaterialIcons';
const width = Math.round(Dimensions.get('window').width);
import lists from '../data/lists';
export default ({ navigation, route  }) => {
    const [iscart,setIscart ] = React.useState([]);
    const item = route.params.cartlist;
    const cart = route.params.updatedlist;
    React.useEffect(() => {
             setIscart(cart)
      }, []);
 
    findProductIndex = (cart, productID) => {
        return cart.findIndex(p => p.key === productID);
      };
    
      updateProductUnits = (cart, product) => {
        const productIndex = this.findProductIndex(cart, product.key);
    
        const updatedProducts = [...cart];
        const existingProduct = updatedProducts[productIndex];
    
        const updatedUnitsProduct = {
          ...existingProduct,
          units: existingProduct.units + product.units
        };
    
        updatedProducts[productIndex] = updatedUnitsProduct;
    
        return updatedProducts;
      };
    
      addToCart = (product) => {
          console.log(product.key);
        const existingProductIndex = this.findProductIndex(iscart, product.key);
        console.log(existingProductIndex,iscart)
        setIscart(oldArray => existingProductIndex >= 0?this.updateProductUnits(oldArray, product): [...oldArray, product]);
        //  setIscart(prevstate=>[...prevstate,product])
        // console.log(iscart,existingProductIndex);
    
        // this.setState({
        //   cart: existingProductIndex >= 0 
        //     ? this.updateProductUnits(cart, product)
        //     : [...cart, product]
        // });
    
      };
    //   console.log(iscart);
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
      <Text style={{flex:1,textAlign:'center',marginRight:20,fontSize:22}}>Product description</Text>
      </View>
    {/* <TouchableOpacity style={{padding:5}} onPress={()=>{navigation.navigate("Home", { name: iscart,from:'add' })}}>
           <Text>back</Text>
       </TouchableOpacity> */}

       
  <View style={{ flex: 1,justifyContent:'center',alignItems:'center' ,backgroundColor:'white'}}>
      <Productlists 
          key={item.key}
          addstyle={{width:width,height:300}}
          image={item.image}
          price={item.price}
          productname={item.productname}
          numberofratingtotal={item.numberofratingtotal}
          BankOffer={item.BankOffer}
          id={item.key}
          rating={item.rating}
          button={true}
        //   finalresult={iscart}
        //   addFunc={this.addToCart}
          addtocart={()=>{this.addToCart({...item,units:1})}}
          />
  </View>
  </View>
  </SafeAreaView>
  )
}