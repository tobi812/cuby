import React from 'react';
import Constants from "../Constants";
import Box from "./Box";
import Matter from "matter-js";

const GameBoard = ({entities}) => {
    const columnCount = 8
    const totalFields = columnCount * columnCount
    const boxMargin = 2
    const boxSize = (Constants.maxWidth) / columnCount - boxMargin * 2
    const boardPositionX = boxSize / 2 + 5
    const boardPositionY = boxSize / 2 + 5

    const fieldTypes = [
        'black',
        'transparent',
    ];
    for (let i = 0; i < totalFields; i++) {
        let x = boardPositionX + (i % columnCount) * (boxSize + boxMargin);
        let y = boardPositionY + Math.floor(i / columnCount) * (boxSize + boxMargin)
        let randomType = fieldTypes[Math.floor(Math.random() * fieldTypes.length)];
        let box = Matter.Bodies.rectangle(x, y, boxSize, boxSize);

        entities['box_' + i] = {
            body: box,
            size: [boxSize, boxSize],
            color: randomType,
            renderer: Box
        }
    }

    return entities;
}

export default GameBoard

//(x - boardPositionX) / (boxSize + boxMargin)

//Math.floor((y - boardPositionY) / (boxSize + boxMargin))