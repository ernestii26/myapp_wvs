import { Tabs, useRouter } from 'expo-router';
import React from 'react';
import { TouchableOpacity, View, StyleSheet ,Image} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons'; // 引入圖示庫

const booksIcon1 = require('@/assets/icons/book1.png');
const booksIcon2 = require('../../assets/icons/book2.png');
const editIcon1 = require('../../assets/icons/edit1.png');
const editIcon2 = require('../../assets/icons/edit2.png');
const recordsIcon1 = require('../../assets/icons/records1.png');
const recordsIcon2 = require('../../assets/icons/records2.png');
const searchIcon1 = require('../../assets/icons/search1.png');
const searchIcon2 = require('../../assets/icons/search2.png');
export default function TabLayout() {
    const router = useRouter();
    return (
        <Tabs
            screenOptions={{
                // 1. 開啟 Header (通常預設是開啟的，但確認一下)
                headerShown: true,
                tabBarStyle: { 
                    backgroundColor: '#94BEFC',
                },
                // 2. 設定 Header 的背景色和文字顏色 (可選)
                headerStyle: { backgroundColor: '#94BEFC' },
                headerTintColor: '#FFF',
                headerTitleAlign: 'center', // 標題置中

                // 3. 設定左邊的按鈕 (返回)
                headerLeft: () => (
                <TouchableOpacity 
                    onPress={() => {
                        router.replace('/(main)');
                    }}
                    style={{ marginLeft: 16 }} // 增加一點左邊距
                >
                    {/* 這邊換成你的圖片 <Image source={...} /> 也可以 */}
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                ),

                // 4. 設定右邊的按鈕 (齒輪/設定)
                headerRight: () => (
                <TouchableOpacity 
                    onPress={() => {
                    console.log('點擊了設定');
                    // 這裡寫你想跳轉去哪，例如: router.push('/settings');
                    }}
                    style={{ marginRight: 16 }} // 增加一點右邊距
                >
                    <Ionicons name="settings-outline" size={24} color="black" />
                </TouchableOpacity>
                ),
            }}
        >
            <Tabs.Screen
                name = "books"
                options={{
                    title:'書',
                    headerTitle: '',
                    tabBarIcon: ({focused})=>(
                        <Image
                            source={focused ? booksIcon2 : booksIcon1}
                            style={styles.icon}
                            resizeMode="contain"
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name = "edit"
                options={{
                    title:'編輯',
                    tabBarIcon: ({focused})=>(
                        <Image
                            source={focused ? editIcon2 : editIcon1}
                            style={styles.icon}
                            resizeMode="contain"
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name = "records"
                options={{
                    title:'記錄',
                    headerTitle: '我的閱讀資料',
                    tabBarIcon: ({focused})=>(
                        <Image
                            source={focused ? recordsIcon2 : recordsIcon1}
                            style={styles.icon}
                            resizeMode="contain"
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name = "search"
                options={{
                    title:'搜尋',
                    tabBarIcon: ({focused})=>(
                        <Image
                            source={focused ? searchIcon2 : searchIcon1}
                            style={styles.icon}
                            resizeMode="contain"
                        />
                    ),
                }}
            />
        </Tabs>
    )
}
const styles = StyleSheet.create({
    icon:{
        width:34,
        height:30,
    },
});