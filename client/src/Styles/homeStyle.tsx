"use strict"

import React from "react-native"

export default React.StyleSheet.create({
  topBar: {
    backgroundColor: '#242A2F',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 3
  },

  topItem: {
    width: '50%',
    alignItems: 'flex-end'
  },

  avatar: {
    marginRight: 25,
  },

  logo: {
    height: 75,
    width: 150,
    marginRight: 'auto',
    alignItems: 'flex-start',
    marginLeft: 10
  },

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
    backgroundColor: '#fffde6'
  },

  ratingStyle: {
    paddingRight: 20
  }
})
