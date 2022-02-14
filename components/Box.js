import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Box extends Component {
    render() {
        const width = this.props.size[0];
        const height = this.props.size[1];
        const margin = 'margin' in this.props ? this.props.margin : 0;
        let x = this.props.body.position.x - width / 2;
        let y = this.props.body.position.y - height / 2;  
        
        const styles = StyleSheet.create({
            box: {
                position: "absolute",
                width: width,
                height: height,
                margin: margin,
                backgroundColor: this.props.color,
                left: x,
                top: y,
                borderRadius: 2,
            },
        }); 

        return (
            <View style={styles.box}/>
        )
    }
}
