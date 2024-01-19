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

const SimpleCounter = () => {
  const theme = currTheme(useColorModeValue("light", "dark"));
  const [isCustom, setIsCustom] = useState(false);
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(10);
  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          headerTitle: "Simple Counter",
        }}
      />
      <VStack marginY={30} space={20} alignItems={"center"}>
        <Text fontSize={25}>Simple Counter</Text>

        <HStack
          width={"100%"}
          marginY={5}
          space={6}
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
            // bgColor={theme.colors.teal[500]}
            onPress={() => {
              setCount((prev) =>
                prev - step < -999999999 ? -999999999 : prev - step
              );
            }}
          />
          <Square
            borderWidth={3}
            borderColor={theme.colors.teal[500]}
            bg={theme.colors.teal[300]}
            width="120"
            height="120"
          >
            <Text
              fontSize={
                Math.abs(count) < 1000
                  ? 45
                  : Math.abs(count) < 1000000
                  ? 30
                  : 20
              }
              color={theme.colors.grey[900]}
            >
              {count}
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
            // bgColor={theme.colors.teal[500]}
            onPress={() => {
              setCount((prev) =>
                prev + step > 9999999999 ? 9999999999 : prev + step
              );
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

export default SimpleCounter;
