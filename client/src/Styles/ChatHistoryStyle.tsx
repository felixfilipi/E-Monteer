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
    padding: 5,
    paddingTop: 10,
    borderRadius: 5
  },

  handleContainer: {
    flexDirection:'column', 
    alignItems:'center',
  },

  listContainer: {
    backgroundColor:'#f1f1f1', 
    flexDirection:'row',
    padding:10,
    margin:10,
    paddingVertical: 10,
    borderRadius: 20,
  },

  titleContainer: {
    paddingLeft:15,
    marginTop: 30,
  },

  titleText : {
    textAlign:'left',
    color: 'white',
    fontSize:25,
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
