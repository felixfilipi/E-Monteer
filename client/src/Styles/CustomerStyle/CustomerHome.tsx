"use strict"

import React from "react-native"

export default React.StyleSheet.create({

  buttonText: {
    color: '#fff',
    fontFamily: 'normal'
  },

  cardStyle: {
    padding: 5,
    margin: 15,
    backgroundColor: '#fffde6',
    marginBottom: 100
  },

  cardAction:{
    flexDirection:'row', 
    alignItems:'center', 
    justifyContent:'center',
    paddingTop:20
  },

  dateLabel: {
    marginLeft: 5, 
    color:'#8d909a', 
    fontWeight:'bold'
  },

  historyLabel: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 15,
    paddingTop: 20
  },

  loading: {
    flex:1, 
    justifyContent:'center', 
    alignItems:'center', 
    backgroundColor:'#242A2F'
  },

  myButton: {
    backgroundColor: '#b99504',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 7,
    flexDirection: 'row',
    margin: 3,
    marginTop: 8
  },
  
  ratingStyle: {
    paddingRight: 20
  },

  searchSection: {
    paddingVertical: 30,
    paddingHorizontal: 40
  },

})
