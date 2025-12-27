import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

const Loading = ({ text = "", opacity=true }: { text?: string, opacity?: boolean }) => {
    return (
        <View style={[opacity? {opacity: 1}:{opacity: .5}, styles.overlay]}>
            <ActivityIndicator size="large" color="#0000ff" />
            {
                (text !== "") && (<Text style={styles.text}>{text}</Text>)
            }
        </View>
    );
};

export default Loading;

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject, // 等同於：position: 'absolute', top: 0, bottom: 0, left: 0, right: 0
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999, // 確保在最上層
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
    },
    text: {
        marginTop: 10,
        fontSize: 16,
        color: '#000',
    }
});
