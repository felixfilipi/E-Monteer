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
