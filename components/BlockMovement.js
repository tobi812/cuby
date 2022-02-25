import Constants from "../Constants";
import {
    getBlockNeighbor,
    hasReachedMinMaxWidth,
    hasReachedMinMaxHeight,
    findEntity,
    isBlock,
} from "./GameLogic";
import Matter from "matter-js";
import Box from "./Box";

const BlockMovement = (entities, {touches, dispatch, screen, layout, time}) => {
    const nextMove = (entities) => {
        let selectedBlock = entities[entities.gamebar.round.selectedEntityId]
        selectedBlock.velocityX = 0
        selectedBlock.velocityY = 0
        selectedBlock.distanceX = Constants.fieldSize
        selectedBlock.distanceY = Constants.fieldSize
        selectedBlock.color = 'black'

        entities.gamebar.round.moves += 1
        entities.gamebar.round.selectedEntityId = null
        Object.values(entities).forEach(entity => {
            if (entity.blockId !== undefined) {
                entity.color = 'black'
            }
        })

        if (entities.gamebar.round.moves >= Constants.movesPerRound) {
            dispatch('new-round')
        }
    }

    function setVelocityX(block, entities, deltaX) {
        let columnNeighbor = getBlockNeighbor(block, entities, deltaX)
        if (!columnNeighbor) {
            block.velocityX = 10 * Math.sign(deltaX)
        } else {
            columnNeighbor.color = 'red'
            entities.gamebar.round.selectedEntityId = null
        }
    }

    function setVelocityY(block, entities, deltaY) {
        let rowNeighbor = getBlockNeighbor(block, entities, 0, deltaY)
        if (!rowNeighbor) {
            block.velocityY = 10 * Math.sign(deltaY)
        } else {
            rowNeighbor.color = 'orange'
            entities.gamebar.round.selectedEntityId = null
        }
    }

    function turnHorizontalToVertical(block, x, y, deltaY, entities) {
        let blockMiddleX = block.body.position.x
        let signX = x < blockMiddleX ? 1 : -1
        let signY = Math.sign(deltaY)

        let turnNeighbor = findEntity(x, y + signY * Constants.fieldSize, entities, true)
        let diagonalNeighbor = findEntity(x + signX * Constants.fieldSize, y + signY * Constants.fieldSize, entities, true)

        if (turnNeighbor !== undefined || diagonalNeighbor !== undefined) {
            return
        }

        if (x < blockMiddleX) {
            block.body.position.x += Constants.fieldSize / 2
            block.body.position.y += Constants.fieldSize / 2 * signY

            if (signY > 0) {
                block.colors = [
                    block.colors[1],
                    block.colors[0],
                ]
            }
        } else {
            block.body.position.x -= Constants.fieldSize / 2
            block.body.position.y += Constants.fieldSize / 2 * signY

            if (signY < 0) {
                block.colors = [
                    block.colors[1],
                    block.colors[0],
                ]
            }
        }

        block.size = [
            block.size[1],
            block.size[0],
        ]
        block.isHorizontal = false
    }

    function turnVerticalToHorizontal(block, x, y, deltaX, entities) {
        let blockMiddleY = block.body.position.y
        let signX = Math.sign(deltaX)
        let signY = y < blockMiddleY ? 1 : -1

        let turnNeighbor = findEntity(x + signX * Constants.fieldSize, y, entities, true)
        let diagonalNeighbor = findEntity(x + signX * Constants.fieldSize, y + signY * Constants.fieldSize, entities, true)

        if (turnNeighbor !== undefined || diagonalNeighbor !== undefined) {
            return
        }

        if (y < blockMiddleY) {
            block.body.position.x += Constants.fieldSize / 2 * signX
            block.body.position.y += Constants.fieldSize / 2

            if (signX > 0) {
                block.colors = [
                    block.colors[1],
                    block.colors[0],
                ]
            }
        } else {
            block.body.position.x += Constants.fieldSize / 2 * signX
            block.body.position.y -= Constants.fieldSize / 2

            if (signX < 0) {
                block.colors = [
                    block.colors[1],
                    block.colors[0],
                ]
            }
        }

        block.size = [
            block.size[1],
            block.size[0],
        ]
        block.isHorizontal = true
    }

    const moveBlock = (entities, move) => {
        let x = move.event.pageX
        let y = move.event.pageY
        let deltaX = move.delta.pageX
        let deltaY = move.delta.pageY

        let block, direction
        let turnDetected = false

        if (entities.gamebar.round.selectedEntityId) {
            block = entities[entities.gamebar.round.selectedEntityId]
            direction = block.velocityX ? 'x' : null
            direction = block.velocityY ? 'y' : direction
        } else {
            block = findEntity(x, y, entities)
            if (!isBlock(block)) {
                return entities
            }
            direction = block.isHorizontal ? 'x' : 'y'
            turnDetected = Math.abs(deltaX) > Math.abs(deltaY) && direction === 'y' || Math.abs(deltaX) < Math.abs(deltaY) && direction === 'x'

            entities.gamebar.round.selectedEntityId = block.blockId
            block.color = 'green'
        }

        if (direction === 'x' && block.velocityX === 0 && !hasReachedMinMaxWidth(block, deltaX)) {
            if (turnDetected) {
                turnHorizontalToVertical(block, x, y, deltaY, entities);
            } else {
                setVelocityX(block, entities, deltaX);
            }
        }

        if (direction === 'y' && block.velocityY === 0 && !hasReachedMinMaxHeight(block, deltaY)) {
            if (turnDetected) {
                turnVerticalToHorizontal(block, x, y, deltaX, entities);
            } else {
                setVelocityY(block, entities, deltaY);
            }
        }

        return entities
    }

    touches.forEach(touch => {
        if (touch.type === 'move') {
            entities = moveBlock(entities, touch)
        }
    });

    let block = entities[entities.gamebar.round.selectedEntityId]
    if (block === undefined || block === null) {
        return entities
    }

    if (block.color === 'green' && block.velocityX === 0 && block.velocityY === 0) {
        block.color = 'black'
        entities.gamebar.round.selectedEntityId = null
    }

    if (block.velocityX !== 0) {
        let velocityX = block.velocityX
        block.distanceX -= Math.abs(velocityX)
        if (block.distanceX < 0) {
            velocityX += block.distanceX * Math.sign(velocityX)
        }
        block.body.position.x += velocityX
    }

    if (block.velocityY !== 0) {
        let velocityY = block.velocityY
        block.distanceY -= Math.abs(velocityY)
        if (block.distanceY < 0) {
            velocityY += block.distanceY * Math.sign(velocityY)
        }
        block.body.position.y += velocityY
    }

    if (block.distanceX <= 0 || block.distanceY <= 0) {
        nextMove(entities)
    }

    return entities
}

export default BlockMovement