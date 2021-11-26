//This is an example code for Navigator// 
import React, { Component } from 'react';
//import react in our code. 

//Import react-navigation
import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';

import FirstPage from './FirstPage';
import SecondPage from './SecondPage';
import FamilyInfo from './FamilyInfo';
//import all the screens we are going to switch 
const App = createStackNavigator({
  //Constant which holds all the screens like index of any book 
  
    FirstPage: { screen: FirstPage }, 
    //First entry by default be our first screen if we do not define initialRouteName
    SecondPage: { screen: SecondPage }, 

    FamilyInfo:{screen:FamilyInfo},

  },
  console.warn = () => {}
  // {
     // initialRouteName: 'FirstPage',
  // }
);
export default createAppContainer(App);