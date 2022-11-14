"use strict"

import React from "react-native"

export default React.StyleSheet.create({

  titleText : {
    color: 'white',
    fontSize:30,
    marginTop: 20,
    fontWeight: '600',
  },

  topSearch: {
    backgroundColor:'white', 
    opacity:0.4, 
    borderTopLeftRadius:20, 
    borderTopRightRadius: 20
  },

  bottomSearch: {
    backgroundColor:'white', 
    opacity:0.4, 
    borderBottomLeftRadius:20, 
    borderBottomRightRadius: 20
  },
  
  searchSection: {
    flex:1,
  },

  searchLayout: {
    flexDirection:'row', 
    marginHorizontal:10, 
    paddingHorizontal: 5, 
    backgroundColor:'white', 
    borderRadius:27
  },

  titleStyle: {
    color: '#b99504',
    fontFamily: 'normal',
    fontWeight: '700',
    fontSize: 20,
    marginBottom: 10,
    marginLeft: 10
  },

  descriptionStyle: {
    color: '#8b8988',
    fontFamily: 'normal',
    fontWeight: '200',
    fontSize: 15,
    marginBottom: 10,
    marginLeft: 10
  },

  iconContainer: {
    flex:1,
    flexDirection: 'column',
    alignItems:'center', 
    justifyContent:'center'
  },

  IconText: {
    color: '#8b8988',
    fontFamily: 'normal',
    fontWeight: '200',
    fontSize: 15,
    textAlign:'center'
  },

  handleContainer: {
    flexDirection:'column', 
    alignItems:'center',
  },

  FlatListStyle: {
    padding: 5,
    paddingTop: 10,
    borderRadius: 5
  },

  ListContainer: {
    backgroundColor:'#f1f1f1', 
    flexDirection:'row',
    padding:10,
    margin:10,
    paddingVertical: 10,
    borderRadius: 20,
  }

})
