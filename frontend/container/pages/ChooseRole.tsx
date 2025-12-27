import Button from "@/components/Button";
import StudentIconButton from "@/components/Student";
import TeacherIconButton from "@/components/Teacher";
import { UserRole } from "@/constants/Roles";
import { saveToCache } from "@/lib/cache";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useLogtoUsersApi } from "../hooks/useLogtoUsersApi";
import { useSocial } from "../hooks/useSocial";

const ChooseRole = () => {
    const { claims, setRoles, user, setLoadingMessage } = useSocial();
    const [tempRole, setTempRole] = useState<UserRole>();
    const { handleLogtoUpdateRoles } = useLogtoUsersApi();

    const handleSelectRole = async (role: UserRole) => {
        setLoadingMessage("更新角色中");
        await handleLogtoUpdateRoles(claims?.sub, [role], setRoles, user?.primaryEmail).then(async () => {
            await saveToCache("roles", [role]);
        }).catch(() => {})
        setLoadingMessage(undefined);
    };

    return (
        <LinearGradient
            // blue at the top, white at the bottom
            colors={["#65A1FB", "#F9FBFF"]}
            start={{ x: 0, y: 0 }}   // top
            end={{ x: 0, y: 1 }}     // bottom
            style={styles.container}
        >
            <View style={styles.innerContainer}>
                <Text style={styles.titleText}>請問你的身份是⋯⋯？</Text>
                <View style={styles.buttonContainer}>
                    <View style={styles.buttonWrapper}>
                        <TeacherIconButton
                                isActive={tempRole === UserRole.Admin}
                                onPress={() => setTempRole(UserRole.Admin)}
                        />
                        <Text style={styles.buttonName}>老師</Text>
                        <Text style={[styles.buttonText, { textAlign: 'center' }]}>想在這裡和很多小朋友交流，解答、教學大家的課業問題。</Text>
                    </View>
                    <View style={styles.buttonWrapper}>
                        <StudentIconButton
                                isActive={tempRole === UserRole.User}
                                onPress={() => setTempRole(UserRole.User)}
                        />
                        <Text style={styles.buttonName}>學生</Text>
                        <Text style={[styles.buttonText, { textAlign: 'center' }]}>想在這裡和大家學習、進步，和營隊的老師聊天、問問題。</Text>
                    </View>
                </View>
                <Button
                    title="確定身份"
                    onPress={() => tempRole && handleSelectRole(tempRole)}
                    state={tempRole ? 'default' : 'disabled'}
                    style={{ width: 120, height: 60, marginTop: 20}}
                    textStyle={{ fontSize: 14 }}
                    paddingHorizontal={10}
                    paddingVertical={8}
                />
            </View>
        </LinearGradient>
    );
};

export default ChooseRole;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16
    },
    innerContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 30
    },
    buttonWrapper: {
        alignItems: 'center',
        width: '45%'
    },
    buttonName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5
    },
    buttonText: {
        fontSize: 14,
        color: '#666'
    }
});
