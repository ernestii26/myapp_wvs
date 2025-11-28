import ThreadPost from '@/components/ThreadPost';
import React from 'react';
import { ScrollView, StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface CardProps {
  title?: string;
  description?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  onPress?: () => void;
}

interface PostData {
  id: string;
  avatar: any;
  name: string;
  handle: string;
  time: string;
  content: string;
  commentsCount: number;
  TeacherName?: string;
}

const mockPosts: PostData[] = [
  {
    id: '1',
    avatar: require('@/assets/images/Round.png'),
    name: '吳昊和',
    handle: '@haohan',
    time: '12小時前',
    content: '今天放學回家後練習吉他，聲音終於沒有聽起來悶悶的了！還學會了C調和A調',
    commentsCount: 7,
    TeacherName: '罐罐',
  },
  {
    id: '2',
    avatar: 'https://i.pravatar.cc/150?img=1',
    name: '林子晴',
    handle: '@linziching',
    time: '8小時前',
    content: '完美！我已經幫你完成了。以下是我做的修改：修改重點添加 ScrollView：用來包裝所有的 ThreadPost，讓它們可以垂直滾動建立 demo 資料：mockPosts 陣列包含 6 筆示例資料，包括：不同的使用者（姓名、帳號）多種內容和互動數部分有老師評語（TeacherName）有些用本地圖片，有些用遠程 URL使用 .map() 渲染：遍歷 mockPosts 陣列動態生成 ThreadPost 組件添加 container 樣式：確保 S 💪',
    commentsCount: 12,
    TeacherName: '王老師',
  },
  {
    id: '3',
    avatar: 'https://i.pravatar.cc/150?img=2',
    name: '陳冠宇',
    handle: '@chenguan',
    time: '6小時前',
    content: '完成了英文閱讀小論文，要不要一起組讀書會？',
    commentsCount: 5,
  },
  {
    id: '4',
    avatar: 'https://i.pravatar.cc/150?img=3',
    name: '劉思語',
    handle: '@liusy',
    time: '4小時前',
    content: '體育課跳高終於跳過140公分了，下一個目標是150！',
    commentsCount: 18,
    TeacherName: '程子然',
  },
  {
    id: '5',
    avatar: 'https://i.pravatar.cc/150?img=4',
    name: '王詩琳',
    handle: '@wangshilin',
    time: '2小時前',
    content: '科展製作完成！用Arduino做了一個自動澆水系統，超棒的',
    commentsCount: 9,
  },
  {
    id: '6',
    avatar: 'https://i.pravatar.cc/150?img=5',
    name: '黃子恩',
    handle: '@huangzien',
    time: '1小時前',
    content: '終於修完所有的微積分進度，開始複習了。加油各位！',
    commentsCount: 14,
    TeacherName: '李明澂',
  },
];

export default function Test({ 
  title, 
  description, 
  style, 
  textStyle,
  onPress
}: CardProps) {
    const handlePressThread = () => {
    console.log("導向留言串頁面...");
  };
    
    return (
    <ScrollView style={styles.container}>
        {mockPosts.map((post) => (
          <ThreadPost
            key={post.id}
            avatar={post.avatar}
            name={post.name}
            handle={post.handle}
            time={post.time}
            content={post.content}
            commentsCount={post.commentsCount}
            onPressThread={handlePressThread}
            TeacherName={post.TeacherName}
          />
        ))}
    </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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