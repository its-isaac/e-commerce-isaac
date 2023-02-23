import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native"; 
import  StatusBar  from "../../components/StatusBar"; 
import Search from "../../components/Search"; 
import ScreenLoading from "../../components/ScreenLoading";  
import CarouselImages from "../../components/ProductSetup/CarrouselImages"; 
import Price from "../../components/ProductSetup/Price";  
import ProductDescription from "../../components/ProductSetup/ProductDescription"; //Product Description
import Quantity from "../../components/ProductSetup/Quantity"; 
import Buy from "../../components/ProductSetup/Buy"; 
import Favorite from "../../components/ProductSetup/Favorite";
import { getProductApi } from "../../api/product"; 
import colors from "../../styles/colors";

export default function Product(props) {  
    const {route} = props; 
    const {params} = route
    const [product, setProduct] = useState(null); 
    const [images, setImages] = useState([]); 
    const [quantity, setQuantity] = useState(1);  
    const { description } = props; //Description
    
    useEffect(() => { 
      (async () => { 
         const response = await getProductApi(params.idProduct); 
         setProduct(response); 

         const arrayImages = [response.main_image]; 
         arrayImages.push(...response.images); 
         setImages(arrayImages);
      })(); 
    }, [params]); 
    
    return (   
      <> 
        <StatusBar backgroundColor={colors.bgLight} barStyle="dark-content" />
        <Search /> 
        {!product ? ( 
          <ScreenLoading text="Cargando producto" size="large" /> 
        ) : ( 
        <ScrollView style={styles.container}> 
          <Text style={styles.title}>{product.title}</Text>
          <CarouselImages images={images} /> 
          <View style={styles.containerView}>   
            <Price price={product.price} discount={product.discount} /> 
            <Quantity quantity={quantity} setQuantity={setQuantity} /> 
            <Buy product={product} quantity={quantity} /> 
            <Favorite product={product} /> 
            <ProductDescription style={styles.title} description={product.description} /> 
          
          </View>
        </ScrollView> 
      )}
      </>
    );
} 

const styles = StyleSheet.create({
    container: {
      paddingBottom: 50,
    },
    title: {
      fontWeight: "bold",
      fontSize: 22,      //Tamaño de letra titulo del producto
      marginBottom: 20, 
      padding: 10,
    },
    containerView: { 
      padding: 10, 
    },
    btnBuyContent: {
      backgroundColor: "#262626",
      paddingVertical: 5,
    },
    btnBuyLabel: {
      fontSize: 18,
    },
    btnBuy: {
      marginTop: 20,
    },
  });