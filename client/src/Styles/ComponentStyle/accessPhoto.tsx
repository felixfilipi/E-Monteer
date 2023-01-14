"use strict"

import React from "react-native"

export default React.StyleSheet.create({

  idCardContainer:{
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#434647", 
    marginTop: 30, 
    padding:15,
  },
  modalMask:{
    flex:1, 
    backgroundColor:'rgba(71, 76, 78, 0.8)', 
    marginBottom:-30
  },
  modalStyle: {
    backgroundColor: 'white',
    paddingVertical: 20,
    paddingHorizontal:20,
    borderRadius: 15,
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

})
