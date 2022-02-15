import Matter from "matter-js";
import Constants from "../Constants";
import GameBoard from "./GameBoard";
import App from "../App";

const BoxMovement = (entities, {touches, dispatch, screen, layout, time}) => {
    const nextMove = (entities) => {
        let selectedBox = entities[entities.gamebar.round.selectedBoxId]
        selectedBox.velocityX = 0
        selectedBox.velocityY = 0
        selectedBox.distanceX = selectedBox.size[0] + Constants.boxMargin
        selectedBox.distanceY = selectedBox.size[1] + Constants.boxMargin
        selectedBox.color = 'black'

        entities.gamebar.round.moves = entities.gamebar.round.moves + 1
        entities.gamebar.round.selectedBoxId = null

        Object.values(entities).forEach(entity => {
            if (entity.boxId !== undefined) {
                entity.color = 'black'
            }
        })

        if (entities.gamebar.round.moves >= Constants.movesPerRound) {
            dispatch('new-round')
        }
    } 
    
    const getColumnNeighbor = (box, entities, move) => {
        let newPositionX = box.body.position.x + (box.size[0] / 2 + Constants.boxMargin) * Math.sign(move.delta.pageX)

        return findBox(newPositionX, box.body.position.y, entities)
    }

    const getRowNeighbor = (box, entities, move) => {
        let newPositionY = box.body.position.y + (box.size[1] / 2 + Constants.boxMargin) * Math.sign(move.delta.pageY)

        return findBox(box.body.position.x, newPositionY, entities)
    }

    const findBox = (x, y, entities) => {
        let box = Object.values(entities).find(entity => {
            if (entity.boxId === undefined) {
                return false
            }

            let entityX = entity.body.position.x
            let entityY = entity.body.position.y
            let halfWidth = (entity.size[0] / 2)
            let halfHeight = (entity.size[1] / 2)
            
            return entityX - halfWidth <= x && x <= entityX + halfWidth &&
                    entityY - halfHeight <= y && y <= entityY + halfHeight
        })

        return box
    }

    const moveBox = (entities, move) => {
        let x = move.event.pageX
        let y = move.event.pageY
        let deltaX = move.delta.pageX
        let deltaY = move.delta.pageY
        let box = null
        let direction = null

        if (entities.gamebar.round.selectedBoxId) {
            box = entities[entities.gamebar.round.selectedBoxId]
            direction = box.velocityX ? 'x' : null
            direction = box.velocityY ? 'y' : direction
        } else {
            box = findBox(x, y, entities)
            direction = Math.abs(deltaX) > Math.abs(deltaY) ? 'x' : 'y'
            if (box === undefined) {
                return entities
            }

            entities.gamebar.round.selectedBoxId = box.boxId
            box.color = 'green'
        }
    
        if (direction === 'x' && box.velocityX === 0) {
            let columnNeighbor = getColumnNeighbor(box, entities, move)
            if (!columnNeighbor) {
                box.velocityX = 3 * Math.sign(deltaX)
            } else {
                columnNeighbor.color = 'red'
            }
        }

        if (direction === 'y' && box.velocityY === 0) {
            // Check if maxHeight is reached and for collision with other box.
            let rowNeighbor = getRowNeighbor(box, entities, move)
            if (!getRowNeighbor(box, entities, move)) {
                box.velocityY = 3 * Math.sign(deltaY)
            } else {
                rowNeighbor.color = 'orange'
            }
        }

        return entities
    }
    
    const endMove = (entities, touch) => {
        let x = touch.event.pageX
        let y = touch.event.pageY

        // let box = findBox(x, y, entities)
        // box.color = 'black'
        // Dispatch end-round event and if box has changed position.
    }
    
    touches.forEach(touch => {
        if (touch.type === 'move') {
            entities = moveBox(entities, touch)
            
        }

        if (touch.type === 'end') {
            endMove(entities, touch)
        }
    });

    let box = entities[entities.gamebar.round.selectedBoxId]
    if (box === undefined || box === null) {
        return entities
    }

    if (box.color === 'green' && box.velocityX === 0 && box.velocityY === 0) {
        box.color = 'black'
        entities.gamebar.round.selectedBoxId = null
    }

    if (box.velocityX !== 0) {
        let velocityX = box.velocityX
        box.distanceX = box.distanceX - Math.abs(box.velocityX)
        if (box.distanceX < 0) {
            velocityX = velocityX + box.distanceX * Math.sign(velocityX)
        }
        box.body.position.x = box.body.position.x + velocityX
    }

    if (box.velocityY !== 0) {
        let velocityY = box.velocityY
        box.distanceY = box.distanceY - Math.abs(box.velocityY)
        if (box.distanceY < 0) {
            velocityY = velocityY + box.distanceY * Math.sign(velocityY)
        }
        box.body.position.y = box.body.position.y + velocityY
    }

    if (box.distanceX <= 0) {
        nextMove(entities)
    }

    if (box.distanceY <= 0) {
        nextMove(entities)
    }

    return entities
}

export default BoxMovement