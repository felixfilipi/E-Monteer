"use strict"

import React from "react-native";

export default React.StyleSheet.create({
  cardDetail:{
    marginBottom:15, 
    marginHorizontal:15,
    borderBottomStartRadius:10,
    borderBottomEndRadius:10,
    backgroundColor: '#3a4447'
  },
  cardHeader:{
    backgroundColor:'#2e3638', 
    marginTop:15, 
    marginHorizontal:15, 
    paddingTop: 25, 
    borderTopStartRadius:10, 
    borderTopEndRadius:10
  },
  iconStyle:{
    alignSelf:'center', 
    marginVertical:10
  },
  listContainer:{
    flexDirection:'row', 
    padding: 15, 
    flex: 4, 
    alignItems:'center'
  },
  listLayout:{
    flexDirection: 'column', 
    flex:3, 
    paddingHorizontal:5
  }
})
