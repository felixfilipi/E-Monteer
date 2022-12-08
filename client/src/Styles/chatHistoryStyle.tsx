"use strict"

import React from "react-native"

export default React.StyleSheet.create({

  titleText : {
    color: 'white',
    fontSize:25,
    marginTop: 20,
    fontWeight: '600',
    paddingLeft:30,
    textAlign:'left'
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
