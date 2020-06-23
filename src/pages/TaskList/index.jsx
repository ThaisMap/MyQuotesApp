import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Tasks = [
  {  id: "1",
    task: 'expo init bare workflow'
  },
  { id: "2",
    task: 'Ajustar horário do telefone'
  },
  { id: "3",
    task: 'Criar pastas e arquivos em src'
  },
  { id: "4",
    task: 'Instalar react navigation e dependências (https://reactnavigation.org/docs/getting-started/)'
  },
  { id: "5",
    task: 'Instalar react navigation Stack (https://reactnavigation.org/docs/hello-react-navigation)'
  },
  { id: "6",
    task: 'Atualizar expo-cli e rodar expo update'
  },
  { id: "7",
    task: 'Criar arquivo Routes.jsx e configurar "rotas" de navegação'
  },
  { id: "8",
    task: 'Criar arquivo Routes.jsx'
  },
];

function Item({ task }) {
  return (
    <View>
      <Text style={styles.items}>{task.id} - {task.task}</Text>
    </View>
  );
}

export default function TaskList(){
    return (
     <SafeAreaView style={styles.container}>
       <FlatList
       data = {Tasks} 
       renderItem = {({item}) => <Item task={item} />}
       keyExtractor = { item => item.id}
       />
     </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5FCFF',
    },
    title: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    items: { 
      color: '#333333',
      marginBottom: 5,
    },
  });