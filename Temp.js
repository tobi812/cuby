
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