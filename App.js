import { useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  View,
  Image,
  SafeAreaView,
  Text,
} from "react-native";
import TaskInput from "./components/TaskInput";

export default function App() {
  const [enteredTaskText, setEnteredTaskText] = useState("");
  const [boldTasks, setBoldTasks] = useState([]);
  const [normalTasks, setNormalTasks] = useState([]);
  const [crossedOutBoldTasks, setCrossedOutBoldTasks] = useState([]);
  const [crossedOutNormalTasks, setCrossedOutNormalTasks] = useState([]);

  function taskInputHandler(enteredText) {
    setEnteredTaskText(enteredText);
  }

  function addTaskHandler() {
    setNormalTasks((currentNormalTasks) => [
      ...currentNormalTasks,
      { text: enteredTaskText, key: Math.random().toString() },
    ]);
    setEnteredTaskText("");
  }

  function crossOutNormalTask(key) {
    setCrossedOutNormalTasks(
      crossedOutNormalTasks.concat(
        normalTasks.find((task) => {
          return task.key === key;
        })
      )
    );
    setNormalTasks((currentNormalTasks) => {
      return currentNormalTasks.filter((task) => task.key !== key);
    });
  }

  function uncrossOutNormalTask(key) {
    setNormalTasks(
      normalTasks.concat(
        crossedOutNormalTasks.find((task) => {
          return task.key === key;
        })
      )
    );
    setCrossedOutNormalTasks((currentCrossedOutNormalTasks) => {
      return currentCrossedOutNormalTasks.filter((task) => task.key !== key);
    });
  }

  function crossOutBoldTask(key) {
    setCrossedOutBoldTasks(
      crossedOutBoldTasks.concat(
        boldTasks.find((task) => {
          return task.key === key;
        })
      )
    );
    setBoldTasks((currentBoldTasks) => {
      return currentBoldTasks.filter((task) => task.key !== key);
    });
  }

  function uncrossOutBoldTask(key) {
    setBoldTasks(
      boldTasks.concat(
        crossedOutBoldTasks.find((task) => {
          return task.key === key;
        })
      )
    );
    setCrossedOutBoldTasks((currentCrossedOutBoldTasks) => {
      return currentCrossedOutBoldTasks.filter((task) => task.key !== key);
    });
  }

  function makeTextNormal(key) {
    setNormalTasks(
      normalTasks.concat(
        boldTasks.find((task) => {
          return task.key === key;
        })
      )
    );
    setBoldTasks((currentBoldTasks) => {
      return currentBoldTasks.filter((task) => task.key !== key);
    });
  }

  function makeTextBold(key) {
    setBoldTasks(
      boldTasks.concat(
        normalTasks.find((task) => {
          return task.key === key;
        })
      )
    );
    setNormalTasks((currentNormalTasks) => {
      return currentNormalTasks.filter((task) => task.key !== key);
    });
  }

  const DATA = [
    {
      id: "boldTasksList",
      list: (
        <FlatList
          scrollEnabled={false}
          style={styles.taskList}
          data={boldTasks}
          renderItem={(itemData) => {
            return (
              <View style={styles.taskItem}>
                <Pressable
                  onPress={crossOutBoldTask.bind(this, itemData.item.key)}
                >
                  <Image
                    style={styles.activeTaskTickcircle}
                    source={require("./assets/images/ActiveTaskIcon.png")}
                  />
                </Pressable>
                <Pressable
                  onPress={makeTextNormal.bind(this, itemData.item.key)}
                >
                  <Text style={boldText}>{itemData.item.text}</Text>
                </Pressable>
              </View>
            );
          }}
        />
      ),
    },
    {
      id: "normalTasksList",
      list: (
        <FlatList
          scrollEnabled={false}
          style={styles.taskList}
          data={normalTasks}
          renderItem={(itemData) => {
            return (
              <View style={styles.taskItem}>
                <Pressable
                  onPress={crossOutNormalTask.bind(this, itemData.item.key)}
                >
                  <Image
                    style={styles.activeTaskTickcircle}
                    source={require("./assets/images/ActiveTaskIcon.png")}
                  />
                </Pressable>
                <Pressable onPress={makeTextBold.bind(this, itemData.item.key)}>
                  <Text style={normalText}>{itemData.item.text}</Text>
                </Pressable>
              </View>
            );
          }}
        />
      ),
    },
    {
      id: "crossedOutBoldTasksList",
      list: (
        <FlatList
          scrollEnabled={false}
          style={styles.taskList}
          data={crossedOutBoldTasks}
          renderItem={(itemData) => {
            return (
              <View style={styles.taskItem}>
                <Pressable
                  onPress={uncrossOutBoldTask.bind(this, itemData.item.key)}
                >
                  <Image
                    style={styles.activeTaskTickcircle}
                    source={require("./assets/images/FinishedTaskIcon.png")}
                  />
                </Pressable>
                <Pressable>
                  <Text style={crossedOutBoldText}>{itemData.item.text}</Text>
                </Pressable>
              </View>
            );
          }}
        />
      ),
    },
    {
      id: "crossedOutNormalTasksList",
      list: (
        <FlatList
          scrollEnabled={false}
          style={styles.taskList}
          data={crossedOutNormalTasks}
          renderItem={(itemData) => {
            return (
              <View style={styles.taskItem}>
                <Pressable
                  onPress={uncrossOutNormalTask.bind(this, itemData.item.key)}
                >
                  <Image
                    style={styles.activeTaskTickcircle}
                    source={require("./assets/images/FinishedTaskIcon.png")}
                  />
                </Pressable>
                <Pressable>
                  <Text style={crossedOutNormalText}>{itemData.item.text}</Text>
                </Pressable>
              </View>
            );
          }}
        />
      ),
    },
    {
      id: "input",
      list: (
        <TaskInput
          onChangeText={taskInputHandler}
          enteredText={enteredTaskText}
        />
      ),
    },
  ];

  return (
    <SafeAreaView style={styles.body}>
      <View style={styles.appContainer}>
        <View style={styles.taskListContainer}>
          <FlatList
            data={DATA}
            renderItem={({ item }) => <View>{item.list}</View>}
            keyExtractor={(item) => item.id}
          ></FlatList>
        </View>

        <View style={styles.toolBarContainer}>
          <Pressable onPress={addTaskHandler}>
            <Image
              style={styles.tapButton}
              source={require("./assets/images/AddTaskButton.png")}
            />
          </Pressable>

          <Pressable>
            <Image
              style={styles.tapButton}
              source={require("./assets/images/NightModeButton.png")}
            />
          </Pressable>

          <Pressable>
            <Image
              style={styles.tapButton}
              source={require("./assets/images/DeleteTasksButton.png")}
            />
          </Pressable>

          <Pressable>
            <Image
              style={styles.tapButton}
              source={require("./assets/images/InfoButton.png")}
            />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const text = StyleSheet.create({
  basic: {
    fontSize: 25,
    marginLeft: 15,
  },
  normal: {
    fontWeight: "400",
  },
  bold: {
    fontWeight: "700",
  },
  crossedOutBold: {
    fontWeight: "700",
    textDecorationLine: "line-through",
  },
  crossedOutNormal: {
    fontWeight: "400",
    textDecorationLine: "line-through",
  },
});

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  appContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 20,
  },
  taskListContainer: {
    justifyContent: "flex-start",
    paddingHorizontal: 15,
    paddingVertical: 20,
    width: "85%",
    height: "90%",
    backgroundColor: "pink",
  },
  toolBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "85%",
    height: "10%",
    backgroundColor: "beige",
  },
  tapButton: {
    width: 60,
    height: 60,
  },
  taskItem: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  activeTaskTickcircle: {
    width: 25,
    height: 25,
  },
});

const normalText = StyleSheet.compose(text.basic, text.normal);
const boldText = StyleSheet.compose(text.basic, text.bold);
const crossedOutBoldText = StyleSheet.compose(text.basic, text.crossedOutBold);
const crossedOutNormalText = StyleSheet.compose(
  text.basic,
  text.crossedOutNormal
);
