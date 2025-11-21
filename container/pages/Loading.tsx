import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from 'expo-router';

import ThreeDotButton from "@/components/Threedot";
const Disable = require('@/assets/images/disable.png');

export default function Login() {
    return (
        <LinearGradient
            // blue at the top, white at the bottom
            colors={["#65A1FB", "#F9FBFF"]}
            start={{ x: 0, y: 0 }}   // top
            end={{ x: 0, y: 1 }}     // bottom
            style={styles.container}
        >
        <View style={styles.innerContainer}>
            <Image 
                resizeMode="contain"
                source={Disable} style={{  marginBottom: 20 }} 
            />
            <ThreeDotButton onPress={() => router.push('/')} />
        </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16
    },
    innerContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
});