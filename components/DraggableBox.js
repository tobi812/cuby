
import React, { useRef } from "react";
import { Animated, PanResponder, StyleSheet, View } from "react-native";

const DraggableBox = ({size}) => {
  const width = size[0];
  const height = size[1];
  const margin = 'margin' in this.props ? this.props.margin : 0;
  const x = this.props.body.position.x - width / 2;
  const y = this.props.body.position.y - height / 2; 
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([
      null,
      {
        dx: pan.x, // x,y are Animated.Value
        dy: pan.y,
      },
    ]),
    onPanResponderRelease: () => {
      Animated.spring(
        pan, // Auto-multiplexed
        { toValue: { x: 0, y: 0 } } // Back to zero
      ).start();
    },
  });

  return (
      <Animated.View
        {...panResponder.panHandlers}
        style={[pan.getLayout(), styles.box]}
      />
  );
};

const styles = StyleSheet.create({
  box: {
    backgroundColor: "#61dafb",
    width: 80,
    height: 80,
    borderRadius: 4,
  },
});
export default class Box extends Component {
    render() {
        const width = this.props.size[0];
        const height = this.props.size[1];
        const margin = 'margin' in this.props ? this.props.margin : 0;
        const x = this.props.body.position.x - width / 2;
        const y = this.props.body.position.y - height / 2;  
        
        const styles = StyleSheet.create({
            box: {
                position: "absolute",
                width: width,
                height: height,
                margin: margin,
                backgroundColor: this.props.color,
                left: x,
                top: y,
                borderRadius: 2,
            },
        }); 

        return (
            <View style={styles.box}/>
        )
    }
}
