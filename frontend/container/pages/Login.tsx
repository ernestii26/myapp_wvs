import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from 'expo-router';
import TeacherIconButton from "@/components/Teacher"; 
import StudentIconButton from "@/components/Student";
import Button from "@/components/Button";
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
            <Button  title = "登入" onPress={() => router.push('/welcome')} style={{ width: 120, height: 60, marginTop: 20}} textStyle={{ fontSize: 14 }} paddingHorizontal={10} paddingVertical={8} />
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