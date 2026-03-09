import React from 'react';
import {StyleSheet, View} from 'react-native';
import {GlassButton} from "@/components/GlassButton";
import {SafeAreaView} from "react-native-safe-area-context";
export default function Tab() {
    return (
        <View style={styles.container}>

            <SafeAreaView>
                <GlassButton title={"test"}/>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#434343'
    },
    backgroundImage: {
        ...StyleSheet.absoluteFillObject,
        width: '100%',
        height: '100%',
    },
});