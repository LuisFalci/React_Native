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

  return (
    <ScrollView style={styles.scroll}>
      {tasks.map((task, index) => (
        <View key={index} style={styles.task}>
          <Text>Titulo: {task?.title}</Text>
          <Text>Descrição: {task?.description}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1d1d2e",
  },
  logo: {
    marginBottom: 18,
  },
  inputContainer: {
    width: "95%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 32,
    paddingHorizontal: 14,
  },
  input: {
    width: "95%",
    height: 40,
    backgroundColor: "#101026",
    marginBottom: 12,
    borderRadius: 4,
    paddingHorizontal: 8,
    color: "#FFF",
  },
  button: {
    width: "95%",
    height: 40,
    backgroundColor: "#3fffa3",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#101026",
  },
  scroll:{

  },
  task:{
    width: "95%",
    height: 40,
    backgroundColor: "#FFFFFF",
    marginBottom: 12,
    borderRadius: 4,
    paddingHorizontal: 8,
    color: "#FFF",
  }
});
