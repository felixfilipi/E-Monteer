"use strict"

import React from "react-native"

export default React.StyleSheet.create({

  descriptionStyle: {
    color: '#8b8988',
    fontFamily: 'normal',
    fontWeight: '200',
    fontSize: 15,
    marginBottom: 10,
    marginLeft: 10
  },

  flatListStyle: {
    paddingVertical: 5,
    marginLeft:10,
  },

  handleContainer: {
    flexDirection:'column', 
    alignItems:'center',
  },

  listContainer: {
    backgroundColor:'#f1f1f1', 
    flexDirection:'row',
    margin:10,
    borderRadius: 20,
  },

  titleText : {
    color: 'white',
    fontSize:30,
    marginTop: 20,
    fontWeight: '600',
  },

  titleStyle: {
    color: '#b99504',
    fontFamily: 'normal',
    fontWeight: '700',
    fontSize: 20,
    marginBottom: 10,
    marginLeft: 10
  },
})
