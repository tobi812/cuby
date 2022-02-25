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

const findEntity = (x, y, entities, centerField = false) => {
    return Object.values(entities).find(entity => {
        if (!isBox(entity) && !isBall(entity) && !isBlock(entity)) {
            return false
        }

        let fieldMiddleX = centerField ? getFieldMiddleX(x) : x
        let fieldMiddleY = centerField ? getFieldMiddleY(y) : y

        let halfWidth =  entity.size ? (entity.size[0] / 2) : entity.radius + Constants.boxMargin
        let halfHeight = entity.size ? (entity.size[1] / 2) : entity.radius + Constants.boxMargin

        let entityX = entity.body.position.x
        let entityY = entity.body.position.y

        // console.log(JSON.stringify({
        //     x: ((Math.round(x * 100) / 100) .toString()),
        //     y: ((Math.round(y * 100) / 100) .toString()),
        //     fieldMiddleX: ((Math.round(fieldMiddleX * 100) / 100) .toString()),
        //     fieldMiddleY: ((Math.round(fieldMiddleY * 100) / 100) .toString()),
        //     entityX: entityX,
        //     entityY: entityY,
        //     lower: Math.round(((entityX - halfWidth) * 100) / 100) .toString(),
        //     higher: Math.round(((entityX + halfWidth) * 100) / 100) .toString(),
        //     lowerY: Math.round(((entityY - halfHeight) * 100) / 100) .toString(),
        //     higherY: Math.round(((entityY + halfHeight) * 100) / 100) .toString(),
        //     check: (entityX - halfWidth <= fieldMiddleX && fieldMiddleX <= entityX + halfWidth &&
        //         entityY - halfHeight <= fieldMiddleY && fieldMiddleY <= entityY + halfHeight)
        // }, null,'\t'))

        return entityX - halfWidth <= fieldMiddleX && fieldMiddleX <= entityX + halfWidth &&
            entityY - halfHeight <= fieldMiddleY && fieldMiddleY <= entityY + halfHeight
    })
}

const isBox = (entity) => {
    return entity.boxId !== undefined
}

const isBall = (entity) => {
    return entity.ballId !== undefined
}

const isBlock = (entity) => {
    return entity !== undefined && entity.blockId !== undefined
}

const getRowNeighbor = (x, y, entities, delta) => {
    let sign = Math.sign(delta)
    let newPositionX = x + Constants.boxSize / 2 + Constants.fieldSize * sign

    return findEntity(newPositionX, y, entities)
}

const getColumnNeighbor = (x, y, entities, delta) => {
    let sign = Math.sign(delta)
    let newPositionY = y + Constants.fieldSize / 2 + Constants.fieldSize * sign

    return findEntity(x, newPositionY, entities)
}

const getBlockNeighbor = (block, entities, deltaX = 0, deltaY = 0) => {
    let signX = Math.sign(deltaX)
    let signY = Math.sign(deltaY)
    let x = block.body.position.x + signX * (block.size[0] / 2 + Constants.fieldSize / 2)
    let y = block.body.position.y + signY * (block.size[1] / 2 + Constants.fieldSize / 2)

    return findEntity(x, y, entities)
}

const getBallNeighbor = (ball, entities, deltaX = 0, deltaY = 0) => {
    let signX = Math.sign(deltaX)
    let signY = Math.sign(deltaY)
    // console.log('x:' + ball.body.position.x)
    // console.log('y:' + ball.body.position.y)
    let x = ball.body.position.x + signX * (ball.radius + 2 * Constants.boxMargin) + deltaX
    let y = ball.body.position.y + signY * (ball.radius + 2 * Constants.boxMargin) + deltaY
    // console.log('x1:' + x)
    // console.log('y2:' + y)
    // console.log('xF:' + getFieldMiddleX(x))
    // console.log('yF:' + getFieldMiddleY(y))

    return findEntity(x, y, entities)
}

const getFieldMiddleX = (x) => {
    let column = Math.floor((x - Constants.boardPositionX) / Constants.fieldSize)
    let fieldMiddleX = Constants.boardPositionX + column * Constants.fieldSize + Constants.fieldSize / 2

    return fieldMiddleX
}

const getFieldMiddleY = (y) => {
    let fieldMiddleY
    let row = Math.floor((y - Constants.boardPositionY) / Constants.fieldSize)
    fieldMiddleY = Constants.boardPositionY + row * Constants.fieldSize + Constants.fieldSize / 2

    return fieldMiddleY
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
    isBox,
    isBlock,
    getBlockNeighbor,
    getBallNeighbor
}