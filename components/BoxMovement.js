import Matter from "matter-js";
import Constants from "../Constants";
import GameBoard from "./GameBoard";
import App from "../App";

const BoxMovement = (entities, {touches, screen, layout, time}) => {
    let move = touches.find(x => x.type === "move");
    let maxWidth = Constants.maxWidth;
    let maxHeight = Constants.maxHeight;

    if (move) {

        let x = move.event.pageX
        let y = move.event.pageY
        let boxNumber = Math.floor((y - Constants.boardPositionX) / (Constants.boxMargin + Constants.boxSize)) * Constants.columnCount + Math.floor((x - Constants.boardPositionX) / (Constants.boxMargin + Constants.boxSize))
        console.log(x)
        console.log(y)
        console.log(Constants.boxMargin + Constants.boxSize)
        console.log(Math.floor((y - Constants.boardPositionX) / (Constants.boxMargin + Constants.boxSize)) * Constants.columnCount)
        console.log( Math.floor((x - Constants.boardPositionX) / (Constants.boxMargin + Constants.boxSize)))
        console.log("Boxnumber:" + boxNumber)
        if (!boxNumber) {
            return entities;
        }
        let box = entities["box_" + boxNumber];
        if (box) {
            return entities;
        }

        console.log(boxNumber)
        if (
            move.event.pageX >= (box.body.position.x - 25) &&
            move.event.pageX <= (box.body.position.x + 25) &&
            move.event.pageY >= (box.body.position.y - 25) &&
            move.event.pageY <= (box.body.position.y + 25)
        ) {
            if (
                (box.body.position.x + move.delta.pageX + 25) <= maxWidth &&
                (box.body.position.x + move.delta.pageX - 25) >= 0
            ) {
                //box.body.position.x = box.body.position.x + move.delta.pageX;

                if (move.delta.pageX < 0) {
                    Matter.Body.applyForce( box.body, box.body.position, {x: -0.10, y: 0.00});
                }
                if (move.delta.pageX > 0) {
                    Matter.Body.applyForce( box.body, box.body.position, {x: 0.10, y: 0.00});
                }
            }

            if (
                (box.body.position.y + move.delta.pageY + 25) <= maxHeight &&
                (box.body.position.y + move.delta.pageY - 25) >= 0
            ) {
                if (move.delta.pageY > 0) {
                    Matter.Body.applyForce( box.body, box.body.position, {x: 0.00, y: 0.10});
                }

                if (move.delta.pageY < 0) {
                    Matter.Body.applyForce( box.body, box.body.position, {x: 0.00, y: -0.10});
                }
                //box.body.position.y = box.body.position.y + move.delta.pageY;
            }
        }
        entities["box"] = box;
    }

    return entities;
}

export default BoxMovement