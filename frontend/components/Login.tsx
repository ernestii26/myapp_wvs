import Button from "@/components/Button";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View } from 'react-native';

const Login = ({ client, signIn }: {
    client: any;
    signIn: () => Promise<void>;
}) => {

    return (
        <LinearGradient
            // blue at the top, white at the bottom
            colors={["#65A1FB", "#F9FBFF"]}
            start={{ x: 0, y: 0 }}   // top
            end={{ x: 0, y: 1 }}     // bottom
            style={styles.container}
        >
        <View style={styles.innerContainer}>
            <Button  title = "登入" onPress={signIn} style={{ width: 120, height: 60, marginTop: 20}} textStyle={{ fontSize: 14 }} paddingHorizontal={10} paddingVertical={8} />
        </View>
        </LinearGradient>
    );
};

export default Login;

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
});
