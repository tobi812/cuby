import React, {Component} from "react";
import {StyleSheet, View} from "react-native";

export default class Ball extends Component {
    render() {
        const radius = this.props.radius
        let x = this.props.body.position.x
        let y = this.props.body.position.y

        const styles = StyleSheet.create({
            ball: {
                position: "absolute",
                backgroundColor: this.props.color,
                width: radius * 2,
                height: radius * 2,
                borderRadius: radius,
                left: x,
                top: y,
            },
        });

        return (
            <View style={styles.ball}/>
        )
    }
}

