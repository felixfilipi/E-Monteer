"use strict"

import React from "react-native"

export default React.StyleSheet.create({

  contentContainer: {
    flex:1, 
    marginBottom:65, 
    marginTop:5,
  },

  descriptionStyle: {
    color: '#8b8988',
    fontFamily: 'normal',
    fontWeight: '200',
    fontSize: 15,
    marginBottom: 10,
    marginLeft: 10
  },
  
  flatListStyle: {
    marginLeft: 10,
    padding: 5,
    paddingTop: 10,
    borderRadius: 5
  },

  handleContainer: {
    flexDirection:'column', 
    alignItems:'center',
  },

  iconContainer: {
    flex:1,
    flexDirection: 'column',
    alignItems:'center', 
    justifyContent:'center'
  },

  iconText: {
    color: '#8b8988',
    fontFamily: 'normal',
    fontWeight: '200',
    fontSize: 15,
    textAlign:'center'
  },

  listContainer: {
    backgroundColor:'#f1f1f1', 
    flexDirection:'row',
    margin:10,
    borderRadius: 20,
  },

  searchSection: {
    flex:1,
  },

  searchLayout: {
    flexDirection:'row', 
    marginHorizontal:10, 
    paddingHorizontal: 5, 
    backgroundColor:'white', 
    borderRadius:27,
  },

  titleStyle: {
    color: '#b99504',
    fontFamily: 'normal',
    fontWeight: '700',
    fontSize: 20,
    marginBottom: 10,
    marginLeft: 10
  },

  titleText : {
    color: 'white',
    fontSize:30,
    marginTop: 20,
    fontWeight: '600',
  },

  topSearch: {
    backgroundColor:'white', 
    opacity:0.4, 
    borderRadius:20, 
  },
})
