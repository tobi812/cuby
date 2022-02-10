import React, { Component } from 'react';
import { Pressable, Dimensions, StyleSheet, Text, View, StatusBar } from 'react-native';
import { GameEngine, dispatch } from "react-native-game-engine";
import Box from './components/Box';
import Matter from "matter-js";

const Physics = (entities, { time }) => {
  let engine = entities["physics"].engine;
	Matter.Engine.update(engine, time.delta);
	
  return entities;
};

export default class App extends Component {

  constructor(props) {
    super(props);

    this.engine = null;
    this.maxWidth = Dimensions.get("screen").width;
    this.maxHeight = Dimensions.get("screen").width;


    this.boxSize = 50; //Math.trunc(Math.max(Constants.MAX_WIDTH, Constants.MAX_HEIGHT) * 0.075);
    this.floorHeight = 5;

    this.state = {
      running: true,
    }

    this.entities = this.setupWorld();
  }

  setupWorld = () => {
    let engine = Matter.Engine.create({ enableSleeping: false });
    let world = engine.world;
    let box = Matter.Bodies.rectangle(this.maxWidth / 2, this.maxHeight / 2, this.boxSize, this.boxSize);
    let floor = Matter.Bodies.rectangle(this.maxWidth / 2, this.maxHeight - this.floorHeight, this.maxWidth, this.floorHeight, { isStatic: true })
    
    Matter.World.add(world, [box, floor]);
    
    return {
      physics: { engine: engine, world: world },
      box: { body: box, size: [this.boxSize, this.boxSize], color: 'black', renderer: Box},
      floor: { body: floor, size: [this.maxWidth, this.floorHeight], color: 'green', renderer: Box},
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
      <GameEngine 
        style={styles.container}
        systems={[Physics]} 
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


