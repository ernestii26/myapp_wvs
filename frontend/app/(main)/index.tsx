import { Text, View, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import Button from '../../components/Button';
import TeacherIconButton from '@/components/Teacher';

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home screen</Text>
      <Link href="/test" style={styles.button}>
        Go to test screen
      </Link>
      <Link href="/chat" style={styles.button}>
        Go to Chat screen
      </Link>
      <Link href="/login" style={styles.button}>
        Go to Login screen
      </Link>
     <View style={styles.teacherContainer}>
        <Text style={styles.teacherLabel}>Teacher Icon:</Text>
        <TeacherIconButton
          onPress={() => alert('Default Button Pressed!')}
         />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="確定身份"
          state="default"
          onPress={() => alert('Default Button Pressed!')}
          style={styles.buttonSpacing}
        />
      </View>
    </View>
  );
}

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
    marginTop: 20,
    alignItems: 'center',
  },
  teacherLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 15,
  },
  teacherSpacing: {
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  buttonSpacing: {
    marginBottom: 12,
    color: '#C5E9EA',
  },
});
