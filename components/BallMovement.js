import Constants from "../Constants";
import Matter from "matter-js";
import Ball from "./Ball";

const BallMovement = (entities, {touches, dispatch, screen, layout, time}) => {
    const getColumnNeighbor = (entity, entities, delta) => {
        let newPositionX = entity.body.position.x + (Constants.boxSize / 2 + Constants.boxMargin) + delta

        return findBox(newPositionX, entity.body.position.y, entities)
    }

    const getRowNeighbor = (entity, entities, delta) => {
        let newPositionY = entity.body.position.y + (Constants.boxSize / 2 + Constants.boxMargin) + delta

        return findBox(entity.body.position.x, newPositionY, entities)
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

    let activeBallIds = entities.gamebar.round.activeBallIds

    activeBallIds.forEach(ballId => {
        let ball = entities[ballId]
        let rowNeighbor = getRowNeighbor(ball, entities, 20)
        if (rowNeighbor === undefined && ball.body.isStatic === true) {
            ball.velocityY = 3
        } else {
            ball.velocityY = 0
        }

        if (ball.body.position.y > Constants.maxHeight - 180 && ball.body.isStatic === true) {
            let newBallY = ball.body.position.y
            let newBallX = ball.body.position.x
            let radius = (Constants.boxSize - Constants.boxMargin) / 2
            Matter.World.remove(entities.physics.world, ball.body)
            let newBall = Matter.Bodies.circle(newBallX, newBallY, radius)
            Matter.World.add(entities.physics.world, newBall);
            entities[ballId] = {
                body: newBall,
                radius: radius,
                size: [radius, radius],
                color: 'red',
                renderer: Ball
            }
            let round = entities.gamebar.round
            round.activeBallIds = round.activeBallIds.filter(item => {
                return item === ballId
            })
        }

        if (ball.velocityY > 0) {
            ball.body.position.y = ball.body.position.y + ball.velocityY
        }
    })


    return entities
}

export default BallMovement