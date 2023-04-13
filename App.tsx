import {
  Button,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

interface Todo {
  id: number;
  title: string;
}

export default function App() {
  const preTodos = [
    { id: 1, title: 'Todo 1' },
    { id: 2, title: 'Todo 2' },
  ];
  const [text, onChangeText] = useState('');
  const [todos, setTodos] = useState<Todo[]>(preTodos);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@todos');
        return jsonValue != null ? JSON.parse(jsonValue) : [];
      } catch (e) {
        console.warn(e);
      }
    };

    const loadData = async () => {
      let loadedTodos = await getData();
      setTodos(loadedTodos);
    };

    loadData();
  }, []);

  useEffect(() => {
    storeData();
  }, [todos]);

  const storeData = async () => {
    try {
      const jsonValue = JSON.stringify(todos);
      await AsyncStorage.setItem('@todos', jsonValue);
    } catch (e) {
      console.warn(e);
    }
  };

  const handleAddTodo = () => {
    if (!text) return;

    let newTodo: Todo = {
      id: Math.floor(Math.random() * 2024),
      title: text,
    };
    setTodos([...todos, newTodo]);
    onChangeText('');
  };

  const onDelete = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.inner}>
          <View>
            <Text style={styles.header}>Todo App with persistent Storage</Text>
            {todos.map(todo => {
              return (
                <View key={todo.id} style={styles.todoContainer}>
                  <Text>{todo.title}</Text>
                  <TouchableOpacity
                    style={styles.delete}
                    onPress={() => onDelete(todo.id)}
                  >
                    <Text>Delete</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
          <View>
            <TextInput
              placeholder="New Todo"
              style={styles.textInput}
              keyboardType="default"
              value={text}
              onChangeText={onChangeText}
              onSubmitEditing={handleAddTodo}
            />
            <Button title="Add Todo" onPress={handleAddTodo} />
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    padding: 24, // FIXME: not working
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    fontSize: 22,
    marginBottom: 48,
    textAlign: 'center',
  },
  textInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 6,
  },
  todoContainer: {
    alignSelf: 'stretch',
    marginBottom: 6,
    paddingHorizontal: 12,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  delete: {
    backgroundColor: '#ccc',
    padding: 4,
    borderRadius: 6,
  },
});
