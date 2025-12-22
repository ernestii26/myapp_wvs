import { Tabs, useRouter } from 'expo-router';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Entypo from '@expo/vector-icons/Entypo';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';

export default function TabLayout() {
  const router = useRouter();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#ffd33d',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '首頁',
          tabBarIcon: ({ color, focused }) => (
            <Entypo name="home" size={24} color="black" />
          ),
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: '圖書館',
          tabBarIcon: ({ color, focused }) => (
            <SimpleLineIcons name="magnifier" size={24} color="black" />
          ),
        }}
        listeners = {()=>({
          tabPress: e =>{
            e.preventDefault();
            router.replace('/(library)/books');
          },
        })}
      />
       <Tabs.Screen
        name="analytics"
        options={{
          title: '自介',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome6 name="user-large" size={24} color="black" />
          ),
        }}
      />
     
    </Tabs>
  );
}
