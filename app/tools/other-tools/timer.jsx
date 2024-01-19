import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import {
  HStack,
  IconButton,
  Pressable,
  Text,
  VStack,
  useColorModeValue,
} from "native-base";
import { useState } from "react";
import { SafeAreaView } from "react-native";
import { Timer } from "react-native-stopwatch-timer";
import TimePicker from "../../../components/other-tools/TimePicker";
import currTheme from "../../colors";
const TimerTool = () => {
  const theme = currTheme(useColorModeValue("light", "dark"));
  const [isRunning, setIsRunning] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const [isModel, setIsModel] = useState(false);
  const [time, setTime] = useState([0, 1, 0]);
  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          headerTitle: "Timer",
        }}
      />
      <VStack marginY={3} space={10} alignItems={"center"}>
        <Text fontSize={50}>Timer</Text>
        <Pressable onPress={() => setIsModel(true)}>
          <Timer
            totalDuration={(time[0] * 60 * 60 + time[1] * 60 + time[2]) * 1000}
            msecs
            start={isRunning}
            reset={isReset}
            options={{
              container: {
                backgroundColor: theme.colors.teal[200],
              },
              text: {
                fontSize: 55,
                color: theme.colors.grey[900],
              },
            }}
            handleFinish={() => {
              setIsReset(true);
              setIsRunning(false);
              alert("CountDown Timer Completed!!");
            }}
          />
        </Pressable>
        <HStack
          width={"100%"}
          marginY={30}
          space={6}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <IconButton
            variant={"outline"}
            _icon={{
              as: MaterialCommunityIcons,
              name: isRunning ? "pause" : "play",
              size: "4xl",
            }}
            h="75"
            w="75"
            rounded={"full"}
            borderWidth={2}
            borderColor={theme.colors.teal[500]}
            onPress={() => {
              setIsRunning((prev) => !prev);
              setIsReset(false);
            }}
          />
          <IconButton
            variant={"outline"}
            _icon={{
              as: MaterialCommunityIcons,
              name: "restore",
              size: "4xl",
            }}
            rounded="full"
            h="75"
            w="75"
            borderWidth={2}
            borderColor={theme.colors.teal[500]}
            onPress={() => {
              setIsRunning(false);
              setIsReset(true);
            }}
          />
        </HStack>
      </VStack>
      <TimePicker
        setShowModal={setIsModel}
        time={time}
        setTime={setTime}
        showModal={isModel}
        setReset={setIsReset}
      />
    </SafeAreaView>
  );
};

export default TimerTool;
