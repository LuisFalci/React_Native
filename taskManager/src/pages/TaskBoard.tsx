import React, { useState, useContext } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
} from "react-native";
import { api } from "../services/api";
import { Feather } from "@expo/vector-icons";

export default function TaskBoard() {
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  type TaskProps = {
    _id: string;
    title: string;
    description: string;
  };

  async function getTasks() {
    const response = await api.get("/task/getTasks");
    // se tiver task eu adiciono ela para o state
    if (response.data.tasks.length > 0) {
      setTasks(response.data.tasks);
    }
  }
  getTasks();

  async function deleteTask(index: string) {
    // envie uma solicitação de exclusão para a API
    await api.delete(`/task/deleteTask/${index}`);
    getTasks();
  }

  return (
    <SafeAreaView style={styles.container}>
    <Text style={styles.title}>Lista de Tarefas</Text>
    <ScrollView style={styles.scroll}>
      {tasks.map((task) => (
        <View key={task?._id} style={styles.taskBox}>
          <View style={styles.taskTextBox}>
            <Text style={styles.taskText} >Titulo: {task?.title}</Text>
            <Text style={styles.taskText}>Descrição: {task?.description}</Text>
          </View>
          <View style={styles.taskRemove}>
            <TouchableOpacity onPress={() => deleteTask(task?._id)}>
              <Feather name="trash-2" size={40} color="red" />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  </SafeAreaView>
  );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 15,
        backgroundColor: "#1d1d2e",
    },
    title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 24,
    },
    scroll: {
      width: '100%',
    },
    taskBox: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    taskTextBox:{
        flex: 1,
        alignItems: 'flex-start',
    },
    taskText: {
      color: "#FFF"
    },
    taskRemove: {
      alignItems: 'flex-end',
    },
  });