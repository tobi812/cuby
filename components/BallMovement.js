import Constants from '../Constants'
import Matter from 'matter-js'
import Ball from './Ball'
import {getColumnNeighbor} from './GameLogic'

const BallMovement = (entities, {touches, dispatch, screen, layout, time}) => {
    let activeBallIds = entities.gamebar.round.activeBallIds

    activeBallIds.forEach(ballId => {
        let ball = entities[ballId]
        let rowNeighbor = getColumnNeighbor(ball.body.position.x, ball.body.position.y - Constants.boxSize, entities, 1)
        if (rowNeighbor === undefined && ball.body.isStatic === true) {
            ball.velocityY = 3
        } else {
            ball.velocityY = 0
        }

        if (ball.body.position.y > Constants.maxHeight - 180 && ball.body.isStatic === true) {
            let newBallX = ball.body.position.x
            let newBallY = ball.body.position.y
            let radius = (Constants.boxSize - Constants.boxMargin) / 2
            Matter.World.remove(entities.physics.world, ball.body)
            let newBall = Matter.Bodies.circle(newBallX, newBallY, radius, {friction: 1})
            Matter.World.add(entities.physics.world, newBall);
            entities[ballId] = {
                ballId: ballId,
                body: newBall,
                radius: radius,
                color: 'red',
                renderer: Ball
            }

            let round = entities.gamebar.round
            round.activeBallIds = round.activeBallIds.filter(item => {
                return item !== ballId
            })
        }

        if (ball.velocityY > 0) {
            ball.body.position.y += ball.velocityY
        }
    })

    return entities
}

export default BallMovement