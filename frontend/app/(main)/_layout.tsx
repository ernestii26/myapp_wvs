import { Tabs, useRouter } from 'expo-router';
import React from 'react';
import { Image } from 'react-native';

export default function TabLayout() {
  const router = useRouter();
  return (
    <Tabs
      screenOptions={{
      tabBarActiveTintColor: '#ffd33d',
      tabBarShowLabel: false, // 隱藏底部 tab 的文字
      headerShown: true,     // 若要同時隱藏上方 header title
      }}
    >
      <Tabs.Screen
      name="chat"
      options={{
        title: '貼文',
        tabBarIcon: ({ color, focused }) => (
        <Image 
          source={focused ? require('@/assets/icons/PostTab1.png') : require('@/assets/icons/PostTab.png')} 
          style={{ width: 36, height: 36 }} 
        />
        ),
      }}
      />
      {/* <Tabs.Screen
      name="library"
      options={{
        title: '圖書館',
        tabBarIcon: ({ color, focused }) => (
        <Image 
          source={focused ? require('@/assets/icons/CafeTab1.png') : require('@/assets/icons/CafeTab.png')} 
          style={{ width: 24, height: 24 }} 
        />
        ),
      }}
      listeners = {()=>({
        tabPress: e =>{
        e.preventDefault();
        router.replace('/(library)/books');
        },
      })}
      /> */}
      <Tabs.Screen
      name="index"
      options={{
        title: '貼文',
        tabBarIcon: ({ color, focused }) => (
        <Image 
          source={focused ? require('@/assets/icons/CafeTab1.png') : require('@/assets/icons/CafeTab.png')} 
          style={{ width: 36, height: 36 }} 
        />
        ),
      }}
      />
      <Tabs.Screen
      name="test"
      options={{
        title: '貼文',
        tabBarIcon: ({ color, focused }) => (
        <Image 
          source={focused ? require('@/assets/icons/MsgTab1.png') : require('@/assets/icons/MsgTab.png')} 
          style={{ width: 36, height: 36 }} 
        />
        ),
      }}
      />
       <Tabs.Screen
      name="profile"
      options={{
        title: '自介',
        tabBarIcon: ({ color, focused }) => (
        <Image 
          source={focused ? require('@/assets/icons/ProfileTab1.png') : require('@/assets/icons/ProfileTab.png')} 
          style={{ width: 36, height: 36 }} 
        />
        ),
      }}
      />
     
    </Tabs>
  );
}
