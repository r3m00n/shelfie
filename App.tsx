import { SafeAreaView, StyleSheet, Text, View, Button } from 'react-native';
import { useState } from 'react';
import BookList from './components/Booklist';
import Scan from './components/Scan';

export default function App() {
  const [books, setBooks] = useState<string[]>([]);
  const [showScan, setShowScan] = useState(false);
  const [modeIsAdd, setModeIsAdd] = useState(true);

  const toggleScan = (isAdd: boolean) => {
    setShowScan(true);
    setModeIsAdd(isAdd);
  };

  const handleScan = (type: string, isbn: string) => {
    if (type !== 'org.gs1.EAN-13') {
      console.log('Wrong type of code ', type);
      setShowScan(false);
      return;
    }

    const updatedBooks = modeIsAdd
      ? [...books, isbn]
      : books.filter(book => book !== isbn);
    setBooks(updatedBooks);
    setShowScan(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headline}>Shelfie - Your personal LibraryApp</Text>
      <BookList books={books} />
      {showScan && <Scan onScan={handleScan} />}
      <View style={styles.buttonContainer}>
        <Button title="Add Book" onPress={() => toggleScan(true)} />
        <Button title="Remove Book" onPress={() => toggleScan(false)} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 6,
  },
  headline: {
    textAlign: 'center',
    fontSize: 24,
    marginBottom: 16,
  },
  buttonContainer: {
    marginTop: 'auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
