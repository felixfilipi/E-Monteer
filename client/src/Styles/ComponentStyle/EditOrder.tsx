"use strict"

import React from "react-native"

export default React.StyleSheet.create({

  modalMask:{
    flex:1, 
    backgroundColor:'rgba(71, 76, 78, 0.8)', 
    marginBottom:-30
  },
  modalMaskLayout:{
    flex:4, 
    justifyContent:'center',
  },
  modalLayout:{
    flex:4, 
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
  modalListLayout:{
    flex:3, 
    margin:15, 
    borderWidth:0.4, 
    borderColor:'#9ca8ac', 
    borderRadius:20
  },
  modalMetaContainer:{
    flex:1, 
    padding:15
  },
  modalTotalLayout:{
    flexDirection:'row',
    flex:2
  },
  modalButtonLayout:{
    flex:2, 
    flexDirection:'row'
  },
  modalButtonText:{
    fontWeight:'700'
  },
})
