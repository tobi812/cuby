import {Dimensions} from "react-native";


const columnCount = 8
// const totalFields = columnCount * columnCount
const boxMargin = 2
const maxWidth = Dimensions.get("screen").width
const maxHeight = Dimensions.get("screen").height
const boxSize = (maxWidth) / columnCount - boxMargin * 2

const Constants = {
    maxWidth: maxWidth,
    maxHeight: maxHeight,
    boxMargin: boxMargin,
    boxSize: boxSize,
    columnCount: columnCount,
    totalFields: columnCount * columnCount,
    boardPositionX: boxSize / 2 + 5,
    boardPositionY: boxSize / 2 + 5
}

export default Constants;