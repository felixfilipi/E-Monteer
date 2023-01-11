"use strict"

import React from "react-native"

export default React.StyleSheet.create({

  floatingButtonLayout:{
    backgroundColor:'rgba(255, 255, 255, 0.7)', 
    borderRadius:30, 
    padding:5, 
    width:40
  },

  orderSection:{
    flex:1,
    width: '95%'
  },

  searchSection: {
    paddingVertical: 10,
    flex:1
  },

  vehicleStyle: {
    flexDirection:'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },

  modalMask:{
    flex:1, 
    backgroundColor:'rgba(71, 76, 78, 0.8)', 
    marginBottom:-30
  },
  modalMaskLayout:{
    flex:1, 
    justifyContent:'center',
  },
  modalLayout:{
    flex:1, 
    backgroundColor:'#fefefe', 
    borderRadius:20
  },
  modalClose:{
    alignItems:'flex-end', 
    margin:10
  },
  modalTitle:{
    marginBottom:0, 
    padding:15, 
    textAlign:'left'
  },
  modalMetaContainer:{
    flex:1, 
    padding:15
  },
  modalTotalLayout:{
    flexDirection:'row',
    justifyContent:'center'
  },
  modalButtonLayout:{
    flex:1, 
    flexDirection:'row'
  },
  modalButtonText:{
    fontWeight:'700'
  },
 
})
