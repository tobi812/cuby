import React, {Component} from "react";
import {StyleSheet, View} from "react-native";

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
                borderRadius: body.circleRadius
                , 
                left: x,
                top: y,
            },
        });

        return (
            <View style={styles.ball}/>
        )
    }
}

