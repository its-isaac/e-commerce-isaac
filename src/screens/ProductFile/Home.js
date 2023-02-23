import React from "react";
import { ScrollView } from "react-native"; 
import StatusBar from "../../components/StatusBar"; 
import Search from "../../components/Search"  
import NewProducts from "../../components/HomeFile/NewProducts"; 
import Banners from "../../components/HomeFile/Banners";
import colors from "../../styles/colors"; 

export default function Home() {  
    return (
      <> 
        <StatusBar backgroundColor={colors.bgLight} barStyle="dark-content"/>
        <Search /> 
        <ScrollView> 
           <Banners/>
          <NewProducts />
        </ScrollView> 
      </> 
    );
} 