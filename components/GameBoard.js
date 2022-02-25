import React from 'react';
import Constants from "../Constants";
import Box from "./Box";
import Block from "./Block";
import Matter from "matter-js";
import {findEntity, getColumnNeighbor, getRowNeighbor} from "./GameLogic";

const GameBoard = ({entities, world}) => {
    const columnCount = Constants.columnCount
    const totalFields = Constants.totalFields
    const boxSize = Constants.boxSize
    const boardPositionX = Constants.boardPositionX
    const boardPositionY = Constants.boardPositionY
    const fieldSize = Constants.fieldSize

    const fieldTypes = [
        'black',
        'empty',
        'empty',
        'empty',
    ];

    const colors = [
        'black',
        'purple',
        'pink',
        'grey',
    ]

    function createBox(i, x, y) {
        let box = Matter.Bodies.rectangle(x, y, boxSize, boxSize, {isStatic: true});

        Matter.World.add(world, box)

        let boxId = 'box_' + i
        entities[boxId] = {
            boxId: boxId,
            body: box,
            size: [boxSize, boxSize],
            color: 'black',
            velocityX: 0,
            velocityY: 0,
            distanceX: fieldSize,
            distanceY: fieldSize,
            renderer: Box
        }
    }

    function createBlock(x, y, blockId, isHorizontal) {
        let width = isHorizontal ? boxSize * 2 + Constants.boxMargin : boxSize
        let height = isHorizontal ? boxSize : boxSize * 2 + Constants.boxMargin

        let block = Matter.Bodies.rectangle(x + width / 2, y + height / 2, width, height, {isStatic: true})
        Matter.World.add(world, block)

        let color1 = colors[Math.floor(Math.random() * colors.length)]
        let color2 = colors[Math.floor(Math.random() * colors.length)]

        return {
            blockId: blockId,
            body: block,
            size: [width, height],
            colors: [color1, color2],
            velocityX: 0,
            velocityY: 0,
            distanceX: fieldSize,
            distanceY: fieldSize,
            isHorizontal: isHorizontal,
            renderer: Block
        }
    }

    for (let i = 0; i < totalFields; i++) {
    // for (let i = 0; i < 5; i++) {
        let randomType = fieldTypes[Math.floor(Math.random() * fieldTypes.length)];

        if (randomType === 'empty') {
            continue
        }

        let isHorizontal = Math.random() < 0.5

        let x = boardPositionX + (i % columnCount) * fieldSize
        let y = boardPositionY + Math.floor(i / columnCount) * fieldSize

        // if (isHorizontal) {
        //     x += (fieldSize / 2)
        //     y -= fieldSize / 2
        // }

        // console.log(i)
        if (findEntity(x, y, entities)) {
            continue
        }

        if (isHorizontal) {
            if (getRowNeighbor(x, y, entities, 1) || (i % columnCount) === (columnCount - 1)) {
                continue
            }
        } else {
            if (getColumnNeighbor(x, y, entities, 1) || i >= (totalFields - columnCount)) {
                continue
            }
        }

        let blockId = 'block_' + i

        entities[blockId] = createBlock(x, y, blockId, isHorizontal)
    }

    return entities;
}

export default GameBoard
