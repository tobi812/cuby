import React, {Component} from "react";
import {StyleSheet, Text, View} from "react-native";

export default class Ball extends Component {
    render() {
        const {body} = this.props;
        const x = body.position.x - body.circleRadius;
        const y = body.position.y - body.circleRadius;

        const styles = StyleSheet.create({
            ball: {
                position: "absolute",
                backgroundColor: this.props.color,
                width: body.circleRadius * 2,
                height: body.circleRadius * 2,
                borderRadius: body.circleRadius,
                left: x,
                top: y,
            },
            text: {
                fontSize: 8
            }
        });

        return (
            <View style={styles.ball}>
                <Text style={styles.text}>x:{x}</Text>
                <Text style={styles.text}>y:{y}</Text>
            </View>
        )
    }
}

