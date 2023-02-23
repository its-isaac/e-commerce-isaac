import React, { useState } from "react"; 
import { View } from "react-native"; 
import { TextInput, Button } from "react-native-paper";  
import { useFormik } from "formik"; 
import * as Yup from "yup";  
import Toast from "react-native-root-toast";
import { registerApi } from "../../api/user";
import { formStyle } from "../../styles";

export default function RegisterForm(props) {  
  const { setShowLogin } = props; 
  const [loading, setLoading] = useState(false); 
  
  const showLogin = () => setShowLogin((prevState) => !prevState);

  const formik = useFormik({
    initialValues: initialValues(), 
    validationSchema: Yup.object(validationSchema()), 
    onSubmit: async (formData) => { 
        setLoading(true);
      try { 
        await registerApi(formData); 
        showLogin();
      } catch (error) {  
        Toast.show("Error al registrar el usuario", { 
          position: Toast.positions.CENTER,
          }); 
          setLoading(false);
      }
    },
})

    return( 
         <View> 
            <TextInput 
              label="Email" 
              style={formStyle.imput} 
              onChangeText={(text) => formik.setFieldValue("email", text)} 
              value={formik.values.email} 
              error={formik.errors.email}
            />  

            <TextInput 
              label="Nombre de Usuario" 
              style={formStyle.imput} 
              onChangeText={(text) => formik.setFieldValue("username", text)} 
              value={formik.values.username} 
              error={formik.errors.username}
            /> 

            <TextInput 
              label="Contraseña" 
              style = {formStyle.imput} 
              onChangeText={(text) => formik.setFieldValue("password", text)} 
              value={formik.values.password} 
              error={formik.errors.password}
              secureTextEntry 
            />

            <TextInput 
              label="Repetir Contraseña" 
              style={formStyle.imput} 
              onChangeText={(text) => formik.setFieldValue("repeatPassword", text)} 
              value={formik.values.repeatPassword} 
              error={formik.errors.repeatPassword}
              secureTextEntry 
            /> 
            <Button 
              mode="contained" 
              style={formStyle.btnSucces} 
              onPress={formik.handleSubmit}  
              loading={loading}
              > 
                Registrarse
            </Button> 
            <Button 
              mode="text" 
              style={formStyle.btnText} 
              abelStyle={formStyle.btnTextLabel} 
              onPress={showLogin}
            > 
              Iniciar sesión
            </Button>
         </View>
    );
} 

function initialValues() { 
  return { 
    email: "", 
    username: "", 
    password: "", 
    repeatPassword: ""
   };
} 

function validationSchema() { 
    return { 
        email: Yup.string().email(true).required(true), 
        username: Yup.string().required(true), 
        password: Yup.string().required(true), 
        repeatPassword: Yup.string()
          .required(true)
          .oneOf([Yup.ref("password")], true), 
    };
}