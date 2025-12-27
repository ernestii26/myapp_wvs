import Loading from '@/components/Loading';
import TeacherIconButton from '@/components/Teacher';
import { useSocial } from '@/container/hooks/useSocial';
import { Link, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from '../../components/Button';

const Home = () => {
  const { isInitialized, isAuthenticated, roles, InitDataSignOut } = useSocial();
  const router = useRouter();

  useEffect(() => {
      console.log("[Home]", isInitialized, isAuthenticated, roles)
      if((isInitialized && !isAuthenticated) || (isInitialized && isAuthenticated && roles?.length == 0)){
          console.log("前往 /login")
          router.replace("/login");
      }
  },[isInitialized, isAuthenticated, roles])

  if (!isInitialized || !isAuthenticated || roles == undefined) {
      return <Loading text="" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home screen</Text>
      <Link href="/test" style={styles.button}>
        Go to test screen
      </Link>
      <Link href="/profile" style={styles.button}>
        Go to Profile screen
      </Link>
      <Link href="/chat" style={styles.button}>
        Go to Chat screen
      </Link>
     <View style={styles.teacherContainer}>
        <Text style={styles.teacherLabel}>Teacher Icon:</Text>
        <TeacherIconButton
          onPress={() => alert('Default Button Pressed!')}
         />
      </View>

      <View style={styles.buttonContainer}>
        {/* <Button
          title="確定身份"
          state="default"
          onPress={() => alert('Default Button Pressed!')}
          style={styles.buttonSpacing}
        /> */}
        <Button
          title="登出"
          state="default"
          onPress={async () => {
            await InitDataSignOut();
          }}
          style={styles.buttonSpacing}
        />
      </View>
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
  teacherContainer: {
    flexDirection: 'column', // Stack label above the icon
    alignItems: 'center', // Center items horizontally
    marginTop: 20, // Add some spacing from the top
  },
  teacherLabel: {
    color: '#fff',
    marginBottom: 8, // Spacing between label and icon
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 20, // Add spacing from the top
    alignItems: 'center', // Center the button horizontally
  },
  buttonSpacing: {
    marginTop: 10, // Add spacing between buttons if needed
  },
});
