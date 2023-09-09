import { Redirect, Slot } from "expo-router";
import { Provider } from "../context/auth";
import React, { useEffect } from "react";
import { AppState } from "react-native";
import { useSelector } from "react-redux";
import { selectLightMode } from "../../redux/slices/dataSlice";
import { StatusBar } from "expo-status-bar";

const Index = () => {



  return (
  <Provider>
    <Slot />
  </Provider>
  )

};
export default Index;