import React from 'react';
import { StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import { useFonts, ABeeZee_400Regular_Italic } from '@expo-google-fonts/abeezee';

interface CardProps {
  title?: string;
  description?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  onPress?: () => void;
}

export default function Test({ 
  title, 
  description, 
  style, 
  textStyle,
  onPress
}: CardProps) {
    return (
        <View style={{ height: 200, width: 200, backgroundColor: 'red' }}>
        
        {/* 子元素 (藍色框) */}
        {/* 因為父元素有固定大小，子元素設 flex: 1 就會自動填滿這 200x200 */}
            <View style={{ flex: 0.9, backgroundColor: 'blue' }} />

        </View>
    );
}
const styles = StyleSheet.create({
    card: {
        backgroundColor: '#CFE2FF',
        //borderRadius: 8,
        padding: 16,
        margin: 8,
        alignItems: 'center',
        justifyContent: 'center',
        width: 102,
        height: 139,
    },
    title: {
        marginTop: 8,
        margin: 8,
        fontWeight: '400',
        fontFamily: 'ABeeZeeItalic', // 必須與 useFonts 中定義的名稱一致
        fontSize: 14,
        fontStyle: 'italic', // 雖然字體檔案已經是斜體，但建議保留
        lineHeight: 20,      // 行高 (React Native 使用數值或像素)
        letterSpacing: -0.24, // 字元間距
        color: '#333',
    },
});