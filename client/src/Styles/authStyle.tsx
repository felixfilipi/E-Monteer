"use strict"

import React from "react-native";

export default React.StyleSheet.create({
    logo: {
        width: 300,
        height: 200,
        marginTop: 40,
        marginLeft: 10,
    },

    logoVector: {
        width: 280,
        height: 380,
        marginTop: 40,
        marginLeft: 10,
    },

    flexVertical: {
        flexDirection: "column",
        marginTop: 35
    },

    flexHorizontal: {
        flexDirection: "row",
        marginTop: 25
    },

    icon: {
        marginTop: 1,
        flex: 1,
    },

    textInp: {
        backgroundColor: "#434647",
        color: "#fff",
        height: 40,
        flex: 3,
        fontSize: 15,
        paddingHorizontal: 15,
        borderRadius: 5,
    },

    button: {
        backgroundColor: "#b99504",
        marginTop: 50,
    },

    buttonText: {
        textAlign: 'center',
        marginTop: 8,
        fontSize: 16,
        fontWeight: 'bold',
        color: "#fff",
    },

    signText: {
        marginTop: 15,
        textAlign: "center",
        color: "white"
    }
})
