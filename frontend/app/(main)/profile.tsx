import EditProfileModal from '@/components/EditProfileModal';
import Profile from '@/container/pages/Profile';
import { useState } from 'react';

export default function ProfileScreen() {
    const [editModalVisible, setEditModalVisible] = useState(false);
    
    // 模擬用戶資料 - 實際使用時可以從 API 或 context 獲取
    const [userData, setUserData] = useState({
        name: '用戶名稱',
        account: '@account',
        bio: '自我介紹自我介紹自我介紹自我介紹自我介紹自我介紹自我介紹',
        avatar: null, // 可以放入頭像 URL
        school: '',
        grade: '',
        birthday: '',
    });

    const handleEditProfile = () => {
        setEditModalVisible(true);
    };

    const handleProfileUpdated = (updatedData: any) => {
        setUserData(updatedData);
    };

    return (
        <>
            <Profile 
                user={userData} 
                onEditProfile={handleEditProfile}
            />
            <EditProfileModal
                visible={editModalVisible}
                onClose={() => setEditModalVisible(false)}
                userData={userData}
                onProfileUpdated={handleProfileUpdated}
                userId="user123" // 實際使用時應該從 context 或 auth 獲取
            />
        </>
    );
}