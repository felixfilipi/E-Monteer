"use strict"

import React from "react-native"

export default React.StyleSheet.create({

  titleText : {
    fontSize:25,
    fontWeight: '600',
    color:'#b99504',
  },

  descriptionLayout: {
    flexDirection:'row', 
    flex:8, 
    padding:8,
  },

  descriptionContainer: {
    marginHorizontal:10, 
    marginVertical:20, 
    backgroundColor:'white', 
    borderRadius:20, 
    padding:10,
    paddingTop:20,
    paddingBottom:-10,
  },

  descriptionStyle: {
    color: '#8b8988',
    fontFamily: 'normal',
    fontWeight: '200',
    fontSize: 15,
    marginLeft: 10,
    textAlign:'left',
  },
})
