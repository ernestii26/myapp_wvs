import { FlatList, RefreshControl, Button, View } from 'react-native';
import PostCard from '@/components/PostCard';
import { usePostPage } from './hooks/usePostsPage';
import { useState } from 'react';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedView } from '@/components/ThemedView';
import CreatePostModal from '@/components/CreatePostModal';
import { useDBPostsApi } from './hooks/useDBPostsApi';
import { useSocial } from './hooks/useSocial';
import Loading from '@/components/Loading';
import { useRouter } from 'expo-router';
import { handleError } from '@/lib/sendMessage';

const MainPage = () => {
    const { posts, isRefreshing, refreshPosts, loadMorePost } = usePostPage();
    const [isModalVisible, setModalVisible] = useState<boolean>(false);

    const insets = useSafeAreaInsets()

    const [title, setTitle] = useState<string>('');
    const [postContent, setPostContent] = useState<string>('');

    const { CreateDBPost } = useDBPostsApi();
    const { claims, loadingMessage, setLoadingMessage } = useSocial();

    const router = useRouter();

    const onSubmit = async () => {
        setLoadingMessage("創建貼文中")
        setModalVisible(false);
        const newPost = await CreateDBPost(claims.sub, title, postContent).then(async res => {
            await refreshPosts();
        }).catch(error => {
            handleError(error, "創建貼文失敗")}
        );
        setTitle(''); 
        setPostContent('');
        setLoadingMessage(undefined)
    } 
    return (
        <>
            {(loadingMessage != undefined) && <Loading text={loadingMessage} opacity={false}/>}
            <ThemedView style={{ paddingTop: insets.top, paddingBottom: insets.bottom}}>
                <FlatList
                    data={posts}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <PostCard 
                                                    postLink={() => router.push(`/post/${item.id}`)}
                                                    imageUri={item.author.avatar}
                                                    title={item.title}
                                                    content={item.content}
                                                    username={item.author.username}
                                                />}
                    refreshControl={
                        <RefreshControl refreshing={isRefreshing} onRefresh={refreshPosts} />
                    }
                    onEndReached={loadMorePost}
                    onEndReachedThreshold={0.5} // 捲動到剩下 50% 時觸發
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingBottom: insets.bottom + 80,
                    }} 

                />
                <View style={{
                    position: "absolute",
                    bottom: insets.bottom + 60, // 確保按鈕不會被底部 Safe Area 遮擋
                    width: 80,
                    height: 80,
                    right: 25,
                    borderRadius: 40, // 圓形 = 半徑為寬/高的一半
                    backgroundColor: 'white',
                    justifyContent: 'center',
                    alignItems: 'center',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.3,
                    shadowRadius: 4
                }}>
                    <Button title="創建" onPress={() => setModalVisible(true)} />
                </View>
                <CreatePostModal 
                    isVisible={isModalVisible}
                    onClose={() => setModalVisible(false)}
                    onSubmit={onSubmit}
                    title={title}
                    setTitle={setTitle}
                    postContent={postContent}
                    setPostContent={setPostContent}
                />
            </ThemedView>
        </>
    );
};

export default MainPage;
