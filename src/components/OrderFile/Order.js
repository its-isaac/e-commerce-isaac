import React from "react";
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback } from "react-native";
import { API_URL } from "../../utils/constants";
import { useNavigation } from "@react-navigation/native"; 

export default function Order(props) {
  const { order } = props; 
  const navigation = useNavigation();

  //Añadido Enero 2023
  /*const goToStatusOrder = (id) => {
    navigation.push("status-order", { idProduct: id })
  };*/

  return (
    <View style={styles.container}>
      <View style={styles.containerImage}>

      <TouchableWithoutFeedback onPress={() => navigation.navigate("status-order")}>
        <Image
          style={styles.image}
          source={{
            uri: `${API_URL}${order.product.main_image.url}`,
          }}
        />
      </TouchableWithoutFeedback>
      </View>
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2} ellipsizeMode="tail">
          {order.product.title}
        </Text>
        <Text>Cantidad: {order.quantity}</Text>
        <Text>Total pagado: ${order.productsPayment} </Text>
      </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: "#ddd",
    marginHorizontal: -20,
    paddingVertical: 5,
    flexDirection: "row",
  },
  containerImage: {
    width: "30%",
    height: 120,
    padding: 10,
  },
  image: {
    height: "100%",
    resizeMode: "contain",
  },
  info: {
    width: "70%",
    justifyContent: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
});