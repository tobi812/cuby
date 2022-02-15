import React from 'react';
import Constants from "../Constants";
import Box from "./Box";
import Matter from "matter-js";

const GameBoard = ({entities, world}) => {
    const columnCount = Constants.columnCount
    const totalFields = Constants.totalFields
    const boxMargin = Constants.boxMargin
    const boxSize = Constants.boxSize
    const boardPositionX = Constants.boardPositionX
    const boardPositionY = Constants.boardPositionY

    const fieldTypes = [
        'black',
        'empty',
    ];
   
    for (let i = 0; i < totalFields; i++) {
        let x = boardPositionX + (i % columnCount) * (boxSize + boxMargin);
        let y = boardPositionY + Math.floor(i / columnCount) * (boxSize + boxMargin)
        let randomType = fieldTypes[Math.floor(Math.random() * fieldTypes.length)];
        let box = Matter.Bodies.rectangle(x, y, boxSize, boxSize, { isStatic: true });

        if (randomType === 'empty') {
            continue
        }

        Matter.World.add(world, box)

        let boxId = 'box_' + i
        entities[boxId] = {
            boxId: boxId,
            body: box,
            size: [boxSize, boxSize],
            color: randomType,
            velocityX: 0,
            velocityY: 0,
            distanceX: boxSize + boxMargin,
            distanceY: boxSize + boxMargin,
            renderer: Box
        }
    }

    return entities;
}

export default GameBoard
