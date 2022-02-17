import Constants from "../Constants";
import {
    getRowNeighbor,
    getColumnNeighbor,
    hasReachedMinMaxWidth,
    hasReachedMinMaxHeight,
    findEntity,
    isBox
} from "./GameLogic";

const BoxMovement = (entities, {touches, dispatch, screen, layout, time}) => {
    const nextMove = (entities) => {
        let selectedBox = entities[entities.gamebar.round.selectedBoxId]
        selectedBox.velocityX = 0
        selectedBox.velocityY = 0
        selectedBox.distanceX = selectedBox.size[0] + Constants.boxMargin
        selectedBox.distanceY = selectedBox.size[1] + Constants.boxMargin
        selectedBox.color = 'black'

        entities.gamebar.round.moves += 1
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

    const moveBox = (entities, move) => {
        let x = move.event.pageX
        let y = move.event.pageY
        let deltaX = move.delta.pageX
        let deltaY = move.delta.pageY
        let box, direction

        if (entities.gamebar.round.selectedBoxId) {
            box = entities[entities.gamebar.round.selectedBoxId]
            direction = box.velocityX ? 'x' : null
            direction = box.velocityY ? 'y' : direction
        } else {
            box = findEntity(x, y, entities)
            direction = Math.abs(deltaX) > Math.abs(deltaY) ? 'x' : 'y'
            if (box === undefined || !isBox(box)) {
                return entities
            }

            entities.gamebar.round.selectedBoxId = box.boxId
            box.color = 'green'
        }

        if (direction === 'x' && box.velocityX === 0 && !hasReachedMinMaxWidth(box, deltaX)) {
            let columnNeighbor = getRowNeighbor(box.body.position.x, box.body.position.y, entities, deltaX)
            if (!columnNeighbor) {
                box.velocityX = 10 * Math.sign(deltaX)
            } else {
                columnNeighbor.color = 'red'
            }
        }

        if (direction === 'y' && box.velocityY === 0 && !hasReachedMinMaxHeight(box, deltaY)) {
            let rowNeighbor = getColumnNeighbor(box.body.position.x, box.body.position.y, entities, deltaY)
            console.log(box.body.position.x)
            console.log(box.body.position.y)
            console.log(deltaY)
            console.log(box.body.position.y + Constants.boxSize / 2 + (Constants.boxSize + Constants.boxMargin) * Math.sign(deltaY))
            if (!rowNeighbor) {
                box.velocityY = 10 * Math.sign(deltaY)
            } else {
                rowNeighbor.color = 'orange'
            }
        }

        return entities
    }

    touches.forEach(touch => {
        if (touch.type === 'move') {
            entities = moveBox(entities, touch)
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
        box.distanceX -= Math.abs(velocityX)
        if (box.distanceX < 0) {
            velocityX += box.distanceX * Math.sign(velocityX)
        }
        box.body.position.x += velocityX
    }

    if (box.velocityY !== 0) {
        let velocityY = box.velocityY
        box.distanceY -= Math.abs(velocityY)
        if (box.distanceY < 0) {
            velocityY += box.distanceY * Math.sign(velocityY)
        }
        box.body.position.y += velocityY
    }

    if (box.distanceX <= 0 || box.distanceY <= 0) {
        nextMove(entities)
    }

    return entities
}

export default BoxMovement