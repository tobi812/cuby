import React, { Component } from 'react';
import { StyleSheet, Alert, StatusBar } from 'react-native';
import { GameEngine } from "react-native-game-engine";
import Box from './components/Box';
import Matter from "matter-js";
import Constants from "./Constants";
import BoxMovement from "./components/BoxMovement";
import GameBoard from "./components/GameBoard";
import { newRound } from "./components/GameLogic";
import GameBar from "./components/GameBar";
import BallMovement from "./components/BallMovement";

const Physics = (entities, { time }) => {
  let engine = entities['physics'].engine;
  Matter.Engine.update(engine, time.delta);

  return entities;
};

let boxIds = 0;
const CreateBox = (entities, {touches, screen}) => {
  let world = entities["physics"].world;
  let boxSize = 25;

  touches.filter(touch => touch.type === "press").forEach(touch => {
    let newBox = Matter.Bodies.rectangle(touch.event.pageX, touch.event.pageY, boxSize, boxSize)
    Matter.World.add(world, [newBox]);
    entities[++boxIds] = {
        body: newBox,
        size: [boxSize, boxSize],
        color: 'black',
        renderer: Box
    }
  });

  return entities;
}

export default class App extends Component {
  constructor(props) {
    super(props);

    this.engine = null;
    this.maxWidth = Constants.maxWidth;
    this.maxHeight = Constants.maxHeight;

    this.boxSize = 50; //Math.trunc(Math.max(Constants.MAX_WIDTH, Constants.MAX_HEIGHT) * 0.075);
    this.floorHeight = 10;

    this.state = {
      running: true,
    }

    this.entities = this.setupWorld();
  }

  setupWorld = () => {
    let engine = Matter.Engine.create({ enableSleeping: false });
    let world = engine.world;
    let floor = Matter.Bodies.rectangle(this.maxWidth / 2, this.maxHeight, this.maxWidth, this.floorHeight, {
      isStatic: true,
      label: 'floor'
    });

    Matter.World.add(world, [floor]);
    Matter.Events.on(engine, 'collisionStart', this.ballDrop)

    let entities = {
      physics: {
        engine: engine,
        world: world
      },
      floor: {
        body: floor,
        size: [this.maxWidth, this.floorHeight],
        color: "green",
        renderer: Box
      },
      round: {
        number: 0,
        selectedBoxId: null
      },
      gamebar: {
        round: {
          number: 0,
          moves: 0,
          selectedBoxId: null,
          activeBallIds: []
        },
        renderer: GameBar
      }
    }

    entities = GameBoard({entities, world})
    //newRound(entities)

    return entities
  }

  onEvent = (event) => {
    if (event.type !== undefined) {
      event = event.type
    }

    switch (event) {
      case 'new-round':
        this.entities = newRound(this.entities)
        break
      case 'game-over':
        this.setState({
          running: false
        });
        Alert.alert("Game Over");
        break
    }
  }

  ballDrop = (event) => {
    var pairs = event.pairs
    for (var i = 0; i < pairs.length; i++) {
      var pair = pairs[i];
      if (pair.bodyA.label === 'floor' || pair.bodyB.label === 'floor') {
        this.engine.dispatch('new-round')
      }
    }
  }

  render() {
    return (
      <GameEngine
        ref={(ref) => { this.engine = ref; }}
        style={styles.container}
        systems={[Physics, BoxMovement, BallMovement]}
        entities={this.entities}
        onEvent={this.onEvent}>
         <StatusBar hidden={true} />
      </GameEngine>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
