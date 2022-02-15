import React, {Component} from "react";
import {StyleSheet, Text, View} from "react-native";
import Constants from "../Constants";

export default class GameBar extends Component {
    render() {
        let roundMoves = this.props.round.moves
        let roundNumber = this.props.round.number

        return (
            <View style={styles.gameBar}>
                <Text style={styles.score}>Moves: {roundMoves} / {Constants.movesPerRound}</Text>
                <Text style={styles.score}>Round: {roundNumber} / {Constants.totalRounds}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    gameBar: {
        position: "absolute",
        left: 0,
        top: 0,
    },
    score: {

    }
});
