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

  orderBtn: {
    backgroundColor: '#b99504',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 7,
    flexDirection: 'row',
    margin: 3,
    marginTop: 8,
    justifyContent:'center'
  },
  
  orderText: {
    color: 'white',
    fontFamily: 'normal',
    fontWeight: '600',
    fontSize: 15,
    textAlign: 'center',
    paddingVertical:5
  },

  orderSection:{
    position:'absolute', 
    bottom:25, 
    left:0, 
    right:0
  },

  descText: {
    color: 'white',
    fontFamily: 'normal',
    fontWeight: '600',
    fontSize: 20,
    textAlign:'center',
    marginBottom: 10,
    marginLeft: 10
  },

  importantText: {
    color: '#de0004',
    fontFamily: 'normal',
    fontWeight: '600',
    fontSize: 13,
    marginBottom: 10,
    marginLeft: 5
  },

  ButtonText: {
    color: 'black',
    fontFamily: 'normal',
    fontWeight: '600',
    fontSize: 20,
    marginTop: 10
  },
  
  MultipleButtonText: {
    color: '#fff',
    marginLeft:5,
    fontFamily: 'normal'
  },

  categoryBtn: {
    flex:1, 
    margin: 3,
    marginVertical: 8,
    backgroundColor: '#b99504',
  },

  vehicleBtn: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 7,
    flexDirection: 'column',
    margin: 3,
    marginTop: 8
  },

  bottomNavLayout: {
    backgroundColor: '#b99504',
    position: 'absolute', 
    bottom:0, 
    left:0, 
    right:0,
    alignItems:'stretch',
  },

  bottomNavBtn: {
    alignItems:'center',
    flex: 1,
    paddingVertical: 5
  },

  bottomNavText: {
    fontWeight: '600'
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

})
