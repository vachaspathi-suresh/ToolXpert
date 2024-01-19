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
  TextArea,
  Toast,
  VStack,
  WarningOutlineIcon,
  useColorModeValue,
} from "native-base";
import { useState } from "react";
import { SafeAreaView } from "react-native";
import {
  average,
  checkValidNumber,
} from "../../../tool-functions/calculatorTools";
import currTheme from "../../colors";

const AverageTool = () => {
  const theme = currTheme(useColorModeValue("light", "dark"));
  const [base, setBase] = useState({ txtVal: "", isValid: true, value: [] });
  const [ans, setAns] = useState("");
  const copyToClipboard = async () => {
    try {
      await ClipBoard.setStringAsync(ans + "");
      Toast.show({
        title: "Copied To Clipboard",
        avoidKeyboard: true,
      });
    } catch (e) {
      console.log(e);
    }
  };
  const checkValidArray = (text) => {
    let lis = text.split(",").filter((i) => i.trim() !== "");
    let lisArr = [];
    let isValidArr = true;
    lis.forEach((i) => {
      let check = checkValidNumber(i, false);
      if (!check.valid) isValidArr = false;
      lisArr.push(check.num);
    });
    return isValidArr
      ? { valid: true, num: [...lisArr] }
      : { valid: false, num: [] };
  };
  const startCalculate = () => {
    if (base.txtVal.trim() !== "" && base.isValid) {
      setAns(average(base.value).toString());
    } else {
      let check = checkValidArray(base.txtVal.trim());
      setBase({ txtVal: base.txtVal, isValid: check.valid, value: check.num });
    }
  };
  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          headerTitle: "Average",
        }}
      />
      <VStack marginY={30} marginX={2} space={5} alignItems={"center"}>
        <Text fontSize={35}>Average Calculator</Text>
        <FormControl isInvalid={!base.isValid} isRequired>
          <FormControl.Label>Numbers</FormControl.Label>
          <TextArea
            placeholder="10,20,30,40,50"
            w="100%"
            height={250}
            keyboardType="number-pad"
            value={base.txtVal}
            onChangeText={(t) => {
              let check = checkValidArray(t.trim());
              setBase({ txtVal: t, isValid: check.valid, value: check.num });
            }}
            borderWidth={3}
            borderColor={theme.colors.teal[150]}
            bgColor={theme.colors.teal[50]}
            _dark={{ focusOutlineColor: "#788F95", color: "black" }}
          />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            Enter a valid list of numbers with a comma(,) as separator.
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
            placeholder="30"
            w="100%"
            keyboardType="number-pad"
            value={ans + ""}
            borderWidth={3}
            borderColor={theme.colors.teal[150]}
            bgColor={theme.colors.teal[50]}
            _dark={{ focusOutlineColor: "#788F95", color: "black" }}
          />
        </FormControl>
      </VStack>
    </SafeAreaView>
  );
};

export default AverageTool;
