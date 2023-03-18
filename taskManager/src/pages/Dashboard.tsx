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

export default function Dashboard() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { user } = useContext(AuthContext);
  // <TaskProps> atribui uma tipagem ao state
  const [tasks, setTasks] = useState<TaskProps[]>([]);

  type TaskProps = {
    title: string;
    description: string;
  };

  async function createTask() {
    if (title === "") {
      return;
    }

    const task: TaskProps = {
      title,
      description,
    };

    const response = await api.post("/task/createTask", task);
    try {
      const response = await api.post("/task/createTask", task);
      if (response.status === 200) {
        alert("Tarefa criada com sucesso!");
      } else {
        alert("Erro ao criar tarefa. Tente novamente.");
      }
    } catch (error) {
      alert("Erro ao criar tarefa. Tente novamente.");
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Criar Tarefa</Text>

      <TextInput
        placeholder="Titulo"
        placeholderTextColor="#F0F0F0"
        style={styles.input}
        keyboardType="numeric"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        placeholder="Descrição"
        placeholderTextColor="#F0F0F0"
        style={styles.input}
        keyboardType="numeric"
        value={description}
        onChangeText={setDescription}
      />
      <TouchableOpacity style={styles.button} onPress={createTask}>
        <Text style={styles.buttonText}>Criar task</Text>
      </TouchableOpacity>
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
});
