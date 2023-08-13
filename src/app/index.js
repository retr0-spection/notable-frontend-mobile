import { Redirect, Slot } from "expo-router";
import { Provider } from "../context/auth";
import { useEffect } from "react";
import { AppState } from "react-native";

const Index = () => {
  


  return (
  <Provider>
    <Slot />
  </Provider>
  )

};
export default Index;