"use strict"

import React from "react-native";

export default React.StyleSheet.create({
    
  avatarStyle: {
    alignItems:'center', 
    marginTop:10
  },

  buttonStyle: {
      backgroundColor: "#b99504",
      marginVertical: 50,
  },

  flexVertical: {
      flexDirection: "column",
      marginTop: 10
  },

  flexHorizontal: {
      flexDirection: "row",
      marginTop: 25,
      marginBottom: 10,
  },

  iconStyle: {
      marginTop: 1,
  },

  modalStyle: {
    backgroundColor: 'white',
    paddingVertical: 20,
    paddingHorizontal:20,
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },

  modalText: {
    fontSize:18, 
    color:'#828483',
    paddingVertical:15,
    paddingLeft:10,
  },

  modalTextLayout: {
    flexDirection:'row', 
    alignItems:'center',
  },

  photoLabel: {
    color:'white',
    marginTop:15,
    fontSize:15,
    fontWeight:'500',
    textAlignVertical:'center'
  },

  textInp: {
      backgroundColor: "#434647",
      color: "#fff",
      height: 40,
      fontSize: 15,
      paddingHorizontal: 15,
      borderRadius: 5,
  },

  inputTitle: {
    color:'white',
    marginLeft:5,
    textAlignVertical:'center'
  },

})
