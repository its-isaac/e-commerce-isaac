import React, { useState, useCallback } from "react";
import { ScrollView, Text } from "react-native";   
import { useFocusEffect } from "@react-navigation/native";
import StatusBar from "../../components/StatusBar"; 
import Search from "../../components/Search"; 
import ScreenLoading from "../../components/ScreenLoading"; 
import Menu from "../../components/AccountMenu/Menu";
import UserInfo from "../../components/AccountMenu/UserInfo";
import { getMeApi } from "../../api/user"; 
import useAuth from "../../hooks/useAuth";
import colors from "../../styles/colors"; 

export default function Account() {   
  const [user, setUser] = useState(null);    
  const { auth } = useAuth(); 
  
  useFocusEffect( 
    useCallback(() => { 
      (async () => { 
        const response = await getMeApi(auth.token); 
        setUser(response); 
      }) ();
    }, [])
  ); 

  return (
    <>
      <StatusBar backgroundColor={colors.bgLight} barStyle="dark-content" />
      {!user ? (
        <ScreenLoading size="large" />
      ) : (
        <>
          <Search />
          <ScrollView>
            <UserInfo user={user}/> 
            <Menu/>
          </ScrollView>
        </>
      )}
    </>
  );
} 