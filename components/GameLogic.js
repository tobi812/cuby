import Constants from "../Constants";
import Matter from "matter-js";
import Ball from "./Ball";

const newRound = (entities) => {
    let round = entities.gamebar.round
    let radius = (Constants.boxSize - Constants.boxMargin) / 2
    round.number = round.number + 1
    round.moves = 0

    let newBallX = Constants.boxMargin + 5 + (Constants.fieldSize) * Math.floor(Math.random() * Constants.columnCount) + radius
    let newBallY = Constants.boardPositionY - 2 * (Constants.fieldSize)
    let newBall = Matter.Bodies.circle(newBallX, newBallY, radius, { isStatic: true })
    Matter.World.add(entities.physics.world, newBall);

    let ballId = 'ball_' + entities.gamebar.round.number
    entities[ballId] = {
        ballId: ballId,
        body: newBall,
        radius: radius,
        velocityY: 0,
        distanceY: Constants.fieldSize,
        color: 'red',
        renderer: Ball
    }
    round.activeBallIds.push(ballId)

    return entities
}

const findEntity = (x, y, entities) => {
    return Object.values(entities).find(entity => {
        if (!isBox(entity) && !isBall(entity) && !isBlock(entity)) {
            return false
        }

        let entityX = entity.body.position.x
        let entityY = entity.body.position.y
        let halfWidth =  entity.size ? (entity.size[0] / 2) : entity.radius + Constants.boxMargin
        let halfHeight = entity.size ? (entity.size[1] / 2) : entity.radius + Constants.boxMargin
        if (y < 150) {
            console.log('START')
            console.log(JSON.stringify({
                x: ((Math.round(x * 100) / 100) .toString()),
                lower: Math.round(((entityX - halfWidth) * 100) / 100) .toString(),
                higher: Math.round(((entityX + halfWidth) * 100) / 100) .toString(),
                y: ((Math.round(y * 100) / 100) .toString()),
                lowerY: Math.round(((entityY - halfWidth) * 100) / 100) .toString(),
                higherY: Math.round(((entityY + halfWidth) * 100) / 100) .toString()
            }))
            console.log('END')
        }

        return entityX - halfWidth <= x && x <= entityX + halfWidth &&
            entityY - halfHeight <= y && y <= entityY + halfHeight
    })
}

const isBox = (entity) => {
    return entity.boxId !== undefined
}

const isBall = (entity) => {
    return entity.ballId !== undefined
}

const isBlock = (entity) => {
    return entity.blockId !== undefined
}

const getRowNeighbor = (x, y, entities, delta) => {
    let sign = Math.sign(delta)
    let newPositionX = x + Constants.boxSize / 2 + Constants.fieldSize * sign

    return findEntity(newPositionX, y, entities)
}

const getColumnNeighbor = (x, y, entities, delta) => {
    let sign = Math.sign(delta)
    let newPositionY = y + Constants.boxSize / 2 + Constants.fieldSize * sign

    return findEntity(x, newPositionY, entities)
}

const hasReachedMinMaxWidth = (entity, delta) => {
    let positionX = entity.body.position.x
    if (delta > 0) {
        return positionX + Constants.fieldSize + delta >= Constants.maxWidth
    }

    if (delta < 0) {
        return positionX - Constants.fieldSize + delta <= 0
    }

    return false
}

const hasReachedMinMaxHeight = (entity, delta) => {
    let positionY = entity.body.position.y
    if (delta > 0) {
        return positionY + Constants.fieldSize + delta >= Constants.maxHeight
    }

    if (delta < 0) {
        return positionY - Constants.fieldSize + delta <= 0
    }

    return false
}

export {
    findEntity,
    newRound,
    getRowNeighbor,
    getColumnNeighbor,
    hasReachedMinMaxWidth,
    hasReachedMinMaxHeight,
    isBox
}