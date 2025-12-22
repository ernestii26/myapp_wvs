/*藍色加號按鈕元件*/
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

interface AddPostProps {
    onPress?: () => void;
}

const AddPost = ({ onPress }: AddPostProps) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={onPress || (() => console.log('Button Pressed!'))}
                activeOpacity={0.8}
            >
                <Image 
                    source={require('@/assets/icons/addpost.png')}
                    style={styles.image}
                />
            </TouchableOpacity>
     </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 32,
        right: 24,
        zIndex: 50,
    },
    image: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
});

export default AddPost;