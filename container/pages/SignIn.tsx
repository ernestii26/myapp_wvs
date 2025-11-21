import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function SignIn() {
  const handleLogin = () => {
    // 這裡之後換成 Logto 的登入邏輯
    console.log("Login button pressed");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome 👋</Text>
      <Text style={styles.subtitle}>請登入以繼續</Text>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>使用 Logto 登入</Text>
      </TouchableOpacity>
    </View>
  );
}