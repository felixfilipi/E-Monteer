"use strict"

import React from "react-native"

export default React.StyleSheet.create({
  topBar: {
    backgroundColor: '#242A2F',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 3,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0
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

  drawerContainer: {
    backgroundColor:'white',
    width:243,
    marginTop: 82,
    position:'absolute',
    zIndex: 5,
    display:'flex',
    right:0,
    borderBottomLeftRadius:10,
    borderColor:'#b99504',
    borderBottomWidth:2,
    borderLeftWidth:2
  },

})
