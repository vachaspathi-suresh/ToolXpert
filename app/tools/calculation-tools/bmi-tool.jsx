import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ClipBoard from "expo-clipboard";
import { Stack } from "expo-router";
import {
  Button,
  FormControl,
  HStack,
  IconButton,
  Input,
  Text,
  Toast,
  VStack,
  WarningOutlineIcon,
  useColorModeValue,
} from "native-base";
import { useState } from "react";
import { SafeAreaView } from "react-native";
import { bmi, checkValidNumber } from "../../../tool-functions/calculatorTools";
import currTheme from "../../colors";

const BMITool = () => {
  const theme = currTheme(useColorModeValue("light", "dark"));
  const [weight, setWeight] = useState({ txtVal: "", isValid: true, value: 0 });
  const [height, setHeight] = useState({ txtVal: "", isValid: true, value: 1 });
  const [ans, setAns] = useState({ bmIndex: "", cond: "" });
  const copyToClipboard = async () => {
    try {
      await ClipBoard.setStringAsync(ans.bmIndex + " & " + ans.cond);
      Toast.show({
        title: "Copied To Clipboard",
        avoidKeyboard: true,
      });
    } catch (e) {
      console.log(e);
    }
  };
  const startCalculate = () => {
    if (weight.txtVal.trim() !== "" && height.txtVal.trim() !== "") {
      if (weight.isValid && height.isValid) {
        if (height.value === 0) {
          setHeight({
            txtVal: height.txtVal,
            isValid: height.isValid,
            value: 1,
          });
          setAns(bmi(weight.value, 1));
        } else setAns(bmi(weight.value, height.value));
      }
    } else {
      let check = checkValidNumber(weight.txtVal.trim(), false);
      setWeight({
        txtVal: weight.txtVal,
        isValid: check.valid,
        value: check.num,
      });
      check = checkValidNumber(height.txtVal.trim(), false);
      setHeight({
        txtVal: height.txtVal,
        isValid: check.valid,
        value: check.num,
      });
    }
  };
  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          headerTitle: "BMI",
        }}
      />
      <VStack marginY={30} marginX={2} space={5} alignItems={"center"}>
        <Text fontSize={35}>Body Mass Index(BMI)</Text>
        <FormControl isInvalid={!weight.isValid} isRequired>
          <FormControl.Label>Weight(in Kg)</FormControl.Label>
          <Input
            placeholder="70"
            w="100%"
            keyboardType="number-pad"
            value={weight.txtVal}
            onChangeText={(t) => {
              let check = checkValidNumber(t.trim(), false);
              setWeight({ txtVal: t, isValid: check.valid, value: check.num });
            }}
            borderWidth={3}
            borderColor={theme.colors.teal[150]}
            bgColor={theme.colors.teal[50]}
            _dark={{ focusOutlineColor: "#788F95", color: "black" }}
          />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            Enter a valid number.
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl isInvalid={!height.isValid} isRequired>
          <FormControl.Label>Height (in cm)</FormControl.Label>
          <Input
            placeholder="1.75"
            w="100%"
            keyboardType="number-pad"
            value={height.txtVal}
            onChangeText={(t) => {
              let check = checkValidNumber(t.trim(), false);
              setHeight({ txtVal: t, isValid: check.valid, value: check.num });
            }}
            borderWidth={3}
            borderColor={theme.colors.teal[150]}
            bgColor={theme.colors.teal[50]}
            _dark={{ focusOutlineColor: "#788F95", color: "black" }}
          />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            Enter a valid number.
          </FormControl.ErrorMessage>
        </FormControl>

        <HStack width={"100%"} marginY={5} space={3} justifyContent={"center"}>
          <Button
            size={"lg"}
            width={"84%"}
            variant={"subtle"}
            bgColor={theme.colors.teal[500]}
            onPress={startCalculate}
          >
            Calculate
          </Button>
          <IconButton
            variant={"subtle"}
            _icon={{
              as: MaterialCommunityIcons,
              name: "content-copy",
            }}
            bgColor={theme.colors.teal[500]}
            onPress={() => {
              copyToClipboard();
            }}
          />
        </HStack>
        <FormControl isReadOnly>
          <FormControl.Label>Answer</FormControl.Label>
          <Input
            placeholder="22.85"
            w="100%"
            keyboardType="number-pad"
            value={ans.bmIndex}
            borderWidth={3}
            borderColor={theme.colors.teal[150]}
            bgColor={theme.colors.teal[50]}
            _dark={{ focusOutlineColor: "#788F95", color: "black" }}
          />
          <FormControl.HelperText>{ans.cond}</FormControl.HelperText>
        </FormControl>
      </VStack>
    </SafeAreaView>
  );
};

export default BMITool;
