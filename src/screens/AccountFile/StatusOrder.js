import React from "react";
import { View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import StatusBar  from "../../components/StatusBar";

export default function StatusOrder() { 
return (
    <>
    <StatusBar />
    <ScrollView>
    <View>
      <Text>Estado de Envío</Text>
    </View>
    </ScrollView>
    </>
); 

}