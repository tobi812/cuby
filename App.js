import React, { Component } from 'react';
import { Pressable, Dimensions, StyleSheet, Text, View, StatusBar } from 'react-native';
import { GameEngine, dispatch } from "react-native-game-engine";
import Box from './components/Box';
import Matter from "matter-js";
import Constants from "./Constants";
import BoxMovement from "./components/BoxMovement";
import GameBoard from "./components/GameBoard";

const Physics = (entities, { time }) => {
  let engine = entities['physics'].engine;
  Matter.Engine.update(engine, time.delta);

/*  touches.filter(t => t.type === "press").forEach(t => {
    Matter.Body.applyForce( bird, bird.position, {x: 0.00, y: -0.10});
  });*/



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
    let box = Matter.Bodies.rectangle(this.maxWidth / 2, this.maxHeight / 2, this.boxSize, this.boxSize);
    let floor = Matter.Bodies.rectangle(this.maxWidth / 2, this.maxHeight, this.maxWidth, this.floorHeight, { isStatic: true });
    let leftWall = Matter.Bodies.rectangle(-1, this.maxHeight / 2, 1, this.maxHeight, { isStatic: true });
    let rightWall = Matter.Bodies.rectangle(this.maxWidth + 1, this.maxHeight / 2, 1, this.maxHeight, { isStatic: true });
    let roof = Matter.Bodies.rectangle(this.maxWidth / 2, 0, this.maxWidth, 1, {isStatic: true} );

    engine.gravity.y = 0
    Matter.World.add(world, [box, floor, leftWall, rightWall, roof]);
    
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
      leftWall: {
        body: leftWall,
        size: [1, this.maxHeight],
        color: "white",
        renderer: Box
      },
      rightWall: {
        body: rightWall,
        size: [1, this.maxHeight],
        color: "white",
        renderer: Box
      },
      roof: {
        body: roof,
        size: [this.maxWidth, 1],
        color: "white",
        renderer: Box
      },
      round: {
        number: 0,
        selectedBoxId: null
      }
    }

    entities = GameBoard({entities})

    return entities
  }
  
  createBox = (entities, {touches, screen}) => {
    let world = entities["physics"].world;
    let boxSize = 25;
  
    /*
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
    */
  
    if (boxIds < 10) {
      const timeout = setTimeout(() => {
        let x = Math.floor(Math.random() * this.maxWidth) + 1;
        let y = Math.floor(Math.random() * this.maxHeight) + 1;
        let newBox = Matter.Bodies.rectangle(x, y, boxSize, boxSize)
        Matter.World.add(world, [newBox]);
        entities[++boxIds] = {
          body: newBox,
          size: [boxSize, boxSize],
          color: 'black',
          renderer: Box
        }
      }, 1000)
    }
    return entities;
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
      <GameEngine
        style={styles.container}
        systems={[Physics, BoxMovement]}
        entities={this.entities}>
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
