"use strict"

import React from "react-native";

export default React.StyleSheet.create({
  cardDetail:{
    marginBottom:15, 
    marginHorizontal:15,
    borderBottomStartRadius:10,
    borderBottomEndRadius:10,
    backgroundColor: '#3a4447'
  },
  contentContainer: {
    marginBottom:65, 
    marginTop:5,
    alignItems: 'center'
  },

  costListDetail: {
    backgroundColor:'#ffffff', 
    justifyContent: 'center',
    alignContent: 'center',
    margin:10,
    padding:20,
    borderRadius: 20,
    width: '90%',
  },

  customerDetail: {
    backgroundColor:'#ffffff', 
    flexDirection:'column',
    justifyContent: 'center',
    alignContent: 'center',
    margin:10,
    padding:20,
    borderRadius: 20,
    width: 'auto'
  },

  detailText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
    textAlign: 'right'
  },
  
  iconImage : {
    width: 50,
    height: 50,
  },

  listContainer:{
    flexDirection:'row', 
    padding: 15, 
    flex: 4, 
    alignItems:'center'
  },
  listLayout:{
    flexDirection: 'column', 
    flex:3, 
    paddingHorizontal:5
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
      
  modalMask:{
    flex:1, 
    backgroundColor:'rgba(71, 76, 78, 0.8)', 
    marginBottom:-30
  },

  modalMaskLayout:{
    flex:1, 
    justifyContent:'center',
  },
  modalLayout:{
    flex:1, 
    backgroundColor:'#fefefe', 
    borderRadius:20
  },
  modalClose:{
    alignItems:'flex-end', 
    margin:10
  },
  modalTitle:{
    marginBottom:0,
    marginTop:10,
    padding:15, 
    textAlign:'left'
  },
  modalListLayout:{
    flex:7, 
    margin:15, 
    borderWidth:0.4, 
    borderColor:'#9ca8ac', 
    borderRadius:20
  },
  modalMetaContainer:{
    flex:1, 
    padding:15
  },
  modalTotalLayout:{
    flexDirection:'row',
    flex:2
  },
  modalButtonLayout:{
    flex:2, 
    flexDirection:'row'
  },
  modalButtonText:{
    fontWeight:'700'
  },
})
