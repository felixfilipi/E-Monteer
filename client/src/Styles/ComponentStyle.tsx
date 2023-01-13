"use strict"

import React from "react-native"

export default React.StyleSheet.create({

  avatar: {
    marginRight: 25,
  },

  backBtn: {
    paddingLeft: 10,
    justifyContent:'center'
  },

  buttonText: {
    color: 'black',
    fontFamily: 'normal',
    fontWeight: '600',
    fontSize: 20,
    marginTop: 10
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

  chatBarLayout: {
    flexDirection:'row',
    flex:4
  },

  categoryBtn: {
    flex:1, 
    margin: 3,
    marginVertical: 8,
    backgroundColor: '#b99504',
  },

  drawerMask: {
    zIndex:3,
    position:'absolute',
    bottom:0, 
    top:0, 
    left:0, 
    right:0, 
    backgroundColor:'rgba(46, 44, 45, 0.8)',
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

  floatingButtonLayout:{
    backgroundColor:'rgba(255, 255, 255, 0.7)', 
    borderRadius:30, 
    padding:5, 
    width:40
  },

  importantText: {
    color: '#de0004',
    fontFamily: 'normal',
    fontWeight: '600',
    fontSize: 13,
    marginBottom: 10,
    marginLeft: 5
  },

  
  multipleButtonText: {
    color: '#fff',
    marginLeft:5,
    fontFamily: 'normal'
  },

  modalButton:{
    padding:15, 
    borderRadius:50, 
    backgroundColor:'#b99504'
  },

  modalButtonLayout:{
    marginTop:20, 
    flexDirection:'row', 
    justifyContent:'space-evenly'
  },

  modalLayout: {
    flex:1, 
    justifyContent:'center', 
    alignItems:'center'
  },

  modalMaskExcept: {
    backgroundColor:'#fefefe', 
    padding:20, 
    borderRadius:20, 
    zIndex:1
  },

  modalMask: {
    position:'absolute', 
    top:0, 
    bottom:0, 
    left:0, 
    right:0, 
    backgroundColor:'rgba(71, 76, 78, 0.8)'
  },

  
  // location section

  modalMaskLocation:{
    flex:1, 
    backgroundColor:'rgba(71, 76, 78, 0.8)', 
    marginBottom:-30
  },
  modalMaskLayoutLocation:{
    flex:1, 
    justifyContent:'center',
  },
  modalLayoutLocation:{
    flex:1, 
    backgroundColor:'#fefefe', 
    borderRadius:20
  },
  modalCloseLocation:{
    alignItems:'flex-end', 
    margin:10
  },
  modalTitleLocation:{
    marginBottom:0, 
    paddingHorizontal:15,
    paddingBottom:10,
    textAlign:'left'
  },
  modalMetaContainerLocation:{
    flex:1, 
    padding:15
  },
  modalTotalLayoutLocation:{
    flexDirection:'row',
    justifyContent:'center'
  },
  modalButtonLayoutLocation:{
    flex:1, 
    flexDirection:'row'
  },
  modalButtonTextLocation:{
    fontWeight:'700'
  },

  logo: {
    height: 75,
    width: 150,
    marginRight: 'auto',
    alignItems: 'flex-start',
    marginLeft: 10
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
  
  topBar: {
    backgroundColor: '#242A2F',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 3,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex:5
  },

  topItem: {
    width: '50%',
    alignItems: 'flex-end',
    zIndex:5
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
})
