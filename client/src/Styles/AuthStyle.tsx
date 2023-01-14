"use strict"

import React from "react-native";

export default React.StyleSheet.create({
    
  avatarStyle: {
    alignItems:'center', 
    marginTop:10
  },

  button: {
    marginTop: 50,
  },

  flexVertical: {
    marginTop:20,
    flexDirection: "column",
  },

  flexHorizontal: {
    flexDirection: "row",
    marginTop: 25
  },

  icon: {
    marginTop: 1,
    flex: 1,
  },

  logo: {
      width: 300,
      height: 200,
      marginTop: 40,
      marginLeft: 10,
  },

  logoVector: {
      width: 280,
      height: 380,
      marginTop: 40,
      marginLeft: 10,
  },

  signText: {
      marginTop: 15,
      textAlign: "center",
      color: "white"
  },

  textInp: {
      backgroundColor: "#434647",
      color: "#fff",
      height: 40,
      flex: 4,
      fontSize: 15,
      paddingHorizontal: 15,
      borderRadius: 5,
  },
  
  photoLabel: {
    color:'white',
    marginTop:15,
    fontSize:15,
    fontWeight:'500',
    textAlignVertical:'center'
  },
  
  pickerLayout: {
    backgroundColor: '#434647',
    color: "#fff",
    height:40,
    flex: 2,
    paddingLeft:6,
    justifyContent:'center',
    borderRadius:5,
    fontSize: 10,
  },

  pickerFont:{
    fontSize:15, 
    color:'white'
  },
})
