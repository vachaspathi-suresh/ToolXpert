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
import {
  checkValidNumber,
  factorial,
} from "../../../tool-functions/calculatorTools";
import currTheme from "../../colors";

const FactorialTool = () => {
  const theme = currTheme(useColorModeValue("light", "dark"));
  const [base, setBase] = useState({ txtVal: "", isValid: true, value: 0 });
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
  const startCalculate = () => {
    if (base.txtVal.trim() !== "" && base.isValid) {
      setAns(factorial(base.value).toString());
    } else {
      let check = checkValidNumber(base.txtVal.trim(), false);
      setBase({ txtVal: base.txtVal, isValid: check.valid, value: check.num });
    }
  };
  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          headerTitle: "Factorial",
        }}
      />
      <VStack marginY={30} marginX={2} space={5} alignItems={"center"}>
        <Text fontSize={35}>Factorial Calculator</Text>
        <FormControl isInvalid={!base.isValid} isRequired>
          <FormControl.Label>Number(n)</FormControl.Label>
          <Input
            placeholder="3"
            w="100%"
            keyboardType="number-pad"
            value={base.txtVal}
            onChangeText={(t) => {
              let check = checkValidNumber(t.trim(), false);
              setBase({ txtVal: t, isValid: check.valid, value: check.num });
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
            placeholder="6"
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

export default FactorialTool;
