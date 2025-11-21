import Welcome from '@/container/pages/Welcome';
import { Stack } from 'expo-router';

export default function WelcomeScreen() {
    return (
        <>
            <Stack.Screen />
            <Welcome />
        </>
    );
}