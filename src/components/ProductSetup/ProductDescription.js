import React from "react"; 
import { StyleSheet, View, Text } from "react-native";

export default function ProductDescription(props) { 
    const { description } = props;
    
    return ( 
        <View> 
            <Text style={styles.title}>Detalles del producto</Text> 
            <Text style={[styles.dataText]}>{description}</Text>
        </View>
    );
} 




const styles = StyleSheet.create({ 
    title: {
        fontWeight: "bold",
        fontSize: 20,
        marginTop: 35,
    },  
    dataText: { 
        fontSize: 16,
        marginTop: 10,
    }
    
});