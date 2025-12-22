import ThreadPost from '@/components/ThreadPost';
import { usePosts } from '@/container/hooks/Posts';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface UserData {
    name: string;
    account: string;
    bio: string;
    avatar?: string | null;
}

interface ProfileProps {
    user: UserData;
    onEditProfile: () => void;
}

// 模擬金幣庫資料
const mockCoinItems = [
    {
        id: 1,
        image: require('@/assets/images/react-logo.png'), // 替換成實際圖片
        coins: 50,
        title: '和世界志工社的老師們一起去郊遊~~'
    },
    {
        id: 2,
        image: require('@/assets/images/react-logo.png'),
        coins: 30,
        title: '價值非凡的大驚喜！'
    },
    {
        id: 3,
        image: require('@/assets/images/react-logo.png'),
        coins: 15,
        title: '小獎品~下一季一起加油！'
    }
];

export default function Profile({ user, onEditProfile }: ProfileProps) {
    const [activeTab, setActiveTab] = useState('coins'); // 'posts' or 'coins'
    const [isTabsSticky, setIsTabsSticky] = useState(false);
    const [tabsOffsetY, setTabsOffsetY] = useState(0);
    const { posts } = usePosts();

    const handlePressThread = () => {
        console.log("導向留言串頁面...");
    };

    const handleScroll = (event: any) => {
        const scrollY = event.nativeEvent.contentOffset.y;
        // 當滾動位置超過Tabs的原始位置時，固定Tabs
        setIsTabsSticky(scrollY >= tabsOffsetY);
    };

    const handleTabsLayout = (event: any) => {
        const { y } = event.nativeEvent.layout;
        setTabsOffsetY(y);
    };

    // 篩選該用戶的貼文
    // 注意：如果 user.account 與貼文資料中的 handle 不匹配，這裡會顯示空白
    // 為了測試，您可以暫時移除 filter
    const userPosts = posts.filter(post => post.handle === user.account);
    // const userPosts = posts; // 如果想顯示所有貼文，請使用這行

    return (
        <View style={styles.container}>
            <ScrollView 
                style={styles.scrollView}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
            >
                {/* Top Banner */}
                <View style={styles.topBanner} />

                {/* Profile Header Area */}
                <View style={styles.headerContent}>
                    {/* Avatar */}
                    <View style={styles.avatarContainer}>
                        {user.avatar ? (
                            <Image source={{ uri: user.avatar }} style={styles.avatar} />
                        ) : (
                            <View style={styles.avatarPlaceholder} />
                        )}
                    </View>

                    {/* Name and Edit Button Row */}
                    <View style={styles.nameRow}>
                        <View>
                            <Text style={styles.userName}>{user.name}</Text>
                            <Text style={styles.userAccount}>{user.account}</Text>
                        </View>
                        <TouchableOpacity style={styles.editButton} onPress={onEditProfile}>
                            <Text style={styles.editButtonText}>編輯資料</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Bio */}
                    <View style={styles.bioContainer}>
                        <Text style={styles.bioText}>{user.bio}</Text>
                    </View>
                </View>

                {/* Tabs Placeholder - 當Tabs固定時佔位 */}
                {isTabsSticky && <View style={styles.tabsPlaceholder} />}

                {/* Tabs */}
                <View 
                    style={styles.tabContainer}
                    onLayout={handleTabsLayout}
                >
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'posts' && styles.activeTab]}
                        onPress={() => setActiveTab('posts')}
                    >
                        <Text style={[styles.tabText, activeTab === 'posts' && styles.activeTabText]}>
                            貼文
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'coins' && styles.activeTab]}
                        onPress={() => setActiveTab('coins')}
                    >
                        <Text style={[styles.tabText, activeTab === 'coins' && styles.activeTabText]}>
                            金幣庫
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Content Area */}
                <View style={styles.contentContainer}>
                    {activeTab === 'posts' ? (
                        <View style={styles.postsContainer}>
                            {/* 這裡暫時顯示所有貼文以符合設計圖效果。實際應用應使用 userPosts */}
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
                                    TeacherName={post.TeacherName}
                                    onPressThread={handlePressThread}
                                />
                            ))}
                        </View>
                    ) : (
                        <View style={styles.coinLibrary}>
                            {/* Season Reward */}
                            <View style={styles.seasonRewardContainer}>
                                <Text style={styles.seasonRewardTitle}>這一季的累積獎金......！</Text>
                                <Text style={styles.seasonRewardScore}>50/50</Text>
                            </View>

                            {/* Progress Bar */}
                            <View style={styles.progressBarContainer}>
                                <View style={styles.progressBar}>
                                    <View style={[styles.progressFill, { width: '100%' }]} />
                                </View>
                            </View>

                            {/* Coin Items List */}
                            <View style={styles.coinItemsList}>
                                {mockCoinItems.map((item) => (
                                    <View key={item.id} style={styles.coinItem}>
                                        <Image source={item.image} style={styles.coinItemImage} />
                                        <View style={styles.coinBadge}>
                                            <Text style={styles.coinBadgeText}>{item.coins}</Text>
                                        </View>
                                        <Text style={styles.coinItemTitle}>{item.title}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    )}
                </View>
            </ScrollView>

            {/* Sticky Tabs - 當滾動到頂部時顯示 */}
            {isTabsSticky && (
                <View style={styles.stickyTabContainer}>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'posts' && styles.activeTab]}
                        onPress={() => setActiveTab('posts')}
                    >
                        <Text style={[styles.tabText, activeTab === 'posts' && styles.activeTabText]}>
                            貼文
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'coins' && styles.activeTab]}
                        onPress={() => setActiveTab('coins')}
                    >
                        <Text style={[styles.tabText, activeTab === 'coins' && styles.activeTabText]}>
                            金幣庫
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    scrollView: {
        flex: 1,
    },
    topBanner: {
        height: 120,
        backgroundColor: '#E0F7FA',
    },
    headerContent: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    avatarContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        overflow: 'hidden',
        marginTop: -40,
        marginBottom: 10,
        borderWidth: 4,
        borderColor: '#FFF',
        backgroundColor: '#FFF',
    },
    avatar: {
        width: '100%',
        height: '100%',
    },
    avatarPlaceholder: {
        width: '100%',
        height: '100%',
        backgroundColor: '#D3D3D3',
    },
    nameRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 2,
    },
    userAccount: {
        fontSize: 14,
        color: '#888',
    },
    editButton: {
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#5DCCCC',
        backgroundColor: '#FFF',
        marginTop: 5,
    },
    editButtonText: {
        color: '#5DCCCC',
        fontSize: 14,
        fontWeight: '500',
    },
    bioContainer: {
        marginTop: 4,
    },
    bioText: {
        fontSize: 14,
        color: '#333',
        lineHeight: 20,
    },
    tabContainer: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        backgroundColor: '#FFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        marginTop: 10,
    },
    stickyTabContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        backgroundColor: '#FFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 5,
        zIndex: 1000,
    },
    tabsPlaceholder: {
        height: 54, // 與tab的高度相同 (padding 15 * 2 + text height + border)
    },
    tab: {
        flex: 1,
        paddingVertical: 15,
        alignItems: 'center',
        borderBottomWidth: 3,
        borderBottomColor: 'transparent',
    },
    activeTab: {
        borderBottomColor: '#A0E0E0', // Light blue underline
    },
    tabText: {
        fontSize: 16,
        color: '#888',
    },
    contentContainer: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    postsContainer: {
        paddingBottom: 20,
    },
    placeholderContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 40,
    },
    placeholderText: {
        fontSize: 14,
        color: '#999',
    },
    // Coin Library Styles
    coinLibrary: {
        padding: 20,
    },
    seasonRewardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    seasonRewardTitle: {
        fontSize: 15,
        color: '#000',
        fontWeight: 'bold',
    },
    seasonRewardScore: {
        fontSize: 15,
        color: '#000',
        fontWeight: 'bold',
    },
    progressBarContainer: {
        marginBottom: 30,
    },
    progressBar: {
        height: 24,
        backgroundColor: '#FFC0CB', // Pink background
        borderRadius: 12,
        overflow: 'hidden',
        opacity: 0.5,
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#FFB6C1', // Darker pink fill? Actually image shows solid pink bar
        borderRadius: 12,
    },
    coinItemsList: {
        gap: 20,
    },
    coinItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    coinItemImage: {
        width: 100,
        height: 60,
        borderRadius: 12,
        backgroundColor: '#E0F7FA', // Placeholder color
    },
    coinBadge: {
        backgroundColor: '#F5F0E6', // Beige
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        minWidth: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    coinBadgeText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    coinItemTitle: {
        flex: 1,
        fontSize: 14,
        color: '#333',
        lineHeight: 20,
        fontWeight: '500',
    },
});
