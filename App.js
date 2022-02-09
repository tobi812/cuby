import React, { useEffect, useState } from 'react';
import { Pressable, Dimensions, StyleSheet, Text, View } from 'react-native';
import { GameEngine, dispatch } from "react-native-game-engine";
import Cube from './components/Cube';
import Matter from "matter-js";
import Constants from './components/Constants';
import { GameLoop } from "./systems";

export default class App extends Component {

  constructor(props) {
    super(props);

    this.boardSize = Constants.GRID_SIZE * Constants.CELL_SIZE;
    this.engine = null;
    this.cubeLeft = Constants.MAX_WIDTH / 2;
    this.gravity = 3;
    this.gameTimerId;

    this.state = {
      running: true,
      cubeBottom: Constants.MAX_HEIGHT / 2,
    }
  }

  onEvent = (e) => {
    if (e.type === "game-over"){
        this.setState({
            running: false
        });
        Alert.alert("Game Over");
    }
  } 
  
  render() {
    return (
        <View style={styles.container}>
            <GameEngine
                ref={(ref) => { this.engine = ref; }}
                style={[{ width: this.boardSize, height: this.boardSize, backgroundColor: '#ffffff', flex: null }]}
                systems={[ GameLoop ]}
                entities={{
                    head: { position: [0,  0], xspeed: 1, yspeed: 0, nextMove: 10, updateFrequency: 10, size: 20, renderer: <Head />},
                    food: { position: [this.randomBetween(0, Constants.GRID_SIZE - 1), this.randomBetween(0, Constants.GRID_SIZE - 1)], size: 20, renderer: <Food />},
                    tail: { size: 20, elements: [], renderer: <Tail /> }
                }}
                running={this.state.running}
                onEvent={this.onEvent}>

                <StatusBar hidden={true} />

            </GameEngine>

            <Button title="New Game" onPress={this.reset} />

            <View style={styles.controls}>
                <View style={styles.controlRow}>
                    <TouchableOpacity onPress={() => { this.engine.dispatch({ type: "move-up" })} }>
                        <View style={styles.control} />
                    </TouchableOpacity>
                </View>
                <View style={styles.controlRow}>
                    <TouchableOpacity onPress={() => { this.engine.dispatch({ type: "move-left" })} }>
                        <View style={styles.control} />
                    </TouchableOpacity>
                    <View style={[styles.control, { backgroundColor: null}]} />
                    <TouchableOpacity onPress={() => { this.engine.dispatch({ type: "move-right" })}}>
                        <View style={styles.control} />
                    </TouchableOpacity>
                </View>
                <View style={styles.controlRow}>
                    <TouchableOpacity onPress={() => { this.engine.dispatch({ type: "move-down" })} }>
                        <View style={styles.control} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
/*
  useEffect(() => {
      if (cubeBottom > 0 && pressedButton == true) {
        gameTimerId = setInterval(() => {
          setCubeBottom(cubeBottom => cubeBottom - gravity)
        }, 30)
      }

      return () => {
        clearInterval(gameTimerId)
      }
  }, [cubeBottom])
*/

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
