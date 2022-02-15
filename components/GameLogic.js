import Constants from "../Constants";
import Matter from "matter-js";
import Ball from "./Ball";

const newRound = (entities) => {
    let round = entities.gamebar.round
    let radius = (Constants.boxSize - Constants.boxMargin) / 2
    round.number = round.number + 1
    round.moves = 0

    let newBallX = Constants.boxMargin + 5 + (Constants.boxSize + Constants.boxMargin) * Math.floor(Math.random() * Constants.columnCount) + radius
    let newBallY = Constants.boardPositionY - 2 * (Constants.boxSize + Constants.boxMargin)
    let newBall = Matter.Bodies.circle(newBallX, newBallY, radius, { isStatic: true })
    Matter.World.add(entities.physics.world, newBall);

    let ballId = 'ball_' + entities.gamebar.round.number
    entities[ballId] = {
        body: newBall,
        radius: radius,
        size: [radius, radius],
        color: 'red',
        renderer: Ball
    }
    round.activeBallIds.push(ballId)

    return entities
}

export default newRound