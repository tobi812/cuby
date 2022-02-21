import React, {Component} from "react";
import {StyleSheet, Text, View} from "react-native";

export default class Block extends Component {
    render() {
        const width = this.props.size[0];
        const height = this.props.size[1];
        let x = this.props.body.position.x - width / 2;
        let y = this.props.body.position.y - height / 2;

        const styles = StyleSheet.create({
            box: {
                position: "absolute",
                width: width,
                height: height,
                backgroundColor: this.props.color,
                left: x,
                top: y,
                borderRadius: 2,
            },
            text: {
                color: "lightblue",
                fontSize: 8
            }
        });

        return (
            <View style={styles.box}>
                <Text style={styles.text}>x:{x}</Text>
                <Text style={styles.text}>y:{y}</Text>
            </View>
        )
    }
}