import React from "react";
import { StyleSheet, Text, View } from 'react-native';

const Cube = ({cubeLeft, cubeBottom}) => {
    const cubeWidth = 50
    const cubeHeight =  50
   
    const styles = StyleSheet.create({
        cube: {
        position: "absolute",
        width: cubeWidth,
        height: cubeHeight,
        backgroundColor: 'green',
        left: cubeLeft - (cubeWidth / 2),
        bottom: cubeBottom - (cubeHeight / 2)
        },
    }); 

    return (
        <View style={styles.cube}></View>
        
    )
}



export default Cube