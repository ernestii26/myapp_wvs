import Loading from '@/container/pages/Loading';
import { Stack } from 'expo-router';

export default function LoadingScreen() {
    return (
        <>
            <Stack.Screen />
            <Loading />
        </>
    );
}