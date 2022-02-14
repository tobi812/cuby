import Matter from "matter-js";
import Constants from "../Constants";
import GameBoard from "./GameBoard";
import App from "../App";

const BoxMovement = (entities, {touches, dispatch, screen, layout, time}) => {

    const getColumnNeighbor = (box, entities, move) => {
        let factor = 1
        if (move.delta.pageX < 0) {
            factor = -1
        }

        let newPositionX = box.body.position.x + (box.size[0] + Constants.boxMargin) * Math.sign(move.delta.pageX)

        return findBox(newPositionX, box.body.position.y, entities)
    }

    const getRowNeighbor = (box, entities, move) => {
        let factor = 1
        if (move.delta.pageY < 0) {
            factor = -1
        }

        let newPositionY = box.body.position.y + (box.size[1] + Constants.boxMargin) * Math.sign(move.delta.pageY)

        return findBox(box.body.position.y, newPositionY, entities)
    }

    const findBox = (x, y, entities) => {
        let box = Object.values(entities).find(entity => {
            if (entity.body === undefined) {
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
        
        let maxWidth = Constants.maxWidth;
        let maxHeight = Constants.maxHeight;

        let box = null
        let direction = null
        if (entities.round.boxId) {
            box = entities[entities.round.boxId]
            direction = box.velocityX ? 'x' : null
            direction = box.velocityY ? 'y' : direction
        } else {
            box = findBox(x, y, entities)
            direction = Math.abs(deltaX) > Math.abs(deltaY) ? 'x' : 'y'
            if (box === undefined) {
                return entities
            }
            entities.round.selectedBoxId = box.boxId
        }

        box.color = 'green'

        if (direction === 'x') {
            let columnNeighbor = getColumnNeighbor(box, entities, move)
            if (!columnNeighbor) {
                box.velocityX = 2 * Math.sign(deltaX)
            } else {
                columnNeighbor.color = 'red'
            }
        }

        if (direction === 'y') {
            // Check if maxHeight is reached and for collision with other box.
            let rowNeighbor = getRowNeighbor(box, entities, move)
            if (!getRowNeighbor(box, entities, move)) {
                box.velocityY = 2 * Math.sign(deltaY)
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

    let box = entities[entities.round.selectedBoxId]
    if (box === undefined || box === null) {
        return entities
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
        box.distanceX = box.size[0] + Constants.boxMargin
        box.velocityX = 0
        box.color = 'black'
        entities.round.direction = null
    }

    if (box.distanceY <= 0) {
        box.distanceY = box.size[1] + Constants.boxMargin
        box.velocityY = 0
        box.color = 'black'
        entities.round.direction = null
    }

    return entities
}

export default BoxMovement