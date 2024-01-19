import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import {
  HStack,
  IconButton,
  Text,
  VStack,
  useColorModeValue,
} from "native-base";
import { useState } from "react";
import { SafeAreaView } from "react-native";
import { Stopwatch } from "react-native-stopwatch-timer";
import currTheme from "../../colors";

const StopWatchTool = () => {
  const theme = currTheme(useColorModeValue("light", "dark"));
  const [isRunning, setIsRunning] = useState(false);
  const [isReset, setIsReset] = useState(false);

  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          headerTitle: "StopWatch",
        }}
      />
      <VStack marginY={3} space={10} alignItems={"center"}>
        <Text fontSize={50}>StopWatch</Text>
        <Stopwatch
          laps
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
        />
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
    </SafeAreaView>
  );
};

export default StopWatchTool;
