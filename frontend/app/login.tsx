import SignIn from '@/container/pages/SignIn';
import { Stack } from 'expo-router';

export default function LoginScreen() {
    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <SignIn />
        </>
    );
}