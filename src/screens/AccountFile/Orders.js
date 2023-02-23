import React, { useState, useCallback } from "react";
import { StyleSheet, ScrollView, Text, ActivityIndicator } from "react-native"; 
import { useFocusEffect } from "@react-navigation/native"; 
import { size } from "lodash"; 
import ListOrder from "../../components/OrderFile/ListOrder";
import StatusBar  from "../../components/StatusBar"; 
import useAuth from "../../hooks/useAuth"; 
import { getOrdersApi } from "../../api/order";
import colors from "../../styles/colors";

export default function Orders() { 
    const [orders, setOrders] = useState(null); 
    const { auth } = useAuth(); 
    
    useFocusEffect(
      useCallback(() => { 
        (async () => { 
        const response = await getOrdersApi(auth); 
        setOrders(response);
      })();
    }, [])
    );
    
    return ( 
    <> 
      <StatusBar backgroundColor={colors.bgLight} barStyle="dark-content" /> 
      <ScrollView style={StyleSheet.container}> 
        <Text style={styles.title}>Mis pedidos</Text> 
        
        {!orders ? ( 
            <ActivityIndicator size="large" styles={styles.loading} /> 
        ) : size(orders) === 0 ? (
            <Text style={styles.noOrdersText}>No tienes pedidos</Text> 
        ) : (
            <ListOrder orders={orders} />
        )}
      </ScrollView>
    </>
    );
} 

const styles = StyleSheet.create({
    container: {
      padding: 20,
    },
    title: {
      fontSize: 20,
    },
    addAddress: {
      borderWidth: 0.9,
      borderRadius: 5,
      borderColor: "#ddd",
      paddingHorizontal: 15,
      paddingVertical: 5,
      marginTop: 10,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    noOrdersText: {
      textAlign: "center",
      paddingTop: 20,
      fontSize: 18,
    },
    loading: {
      marginTop: 20,
    },
  });