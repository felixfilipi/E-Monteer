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
      flexDirection: "column",
      marginTop: 20
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
      flex: 3,
      fontSize: 15,
      paddingHorizontal: 15,
      borderRadius: 5,
  },

  textInp2: {
    backgroundColor: "#434647",
    color: "#fff",
    height: 30,
    flex: 2,
    fontSize: 15,
    paddingHorizontal: 15,
    borderRadius: 5,
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
  
})
