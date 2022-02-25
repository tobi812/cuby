import React, {Component} from "react";
import {StyleSheet, Text, View} from "react-native";
import Constants from "../Constants";

export default class Block extends Component {
    render() {
        const width = this.props.size[0];
        const height = this.props.size[1];
        let x = this.props.body.position.x - width / 2;
        let y = this.props.body.position.y - height / 2;
        let boxSize = width > height ? width / 2 : height / 2
        let color1 = this.props.colors !== undefined ? this.props.colors[0] : 'black'
        let color2 = this.props.colors !== undefined ? this.props.colors[1] : 'pink'

        // let x = this.props.body.position.x
        // let y = this.props.body.position.y

        const styles = StyleSheet.create({
            block: {
                position: "absolute",
                width: width,
                height: height,
                backgroundColor: 'black',
                left: x,
                top: y,
                borderColor: 'black',
            },
            box1: {
                position: "absolute",
                width: boxSize,
                height: boxSize,
                backgroundColor: color1,
                left: 0,
                top: 0,
                borderRadius: 2,
            },
            box2: {
                position: "absolute",
                width: boxSize,
                height: boxSize,
                backgroundColor: color2,
                left: this.props.isHorizontal ? Constants.fieldSize : 0,
                top: this.props.isHorizontal ? 0 : Constants.fieldSize,
                borderRadius: 2,
            },
            text: {
                color: "lightblue",
                fontSize: 8
            }
        });

        return (
            <View style={styles.block}>
                <View style={styles.box1}/>
                <View style={styles.box2}/>
            </View>
        )
    }
}