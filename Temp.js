
            <View style={styles.controls}>
            <View style={styles.controlRow}>
                <TouchableOpacity onPress={() => { this.engine.dispatch({ type: "move-up" })} }>
                    <View style={styles.control} />
                </TouchableOpacity>
            </View>
            <View style={styles.controlRow}>
                <TouchableOpacity onPress={() => { this.engine.dispatch({ type: "move-left" })} }>
                    <View style={styles.control} />
                </TouchableOpacity>
                <View style={[styles.control, { backgroundColor: null}]} />
                <TouchableOpacity onPress={() => { this.engine.dispatch({ type: "move-right" })}}>
                    <View style={styles.control} />
                </TouchableOpacity>
            </View>
            <View style={styles.controlRow}>
                <TouchableOpacity onPress={() => { this.engine.dispatch({ type: "move-down" })} }>
                    <View style={styles.control} />
                </TouchableOpacity>
            </View>
        </View>


            // render() {
            //     const styles = StyleSheet.create({
            //         gameBoard: {
            //             width: Constants.maxWidth,
            //             height: Constants.maxWidth,
            //             display: 'flex',
            //             flexWrap: 'wrap',
            //         },
            //         field: {
            //             width: (Constants.maxWidth - 10) / this.columnCount,
            //             height: (Constants.maxWidth - 10) / this.columnCount,
            //         }
            //     });
            //
            //     return (
            //         <View style={styles.gameBoard}>
            //             {this.state.fields.map((fieldColor, index) => (
            //                 <Box key={index} style={{
            //                     backgroundColor: fieldColor,
            //                     width: ((Constants.maxWidth) / this.columnCount) - 4,
            //                     height: ((Constants.maxWidth) / this.columnCount) - 4,
            //                     margin: 2,
            //                     borderRadius: 4,
            //                 }}>
            //                 </Box>
            //                 )
            //             )}
            //         </View>
            //     )
            // }