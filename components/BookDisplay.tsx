import { StyleSheet, View, Text, Image } from 'react-native';

const BookDisplay = ({ isbn }: { isbn: string }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: `https://pictures.abebooks.com/isbn/${isbn}-de.jpg` }}
        style={styles.cover}
      />
      <Text>{isbn}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cover: {
    width: 100,
    height: 150,
    borderRadius: 6,
    marginBottom: 6,
    marginRight: 6,
  },
});

export default BookDisplay;
