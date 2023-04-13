import { StyleSheet, View, Text, ScrollView } from 'react-native';
import BookDisplay from './BookDisplay';

const BookList = ({ books }: { books: string[] }) => {
  return (
    <View>
      <Text style={styles.headline}>My Books</Text>
      {books.length ? (
        <ScrollView style={styles.scrollContainer}>
          {books.map(isbn => (
            <BookDisplay key={isbn} isbn={isbn} />
          ))}
        </ScrollView>
      ) : (
        <Text>
          You have no Books in your Libary yet. Click on "Add Book" to scan a Book and
          add it to your Libary.
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    alignSelf: 'stretch',
    height: 500,
  },
  headline: {
    fontSize: 24,
    fontWeight: '600',
  },
  bookContainer: {},
});

export default BookList;
