import AddPost from '@/components/BlueButton';
import CreatePostModal from '@/components/CreatePostModal';
import ThreadPost from '@/components/ThreadPost';
import { usePosts } from '@/container/hooks/Posts';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';

interface CardProps {
  title?: string;
  description?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  onPress?: () => void;
}

export default function Navigation({ 
  title, 
  description, 
  style, 
  textStyle,
  onPress
}: CardProps) {
    // 使用 Custom Hook 獲取資料和邏輯
    const { posts, createPost } = usePosts();
    const [modalVisible, setModalVisible] = useState(false);

    const handlePressThread = () => {
        console.log("導向留言串頁面...");
    };

    const handleAddPost = () => {
        setModalVisible(true);
    };

    const handleCreatePost = (data: { category: string; content: string; images: string[] }) => {
        createPost(data);
    };
    
    return (
    <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
            {posts.map((post) => (
              <ThreadPost
                key={post.id}
                avatar={post.avatar}
                name={post.name}
                handle={post.handle}
                time={post.time}
                content={post.content}
                images={post.images}
                commentsCount={post.commentsCount}
                onPressThread={handlePressThread}
                TeacherName={post.TeacherName}
              />
            ))}
        </ScrollView>
        <AddPost onPress={handleAddPost} />
        <CreatePostModal 
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            onSubmit={handleCreatePost}
        />
    </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollView: {
        flex: 1,
    },
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