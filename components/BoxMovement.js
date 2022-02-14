import Matter from "matter-js";
import Constants from "../Constants";
import GameBoard from "./GameBoard";
import App from "../App";

const BoxMovement = (entities, {touches, dispatch, screen, layout, time}) => {

    const findBox = (x, y, entities) => {
        let box = Object.values(entities).find(entity => {
            if (entity.body === undefined) {
                return false
            }

            let entityX = entity.body.position.x
            let entityY = entity.body.position.x
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

        let box = findBox(x, y, entities)
        if (box === undefined) {
            return entities
        }

        let direction = entities.round.direction
        if (direction === null) {
            direction = Math.abs(deltaX) > Math.abs(deltaY) ? 'x' : 'y'
            entities.round.direction = direction
        }
        
        if (direction === 'x') {
            // Check if maxWidth is reached and for collision with other box.
            box.body.position.x = box.body.position.x + deltaX
        }

        if (direction === 'y') {
            // Check if maxHeight is reached and for collision with other box.
            box.body.position.y = box.body.position.y + deltaY
        }

        return entities
    }
    
    const endMove = () => {
        // Dispatch end-round event and if box has changed position.
    }
    
    touches.forEach(touch => {
        if (touch.type === 'move') {
            entities = moveBox(entities, touch)
            
        }

        if (touch.type === 'end') {
            endMove()
        }
    });
/*

    //let move = touches.find(x => x.type === "start")
    //if (move === undefined) {
    //    return entities
    //}
    

    
    if (move) {
        let x = move.event.pageX
        let y = move.event.pageY
        let box = Object.values(entities).find(entity => 
             entity.body.position.x - (entity.size[0] / 2) <= x &&
                x <= entity.body.position.x + (entity.size[0] / 2) &&
                entity.body.position.y - (entity.size[1] / 2) <= y &&
                y <= entity.body.position.y + (entity.size[1] / 2)
        )

        box.body.position.x = box.body.position.x + move.delta.pageX
        box.body.position.y = box.body.position.y + move.delta.pageY;
        
        return entities
        
        let columnNumber = Math.floor((x - Constants.boardPositionX) / (Constants.boxMargin + Constants.boxSize))
        let rowNumber = Math.floor((y - Constants.boardPositionX) / (Constants.boxMargin + Constants.boxSize))


        let boxId = 'box_' + columnNumber + '_' + rowNumber

        if (
            (box.body.position.x + move.delta.pageX) <= maxWidth &&
            (box.body.position.x + move.delta.pageX) >= 0 &&
            Math.abs(move.delta.pageX) > Math.abs(move.delta.pageY)
        ) {
            box.body.position.x = box.body.position.x + move.delta.pageX
            
            if (move.delta.pageX > 0) {
                if (!entities['box_' + (columnNumber + 1) + '_' + rowNumber]) {
                    entities['box_' + (columnNumber + 1) + '_' + rowNumber] = box
                    delete entities[boxId]
                    //box.body.position.x = box.body.position.x + Constants.boxSize + Constants.boxMargin;
                    box.body.position.x = box.body.position.x + move.delta.pageX
                }
            }
            
            

            //if (move.delta.pageX < 0) {
            //    Matter.Body.applyForce( box.body, box.body.position, {x: -0.10, y: 0.00});
            //}
            //if (move.delta.pageX > 0) {
            //    Matter.Body.applyForce( box.body, box.body.position, {x: 0.10, y: 0.00});
            //}
        }
        
        if (
            (box.body.position.y + move.delta.pageY) <= maxHeight &&
            (box.body.position.y + move.delta.pageY) >= 0 &&
            Math.abs(move.delta.pageX) < Math.abs(move.delta.pageY)
        ) {
            box.body.position.y = box.body.position.y + move.delta.pageY;

            if (move.delta.pageY > 0) {
                if (!entities['box_' + columnNumber + '_' + (rowNumber + 1)]) {
                    entities['box_' + columnNumber + '_' + (rowNumber + 1)] = box
                    delete entities[boxId]
                    //box.body.position.y = box.body.position.y + Constants.boxSize + Constants.boxMargin;

                    box.body.position.y = box.body.position.y + move.delta.pageY;
                }
            }
            //if (move.delta.pageY > 0) {
            //    Matter.Body.applyForce( box.body, box.body.position, {x: 0.00, y: 0.10});
            //}

            //if (move.delta.pageY < 0) {
            //    Matter.Body.applyForce( box.body, box.body.position, {x: 0.00, y: -0.10});
            //}
        }

    }

            */

    return entities;
}

export default BoxMovement