import { Text, View, StyleSheet } from 'react-native';
import BookShelf from '@/container/pages/BookShelf';
export default function BooksScreen() {
  return (
    <>
        <View style={styles.container}>
        {/* <Text style={styles.text}>Books screen</Text> */}
        </View>
        <BookShelf />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#25292e',
  },
});
