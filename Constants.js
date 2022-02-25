import {Dimensions} from "react-native";


const columnCount = 8
const boxMargin = 5
const maxWidth = Dimensions.get("screen").width
const maxHeight = Dimensions.get("screen").height
const boxSize = (maxWidth) / columnCount - boxMargin * 2

const Constants = {
    movesPerRound: 10,
    totalRounds: 10,
    maxWidth: maxWidth,
    maxHeight: maxHeight,
    boxMargin: boxMargin,
    boxSize: boxSize,
    columnCount: columnCount,
    fieldSize: boxSize + boxMargin,
    totalFields: columnCount * columnCount,
    // boardPositionX: boxSize / 2 + 0,
    // boardPositionY: boxSize / 2 + 100
    boardPositionX: 5,
    boardPositionY: 100
}

export default Constants;