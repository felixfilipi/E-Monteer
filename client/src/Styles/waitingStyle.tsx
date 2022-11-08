"use strict"

import React from "react-native"

export default React.StyleSheet.create({

  searchSection: {
    paddingVertical: 10,
    flex:1
  },

  descText: {
    color: 'white',
    fontFamily: 'normal',
    fontWeight: '600',
    fontSize: 20,
    marginBottom: 10,
    marginLeft: 10
  },

  importantText: {
    color: '#de0004',
    fontFamily: 'normal',
    fontWeight: '600',
    fontSize: 13,
    marginBottom: 10,
    marginLeft: 5
  },
  
  vehicleBtn: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 7,
    flexDirection: 'column',
    margin: 3,
    marginTop: 8
  },

  orderBtn: {
    backgroundColor: '#b99504',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 7,
    flexDirection: 'row',
    margin: 3,
    marginTop: 8,
    justifyContent:'center'
  },
  
  orderText: {
    color: 'white',
    fontFamily: 'normal',
    fontWeight: '600',
    fontSize: 15,
    textAlign: 'center',
    paddingVertical:5
  },

  ButtonText: {
    color: 'black',
    fontFamily: 'normal',
    fontWeight: '600',
    fontSize: 20,
    marginTop: 10
  },

  vehicle: {
    flexDirection:'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
 
  orderSection:{
    position:'absolute', 
    bottom:25, 
    left:0, 
    right:0
  }

})
