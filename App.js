import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Cube from './components/Cube';
import Matter from "matter-js";

export default function App() {
  const screenWidth = Dimensions.get('screen').width
  const screenHeight = Dimensions.get('screen').height

  const cubeLeft = screenWidth / 2
  const [cubeBottom, setCubeBottom] = useState(screenHeight / 2)
  const gravity = 3 
  let gameTimerId

  useEffect(() => {
      if (cubeBottom > 0) {
        gameTimerId = setInterval(() => {
          setCubeBottom(cubeBottom => cubeBottom - gravity)
        }, 30)
      }

      return () => {
        clearInterval(gameTimerId)
      }
  }, [cubeBottom])

  return (
    <View style={styles.container}>
      <Cube
        cubeBottom={cubeBottom}
        cubeLeft={cubeLeft}
      />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
