import { API_BASE_URL } from '@/constants/config';
import { useState } from 'react';

export interface UserProfileData {
    name: string;
    account: string;
    bio: string;
    avatar?: string | null;
    school?: string;
    grade?: string;
    birthday?: string;
}

const API_URL = `${API_BASE_URL}/users/profile`;

export const useEditProfile = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const updateProfile = async (userId: string, profileData: Partial<UserProfileData>) => {
        setLoading(true);
        setError(null);
        
        try {
            const response = await fetch(`${API_URL}/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(profileData),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to update profile: ${errorText}`);
            }

            const result = await response.json();
            return result.data;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to update profile';
            setError(errorMessage);
            console.error('Error updating profile:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const uploadAvatar = async (userId: string, imageUri: string) => {
        setLoading(true);
        setError(null);

        try {
            const formData = new FormData();
            const filename = imageUri.split('/').pop();
            const match = /\.(\w+)$/.exec(filename || '');
            const type = match ? `image/${match[1]}` : `image/jpeg`;

            // @ts-ignore: React Native FormData expects an object with uri, name, type
            formData.append('avatar', {
                uri: imageUri,
                name: filename || 'avatar.jpg',
                type,
            });

            const response = await fetch(`${API_URL}/${userId}/avatar`, {
                method: 'PUT',
                body: formData,
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to upload avatar: ${errorText}`);
            }

            const result = await response.json();
            return result.data.avatar;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to upload avatar';
            setError(errorMessage);
            console.error('Error uploading avatar:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        updateProfile,
        uploadAvatar,
        loading,
        error,
    };
};
