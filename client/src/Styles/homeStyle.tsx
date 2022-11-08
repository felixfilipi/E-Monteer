"use strict"

import React from "react-native"

export default React.StyleSheet.create({

  searchSection: {
    paddingVertical: 30,
    paddingHorizontal: 40
  },

  categoryBtn: {
    flex:1, 
    margin: 3,
    marginVertical: 8,
    backgroundColor: '#b99504',
  },

  MyButton: {
    backgroundColor: '#b99504',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 7,
    flexDirection: 'row',
    margin: 3,
    marginTop: 8
  },

  ButtonText: {
    color: '#fff',
    fontFamily: 'normal'
  },

  CardStyle: {
    padding: 5,
    margin: 15,
    backgroundColor: '#fffde6',
    marginBottom: 100
  },

  ratingStyle: {
    paddingRight: 20
  },

  historyLabel: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 15,
    paddingTop: 20
  },

  dateLabel: {
    marginLeft: 5, 
    color:'#8d909a', 
    fontWeight:'bold'
  },

})
