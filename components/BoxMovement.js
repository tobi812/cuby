import Matter from "matter-js";
import Constants from "../Constants";

const BoxMovement = (entities, {touches, screen, layout, time}) => {
    let move = touches.find(x => x.type === "move");
    let maxWidth = Constants.maxWidth;
    let maxHeight = Constants.maxHeight;

    if (move) {
        let box = entities["box"];
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