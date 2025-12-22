/*藍色加號按鈕元件*/
import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

interface AddPostProps {
    onPress?: () => void;
}

const AddPost = ({ onPress }: AddPostProps) => {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPress || (() => console.log('Button Pressed!'))}
            activeOpacity={0.8}
        >
            <Image 
                source={require('@/assets/icons/addpost.png')}
                style={styles.image}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 32,
        right: 24,
        zIndex: 50,
        borderWidth: 0,
        backgroundColor: 'transparent',
    },
    image: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
});

export default AddPost;