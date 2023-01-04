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

  contentContainer: {
    flex:1, 
    marginBottom:65, 
    marginTop:5,
  },

  currentOrderList: {
    backgroundColor:'#f1f1f1', 
    flexDirection:'row',
    margin:10,
    borderRadius: 20,
  },

  dateLabel: {
    marginLeft: 5, 
    color:'#8d909a', 
    fontWeight:'bold'
  },

  drawerContainer: {
    backgroundColor:'white',
    width:243,
    position:'absolute',
    zIndex: 5,
    display:'flex',
    right:0,
    borderRadius:10,
    borderColor:'#b99504',
    borderWidth:2
  },

  flatListStyle: {
    marginLeft: 10,
    padding: 5,
    paddingTop: 10,
    // borderRadius: 5
  },

  handleContainer: {
    flexDirection:'column', 
    alignItems:'center',
  },

  textLabel: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 15,
    paddingTop: 20
  },

  titleStyle: {
    color: '#b99504',
    fontFamily: 'normal',
    fontWeight: '700',
    fontSize: 20,
    marginBottom: 10,
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
  
  ratingStyle: {
    paddingRight: 20
  },

  roundButton1: {
    width: 100,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: 'orange',
  },

  statusImage: {
    width: 50,
    height: 50,
  },

  searchSection: {
    paddingVertical: 30,
    paddingHorizontal: 40
  },

})