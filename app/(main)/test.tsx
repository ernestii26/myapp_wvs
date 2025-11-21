import { Text, View, StyleSheet } from 'react-native';
import Test from '@/components/Test';
export default function LibraryScreen() {
  return (
    <Test />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
  },
});
