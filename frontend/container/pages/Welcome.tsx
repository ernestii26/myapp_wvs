import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import TeacherIconButton from "@/components/Teacher"; 
import StudentIconButton from "@/components/Student";
import Button from "@/components/Button";
import { router } from 'expo-router';

export default function Welcome() {
    const [selectedRole, setSelectedRole] = useState<'teacher' | 'student' | null>(null);
    return (
        <LinearGradient
            // blue at the top, white at the bottom
            colors={["#65A1FB", "#F9FBFF"]}
            start={{ x: 0, y: 0 }}   // top
            end={{ x: 0, y: 1 }}     // bottom
            style={styles.container}
        >
            <View style={styles.innerContainer}>
                <Text style={styles.titleText}>請問你的身份是⋯⋯？</Text>
                <View style={styles.buttonContainer}>
                    <View style={styles.buttonWrapper}>
                        <TeacherIconButton
                                isActive={selectedRole === 'teacher'}
                                onPress={() => setSelectedRole(selectedRole === 'teacher' ? null : 'teacher')}
                        />
                        <Text style={styles.buttonName}>老師</Text>
                        <Text style={[styles.buttonText, { textAlign: 'center' }]}>想在這裡和很多小朋友交流，解答、教學大家的課業問題。</Text>
                    </View>
                    <View style={styles.buttonWrapper}>
                        <StudentIconButton
                                isActive={selectedRole === 'student'}
                                onPress={() => setSelectedRole(selectedRole === 'student' ? null : 'student')}
                        />
                        <Text style={styles.buttonName}>學生</Text>
                        <Text style={[styles.buttonText, { textAlign: 'center' }]}>想在這裡和大家學習、進步，和營隊的老師聊天、問問題。</Text>
 
                    </View>
                </View>
                <Button 
                    onPress={() => router.push('/loading')} 
                    style={{ width: 120, height: 60, marginTop: 20}} textStyle={{ fontSize: 14 }} paddingHorizontal={10} paddingVertical={8} />
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16
    },
    buttonName: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buttonText: {
        textAlign: 'center',
        width: 157,
        fontSize: 10,
        fontWeight: 'bold',
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 10
    },
    innerContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 15,
        marginTop: 20
    },
    buttonWrapper: {
        width: 157,
        alignItems: 'center',
    }
});