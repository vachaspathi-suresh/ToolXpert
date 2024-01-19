import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import {
  Checkbox,
  HStack,
  IconButton,
  Input,
  Square,
  Text,
  VStack,
  useColorModeValue,
} from "native-base";
import { useState } from "react";
import { SafeAreaView } from "react-native";
import currTheme from "../../colors";

const ScoreBoard = () => {
  const theme = currTheme(useColorModeValue("light", "dark"));
  const [isCustom, setIsCustom] = useState(false);
  const [isNameEditA, setIsNameEditA] = useState(false);
  const [isNameEditB, setIsNameEditB] = useState(false);
  const [teamNames, setTeamNames] = useState(["Team A", "Team B"]);
  const [step, setStep] = useState(1);
  const [scoreA, setScoreA] = useState(0);
  const [scoreB, setScoreB] = useState(0);
  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          headerTitle: "Score Board",
        }}
      />
      <VStack marginY={0} space={5} alignItems={"center"}>
        <Text fontSize={25}>Score Board</Text>
        <HStack
          width={"80%"}
          space={1}
          justifyContent={"center"}
          alignItems={"center"}
        >
          {isNameEditA ? (
            <Input
              placeholder="Enter Team Name"
              value={teamNames[0]}
              bgColor={theme.colors.teal[50]}
              borderWidth={2}
              _dark={{ focusOutlineColor: "#788F95", color: "black" }}
              onChangeText={(t) => {
                setTeamNames((prev) => [t, prev[1]]);
              }}
            />
          ) : (
            <Text fontSize={20}>{teamNames[0]}</Text>
          )}
          <IconButton
            variant={"ghost"}
            _icon={{
              as: MaterialCommunityIcons,
              name: isNameEditA ? "check-bold" : "pencil",
              size: 5,
            }}
            borderColor={theme.colors.teal[500]}
            onPress={() => {
              if (teamNames[0] === "")
                setTeamNames((prev) => ["Team A", prev[1]]);
              setIsNameEditA((prev) => !prev);
            }}
          />
        </HStack>
        <HStack
          width={"100%"}
          space={1}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <IconButton
            variant={"outline"}
            _icon={{
              as: MaterialCommunityIcons,
              name: "minus",
              size: 8,
            }}
            h="50"
            w="50"
            borderWidth={2}
            borderColor={theme.colors.teal[500]}
            onPress={() => {
              setScoreA((prev) =>
                prev - step < -999999999 ? -999999999 : prev - step
              );
            }}
          />
          <Square
            borderWidth={3}
            borderColor={theme.colors.teal[500]}
            bg={theme.colors.teal[300]}
            width="50%"
            height="50"
          >
            <Text fontSize={30} color={theme.colors.grey[900]}>
              {scoreA}
            </Text>
          </Square>
          <IconButton
            variant={"outline"}
            _icon={{
              as: MaterialCommunityIcons,
              name: "plus",
              size: 8,
            }}
            h="50"
            w="50"
            borderWidth={2}
            borderColor={theme.colors.teal[500]}
            onPress={() => {
              setScoreA((prev) =>
                prev + step > 9999999999 ? 9999999999 : prev + step
              );
            }}
          />
          <IconButton
            variant={"ghost"}
            _icon={{
              as: MaterialCommunityIcons,
              name: "restore",
              size: 8,
            }}
            onPress={() => {
              setScoreA(0);
            }}
          />
        </HStack>

        <HStack
          width={"80%"}
          space={1}
          justifyContent={"center"}
          alignItems={"center"}
        >
          {isNameEditB ? (
            <Input
              placeholder="Enter Team Name"
              value={teamNames[1]}
              bgColor={theme.colors.teal[50]}
              borderWidth={2}
              _dark={{ focusOutlineColor: "#788F95", color: "black" }}
              onChangeText={(t) => {
                setTeamNames((prev) => [prev[0], t]);
              }}
            />
          ) : (
            <Text fontSize={20}>{teamNames[1]}</Text>
          )}
          <IconButton
            variant={"ghost"}
            _icon={{
              as: MaterialCommunityIcons,
              name: isNameEditB ? "check-bold" : "pencil",
              size: 5,
            }}
            borderColor={theme.colors.teal[500]}
            onPress={() => {
              if (teamNames[1] === "")
                setTeamNames((prev) => [prev[0], "Team B"]);
              setIsNameEditB((prev) => !prev);
            }}
          />
        </HStack>
        <HStack
          width={"100%"}
          space={1}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <IconButton
            variant={"outline"}
            _icon={{
              as: MaterialCommunityIcons,
              name: "minus",
              size: 8,
            }}
            h="50"
            w="50"
            borderWidth={2}
            borderColor={theme.colors.teal[500]}
            onPress={() => {
              setScoreB((prev) =>
                prev - step < -999999999 ? -999999999 : prev - step
              );
            }}
          />
          <Square
            borderWidth={3}
            borderColor={theme.colors.teal[500]}
            bg={theme.colors.teal[300]}
            width="50%"
            height="50"
          >
            <Text fontSize={30} color={theme.colors.grey[900]}>
              {scoreB}
            </Text>
          </Square>
          <IconButton
            variant={"outline"}
            _icon={{
              as: MaterialCommunityIcons,
              name: "plus",
              size: 8,
            }}
            h="50"
            w="50"
            borderWidth={2}
            borderColor={theme.colors.teal[500]}
            onPress={() => {
              setScoreB((prev) =>
                prev + step > 9999999999 ? 9999999999 : prev + step
              );
            }}
          />
          <IconButton
            variant={"ghost"}
            _icon={{
              as: MaterialCommunityIcons,
              name: "restore",
              size: 8,
            }}
            onPress={() => {
              setScoreB(0);
            }}
          />
        </HStack>
        <VStack space={3}>
          <Checkbox
            isChecked={isCustom}
            onChange={(state) => setIsCustom(state)}
          >
            <Text fontSize={20} color={theme.colors.grey[900]}>
              {"Custom Step Value" + (isCustom ? " (1-999)" : "")}
            </Text>
          </Checkbox>
          {isCustom && (
            <Input
              placeholder="Enter the step Value"
              keyboardType="number-pad"
              value={step + ""}
              onChangeText={(t) => {
                let temp = t.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, "");
                try {
                  if (parseInt(temp) < 1000 && parseInt(temp) > 0)
                    setStep(parseInt(temp));
                  else if (parseInt(temp) >= 1000)
                    setStep((parseInt(temp) / 10) | 0);
                  else setStep(1);
                } catch (error) {
                  setStep(1);
                }
              }}
              bgColor={theme.colors.teal[50]}
              borderWidth={2}
              _dark={{ focusOutlineColor: "#788F95", color: "black" }}
            />
          )}
        </VStack>
      </VStack>
    </SafeAreaView>
  );
};

export default ScoreBoard;
