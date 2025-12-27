import { ThemedText } from "@/components/ThemedText";
import { Image, Pressable, View } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { useSocial } from "./hooks/useSocial";
import { useEffect, useState } from "react";
import { handleError } from "@/lib/sendMessage";
import Loading from '@/components/Loading';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { usePostPage } from "./hooks/usePostsPage";

const Post = ({postId} : {postId: string}) => {
    const { getIdDBPostCache } = usePostPage();
    const { user, loadingMessage, setLoadingMessage } = useSocial();
    const [post, setPost] = useState<any>(null);
    const insets = useSafeAreaInsets()

    useEffect(() => {
        const fetchPost = async () => {
            const data = await getIdDBPostCache(user.id, postId).catch(error => {handleError(error)});
            setPost(data);
        };

        if (postId) {
            setLoadingMessage("");
            fetchPost();
            setLoadingMessage(undefined);
        }
    }, [postId]);

    const router = useRouter()

    const pressAvatar = () => {
        router.push(`/${post.author.username}`)
    }

    if(loadingMessage !== undefined || !post){
        return (
            <Loading />
        );
    }
    return (
        <ThemedView style={{ paddingTop: insets.top + 10, paddingLeft: 20, height: '100%' }}>
        {/* 使用者資訊 */}
        <ThemedView >
            <Pressable onPress={pressAvatar} style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
                <Image
                source={{ uri: post.author.avatar }}
                style={{
                    width: 48,
                    height: 48,
                    borderRadius: 24,
                    marginRight: 12,
                    backgroundColor: "#ccc",
                }}
                />
                <ThemedText style={{ fontSize: 16, fontWeight: "bold" }}>
                {post.author.username}
                </ThemedText>
            </Pressable>
        </ThemedView>
            {/* 標題 */}
            <ThemedText style={{ fontSize: 24, fontWeight: "bold", marginBottom: 12 }}>
                {post.title}
            </ThemedText>

            {/* 內文 */}
            <ThemedText style={{ fontSize: 16, lineHeight: 24, marginLeft: 40 }}>{post.content}</ThemedText>
            <ThemedView style={{ flexDirection: "row", alignItems: "center", marginTop: 40, width: '100%' }}>
                <ThemedText style={{
                    backgroundColor: "blue",
                    fontSize: 20,
                    padding: 10,
                    color: 'white',
                    marginRight: 20,
                    borderRadius: 10,
                    opacity: post.check? 0.2: 1
                }}>未完成</ThemedText>
                <ThemedText style={{
                    backgroundColor: "blue",
                    fontSize: 20,
                    padding: 10,
                    color: 'white',
                    marginRight: 20,
                    borderRadius: 10,
                    opacity: post.check? 1: 0.2
                }}>已完成</ThemedText>
            </ThemedView>
        </ThemedView>
    );
}

export default Post;