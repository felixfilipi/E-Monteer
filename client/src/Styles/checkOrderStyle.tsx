"use strict"

import React from "react-native";

export default React.StyleSheet.create({
  contentContainer: {
    marginBottom:65, 
    marginTop:5,
    alignItems: 'center'
  },

  costListDetail: {
    backgroundColor:'#ffffff', 
    justifyContent: 'center',
    alignContent: 'center',
    margin:10,
    padding:20,
    borderRadius: 20,
    width: '90%',
  },

  customerDetail: {
    backgroundColor:'#ffffff', 
    flexDirection:'column',
    justifyContent: 'center',
    alignContent: 'center',
    margin:10,
    padding:20,
    borderRadius: 20,
    width: 'auto'
  },

  detailText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
    textAlign: 'right'
  },
  
  iconImage : {
    width: 50,
    height: 50,
  },

  textLabel: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 15,
    paddingTop: 20
  },

  titleStyle: {
      color: '#b99504',
      fontFamily: 'normal',
      fontWeight: '700',
      fontSize: 20,
      marginBottom: 10,
      marginLeft: 10
    },
      
})