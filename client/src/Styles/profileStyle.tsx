"use strict"

import React from "react-native";

export default React.StyleSheet.create({
    flexVertical: {
        flexDirection: "column",
        marginTop: 10
    },

    flexHorizontal: {
        flexDirection: "row",
        marginTop: 25,
        marginBottom: 8,
    },

    icon: {
        marginTop: 1,
    },

    textInp: {
        backgroundColor: "#434647",
        color: "#fff",
        height: 40,
        fontSize: 15,
        paddingHorizontal: 15,
        borderRadius: 5,
    },

    button: {
        backgroundColor: "#b99504",
        marginVertical: 50,
    },

    buttonText: {
        textAlign: 'center',
        marginTop: 8,
        fontSize: 16,
        fontWeight: 'bold',
        color: "#fff",
    },

    title: {
      color:'white',
      marginLeft:5,
      textAlignVertical:'center'
    },

    avatar: {
      alignItems:'center', 
      marginTop:10
    },

    photoLabel: {
      color:'white',
      marginTop:15,
      fontSize:15,
      fontWeight:'500',
      textAlignVertical:'center'
    },


})
