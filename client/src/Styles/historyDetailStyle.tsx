"use strict"

import React from "react-native"

export default React.StyleSheet.create({

  titleText : {
    fontSize:20,
    fontWeight: '600',
    color:'#b99504',
  },

  titleStyle: {
    color: '#b99504',
    fontFamily: 'normal',
    fontWeight: '700',
    fontSize: 20,
    marginBottom: 10,
    marginLeft: 10
  },

  descriptionLayout: {
    flexDirection:'row', 
    flex:8, 
    padding:10,
  },

  avatarContainer:{
    flexDirection:'row', 
    marginTop:20,
    paddingVertical:20,
    borderTopWidth:1,
    borderBottomWidth:1,
    borderBottomColor:'rgba(197, 194, 192, 0.4)',
    borderTopColor:'rgba(197, 194, 192, 0.4)'
  },

  pickupContainer:{
    paddingVertical:20,
    borderBottomWidth:1,
    borderBottomColor:'rgba(197, 194, 192, 0.4)',
  },

  iconContainer:{
    justifyContent:'center', 
    alignItems:'center', 
    flex:1
  },

  horizontalContainer:{
    flexDirection:'row',
    paddingVertical:10,
    flex:7
  },

  descriptionContainer: {
    marginHorizontal:10, 
    marginVertical:20, 
    backgroundColor:'white', 
    borderRadius:20, 
    padding:10,
    paddingTop:20,
    paddingBottom:-10
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
