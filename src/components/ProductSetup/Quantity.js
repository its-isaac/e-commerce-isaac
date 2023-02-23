import React, { useCallback, useState } from 'react';
import { StyleSheet, ScrollView, View, LogBox } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

export default function Quantity(props) {
  const { quantity, setQuantity } = props;
   
    // Ignorar el log que da error
    LogBox.ignoreLogs([
        "VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead."
    ]);
 
    // estado para poder abrir el DropDown
    const [open, setOpen] = useState(false);
 
    // estado para poder guardar valor seleccionado el DropDown
    const [value, setValue] = useState(null);
 
    // estado para poder tener mis opciones
    const [items, setItems] = useState([
        { label: "1", value: 1 },
        { label: "2", value: 2 },
        { label: "3", value: 3 }, 
        { label: "4", value: 4 },
    ]);
 
    return (
        <View >
            <DropDownPicker
                defaultValue={quantity}
                open={open}
                items={items}
                value={value}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems} 
                containerStyle={styles.containerStyle} 
                itemStyle={styles.itemStyle}
                dropDownStyle={styles.dropDownPicker}
                style={styles.dropDownPicker}
                labelStyle={styles.labelStyle}
                onChangeValue={(value) => {
                    setQuantity(value); // mostrar el valor seleccionado
                }}
                placeholder="Cantidad"
                dropDownDirection="TOP"
 
            />
        </View>
    );
}
 
const styles = StyleSheet.create({
    containerStyle: { 
        height: 50,
        width: 120,
    },
    itemStyle: {
        // flexDirection: "row-reverse",
        justifyContent: "flex-start"
    },
    dropDownPicker: {
        backgroundColor: "#fafafa",
    },
    labelStyle: {
        color: "#000",
    }
 
});