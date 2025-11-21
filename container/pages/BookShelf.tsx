import React from "react";
import { FlatList, View, Text, StyleSheet, Dimensions, Alert } from "react-native";
import GridCard from '@/components/GridCards';

const DATA = [
  { id: '1', title: '2025', year: 2025 },
  { id: '2', title: 'React Guide', year: 2025 },
  { id: '3', title: 'TS 深入', year: 2025 },
  { id: '4', title: '小說 1', year: 2025 },
  { id: '5', title: '技術論文', year: 2025 },
  { id: '6', title: '筆記本 A', year: 2025 },
  { id: '7', title: '筆記本 B', year: 2025 }, // 修正重複 ID
  { id: '8', title: '筆記本 C', year: 2025 },
  { id: '9', title: '筆記本 D', year: 2025 },
  { id: '10', title: '筆記本 E', year: 2025 },
  { id: '11', title: '筆記本 F', year: 2025 },
];

const NUM_COLUMNS = 3;

interface BookData {
  id: string;
  title: string;
  year: number;
}

export default function BookShelf() {
    const screenWidth = Dimensions.get('window').width;
    const padding = 16; 
    const spacing = 10; 
    
    // ⭐ 修正 1: 使用 Math.floor 無條件捨去小數點，防止因像素渲染誤差導致最右邊被擠出去
    const cardWidth = Math.floor((screenWidth - (padding * 2) - (spacing * (NUM_COLUMNS - 1))) / NUM_COLUMNS);

    const renderGridItem = ({ item }: { item: BookData }) => (
        <View style={{ width: cardWidth, marginBottom: 15 }}>
            <GridCard 
                title={item.title}
                style={{ width: '100%', height: 139 }} 
                onPress={() => Alert.alert('View Item:', item.id)}
            />
        </View>
    );

    return (
        <FlatList
            data={DATA}
            // ⭐ 修正 2: 加上 index 確保 key 唯一 (防止渲染錯誤)
            keyExtractor={(item, index) => item.id + index}
            numColumns={NUM_COLUMNS} 
            renderItem={renderGridItem}
            
            contentContainerStyle={[
                styles.listContainer, 
                { paddingHorizontal: padding }
            ]} 
            
            columnWrapperStyle={{ 
                gap: spacing,
                // ⭐ 修正 3: 確保內容從左邊開始排，避免左右拉伸
                justifyContent: 'flex-start' 
            }}
        />
    );
}

const styles = StyleSheet.create({
    listContainer: {
        paddingTop: 10,
        paddingBottom: 20, // 增加底部留白更好看
    },
});