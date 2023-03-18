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
import { AuthContext } from "../context/AuthContext";
import { api } from "../services/api";

export default function TaskBoard() {
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  type TaskProps = {
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
  getTasks()

  return (
    <SafeAreaView style={styles.container}>
    <Text style={styles.title}>Lista de Tarefas</Text>
    <ScrollView style={styles.scroll}>
      {tasks.map((task, index) => (
        <View key={index} style={styles.task}>
          <Text>Titulo: {task?.title}</Text>
          <Text>Descrição: {task?.description}</Text>
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
      input: {
        width: "90%",
        height: 60,
        backgroundColor: "#101026",
        borderRadius: 4,
        paddingHorizontal: 8,
        textAlign: "center",
        fontSize: 22,
        color: "#FFF",
        marginBottom: 10,
      },
      button: {
        width: "90%",
        height: 40,
        backgroundColor: "#3fffa3",
        borderRadius: 4,
        marginVertical: 12,
        justifyContent: "center",
        alignItems: "center",
      },
      buttonText: {
        fontSize: 18,
        color: "#101026",
        fontWeight: "bold",
      },
  scroll:{

  },
  task:{
    width: "95%",
    height: 60,
    backgroundColor: "#FFFFFF",
    marginBottom: 12,
    borderRadius: 4,
    paddingHorizontal: 8,
    color: "#FFFFF",
  }
});
