import React, { useCallback } from "react";
import { StyleSheet, ViewStyle, Text, Platform } from "react-native";
import {
    Gesture,
    GestureDetector,
} from "react-native-gesture-handler";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    runOnJS,
} from "react-native-reanimated";
import { GlassView, isLiquidGlassAvailable } from "expo-glass-effect";

interface GlassButtonProps {
    title: string;
    onPress?: () => void;
    style?: ViewStyle;
}

const PRESSED_SCALE = 0.96;
const DEFAULT_SCALE = 1;

export function GlassButton({ title, onPress, style }: GlassButtonProps) {
    const scale = useSharedValue(DEFAULT_SCALE);
    const highlightOpacity = useSharedValue(0);

    // Animate scale + highlight
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const highlightStyle = useAnimatedStyle(() => ({
        opacity: highlightOpacity.value,
    }));

    const triggerPress = useCallback(() => {
        if (onPress) {
            onPress();
        }
    }, [onPress]);

    // Gesture
    const tap = Gesture.Tap()
        .onBegin(() => {
            scale.value = withTiming(PRESSED_SCALE, { duration: 100 });
            highlightOpacity.value = withTiming(0.24, { duration: 100 });
        })
        .onFinalize(() => {
            // If ended inside bounds => fire press
            runOnJS(triggerPress)();
            scale.value = withTiming(DEFAULT_SCALE, { duration: 150 });
            highlightOpacity.value = withTiming(0, { duration: 150 });
        });

    return (
        <GestureDetector gesture={tap}>
            <Animated.View style={[styles.container, style, animatedStyle]}>
                <GlassView
                    style={styles.glass}
                    glassEffectStyle="regular"
                    // Disable default interactive blur because we animate manually
                    isInteractive={false}
                >
                    {/*
            Highlight overlay is an absolutely-positioned Animated.View
            that fades in during press for tactile feedback.
          */}
                    <Animated.View
                        pointerEvents="none"
                        style={[styles.highlight, highlightStyle]}
                    />

                    <Text style={styles.text}>{title}</Text>
                </GlassView>
            </Animated.View>
        </GestureDetector>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 200,
        alignSelf: "center",
    },
    glass: {
        borderRadius: 16,
        paddingVertical: 14,
        paddingHorizontal: 24,
        alignItems: "center",
        justifyContent: "center",
        // On Android or unsupported iOS, fall back to subtle translucent background
        ...(Platform.OS !== "ios" || !isLiquidGlassAvailable()
            ? { backgroundColor: "rgba(255,255,255,0.4)" }
            : {}),
    },
    text: {
        color: "#000",
        fontSize: 18,
        fontWeight: "600",
    },
    highlight: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 16,
        backgroundColor: "#ffffff",
    },
});