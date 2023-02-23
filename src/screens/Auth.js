import React, { useState } from "react";
import { StyleSheet, View, Image, KeyboardAvoidingView, Platform } from "react-native"; 
import RegisterForm from "../components/Auth/RegisterForm"; 
import LoginForm from "../components/Auth/LoginForm";
import logo from "../../assets/logo.png"; 
import { layoutStyle } from "../styles";

export default function Auth() {  
    const [showLogin, setShowLogin] = useState(true); 

    return (
    <View style={layoutStyle.container}>  
        <Image style={styles.logo} source={logo} />
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "null"}>
          {showLogin ? (
            <LoginForm setShowLogin={setShowLogin} /> 
          ) : (
            <RegisterForm setShowLogin={setShowLogin}/>
          )}
          </KeyboardAvoidingView>
  
    </View>
    );
} 

const styles = StyleSheet.create({
    logo: {
        width: "100%", 
        height: 50, 
        resizeMode: "contain",
        marginBottom: 20,
    },
});