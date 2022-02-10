import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Box extends Component {
    render() {
        const width = this.props.size[0];
        const height = this.props.size[1];
        const x = this.props.body.position.x - width / 2;
        const y = this.props.body.position.y - height / 2;  
        
        const styles = StyleSheet.create({
            box: {
                position: "absolute",
                width: width,
                height: height,
                backgroundColor: this.props.color,
                left: x,
                top: y
            },
        }); 

        return (
            <View style={styles.box}></View>
        )
    }
}
