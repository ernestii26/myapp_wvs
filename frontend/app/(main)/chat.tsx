import { Text, View, StyleSheet } from 'react-native';
import Navigation from '@/container/pages/Navigation';
export default function LibraryScreen() {
  return (
    <Navigation />
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
