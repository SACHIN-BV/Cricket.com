import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Appearance
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Dashboard from './Screens/Dashboard';


const Tab = createMaterialTopTabNavigator();



const App=() => {

  return (
   <Dashboard/>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  color:{
    backgroundcolor1:"#121b2a",
    cardcolor2:"#28323b",
    statusbcolor3:"#1e2831",
    typeselectedcolor5:"#5b919e",
    t20color6:"#407d47",

    scedule:"#e1eaed",
    livetext2:"#747d8c",
    Alltext1:"#b4bec1",
    internationaltext4:"#e8eaee",
    progresscolor:"#35d924",
    redtext6:"#e82b23",


  }
});

export default App;
