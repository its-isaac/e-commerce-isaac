import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { TextInput, Button } from "react-native-paper"; 
import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-root-toast"; 
import { size } from "lodash"
import useAuth from "../../hooks/useAuth";
import { paymentCartApi, deleteCartApi } from "../../api/cart";
import { STRIPE_PUBLISHABLE_KEY } from "../../utils/constants"; //Stripe 
import { formStyle } from "../../styles";
import colors from "../../styles/colors";
const stripe = require("stripe-client")(STRIPE_PUBLISHABLE_KEY); //Stripe

export default function Payment(props) {
  const { totalPayment, selectedAddress, products } = props;
  const [loading, setLoading] = useState(false);
  const { auth } = useAuth(); 
  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => { 
      setLoading(true); 
                         //Stripe
      const result = await stripe.createToken({ card: formData });

      if (result?.error) { 
        setLoading(false);
        Toast.show(result.error.message, {
          position: Toast.positions.CENTER,
        });
      } else {
        const response = await paymentCartApi(
          auth,
          result.id,
          products,
          selectedAddress 
        );

        if(size(response) > 0) {  
          await deleteCartApi(); 
          navigation.navigate("account", { screen: "orders" }); 
        } else { 
            Toast.show("Error al realizar el pedido", { 
                position: Toast.position.CENTER
            });
            setLoading(false);
        }
        
      }
    },
  });

  return (
    <View style={styles.continer}>
      <Text style={styles.containerTitle}>Forma de pago</Text>
      <TextInput
        label="Nombre de la tarjeta"
        style={formStyle.input}
        onChangeText={(text) => formik.setFieldValue("name", text)}
        value={formik.values.name}
        error={formik.errors.name}
      />
      <TextInput
        label="Numero de tarjeta"
        style={formStyle.input}
        onChangeText={(text) => formik.setFieldValue("number", text)}
        value={formik.values.number}
        error={formik.errors.number}
      />
      <View style={styles.containerInputs}>
        <View style={styles.containerMonthYearInputs}>
          <TextInput
            label="Mes"
            style={styles.inputDate}
            onChangeText={(text) => formik.setFieldValue("exp_month", text)}
            value={formik.values.exp_month}
            error={formik.errors.exp_month}
          />
          <TextInput
            label="Año"
            style={styles.inputDate}
            onChangeText={(text) => formik.setFieldValue("exp_year", text)}
            value={formik.values.exp_year}
            error={formik.errors.exp_year}
          />
        </View>
        <TextInput
          label="CVV/CVC"
          style={styles.inputCvc}
          onChangeText={(text) => formik.setFieldValue("cvc", text)}
          value={formik.values.cvc}
          error={formik.errors.cvc}
        />
      </View>

      <Button
        mode="contained"
        contentStyle={styles.btnContent}
        labelStyle={styles.btnText}
        onPress={!loading && formik.handleSubmit}
        loading={loading}
      >
        Pagar {totalPayment && `($ ${totalPayment})`}
      </Button>
    </View>
  );
}

function initialValues() {
  return {
    number: "",
    exp_month: "",
    exp_year: "",
    cvc: "",
    name: "",
  };
}

function validationSchema() {
  return {
    number: Yup.string().min(16).max(16).required(true),
    exp_month: Yup.string().min(2).max(2).required(true),
    exp_year: Yup.string().min(2).max(2).required(true),
    cvc: Yup.string().min(3).max(3).required(true),
    name: Yup.string().min(6).required(true),
  };
}

const styles = StyleSheet.create({
  continer: {
    marginTop: 40,
    marginBottom: 30,
  },
  containerTitle: {
    paddingBottom: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  containerInputs: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  inputCvc: {
    width: "40%",
  },
  containerMonthYearInputs: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  inputDate: {
    width: 110,
    marginRight: 1,
  },
  btnContent: {
    paddingVertical: 4,
    backgroundColor: "#FE0500",
  },
  btnText: {
    fontSize: 16,
  },
});