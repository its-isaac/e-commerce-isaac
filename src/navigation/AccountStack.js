import React, { useState, useEffect, useMemo } from "react"; 
import { createStackNavigator } from "@react-navigation/stack";
import Account from "../screens/AccountFile/Account";

//Modificacion Junio 2022
import jwtDecode from "jwt-decode"; 
import AuthScreen from "../screens/Auth"; 
import { setTokenApi, getTokenApi, removeTokenApi } from "../../src/api/token" 
import AuthContext from "../context/AuthContext";
import AppNavigation from "./AppNavigation";

import ChangeName from "../screens/AccountFile/ChangeName"; 
import ChangeEmail from "../screens/AccountFile/ChangeEmail"; 
import ChangeUsername from "../screens/AccountFile/ChangeUsername"; 
import ChangePassword from "../screens/AccountFile/ChangePassword"; 
import Addresses from "../screens/AccountFile/Addresses"; 
import AddAddress from "../screens/AccountFile/AddAddress"; 
import Orders from "../screens/AccountFile/Orders";
import StatusOrder from "../screens/AccountFile/StatusOrder";
import colors from "../styles/colors";

const Stack = createStackNavigator(); 

export default function AccountStack(){ 
  //Modificación 2022
  const [auth, setAuth] = useState(undefined);  

  useEffect(() => { 
     (async() => { 
        const token = await getTokenApi(); 
        
      if (token) {  
          setAuth({ 
            token, 
            idUser: jwtDecode(token).id,
          });
        } else { 
          setAuth(null); 
      } 

    })();
  }, []); 

  const login = (user) => {    
    setTokenApi(user.jwt); 
    setAuth({ 
      token: user.jwt, 
      idUser: user.user._id,
    });
  }; 

  const logout = () => {
    if (auth) {
      removeTokenApi();
      setAuth(null);
    }
  };

  const authData = useMemo(
    () => ({ 
      auth, 
      login, 
      logout,
      setReloadUser: () => null,
    }),
    [auth]
  );

  if (auth === undefined) return null; 

  

  return ( 
    <AuthContext.Provider value={authData}>
      {auth ? <Stack.Screen /> : <AuthScreen />}

    <Stack.Navigator  
        screenOptions={{ 
          headerTintColor: colors.bgDark, 
          headerStyle: { backgroundColor: colors.bgLight }, 
          cardStyle: { 
              backgroundColor: colors.bgLight, 
          }, 
        }}  
    > 
     <Stack.Screen 
        name="account" 
        component={Account}  
        options={{title: "Cuenta", headerShown: false }}
      />  
     <Stack.Screen
        name="change-name"
        component={ChangeName}
        options={{
          title: "Cambiar nombre y apellidos",
        }}
      /> 
     <Stack.Screen
        name="change-email"
        component={ChangeEmail}
        options={{
          title: "Cambiar email",
        }}
      /> 
      <Stack.Screen
        name="change-username"
        component={ChangeUsername}
        options={{
          title: "Cambiar nombre de usuario",
        }}
      /> 
      <Stack.Screen
        name="change-password"
        component={ChangePassword}
        options={{
          title: "Cambiar contraseña",
        }}
      /> 
      <Stack.Screen
        name="addresses"
        component={Addresses}
        options={{
          title: "Mis direcciones",
        }}
      /> 
      <Stack.Screen
        name="add-address"
        component={AddAddress}
        options={{
          title: "Nueva dirección",
        }}
      /> 
      <Stack.Screen 
        name="orders" 
        component={Orders} 
        options={{ title: "Mis pedidos" }}
      />
      <Stack.Screen 
        name="status-order" 
        component={StatusOrder} 
        options={{ title: "Seguimiento" }}
      />
    </Stack.Navigator> 
    </AuthContext.Provider>
  );
}