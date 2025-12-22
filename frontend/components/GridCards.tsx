import React from 'react';
import { StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import { useFonts, ABeeZee_400Regular_Italic } from '@expo-google-fonts/abeezee';

interface CardProps {
  title: string;
  description?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  onPress?: () => void;
}

export default function GridCard({ 
  title, 
  description, 
  style, 
  textStyle,
  onPress
}: CardProps) {
    return (
        <View style ={{borderColor: '#000', borderWidth: 0}}>
            <TouchableOpacity 
            style={[styles.card, style]} 
            onPress={onPress}
            activeOpacity={0.8}
            >
            </TouchableOpacity>
            <Text style={[styles.title, textStyle]}>{title}</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    card: {
        backgroundColor: '#CFE2FF',
        //borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
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
        justifyContent: 'flex-start',
    },
});