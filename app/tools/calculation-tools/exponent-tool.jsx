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
import { checkValidNumber } from "../../../tool-functions/calculatorTools";
import currTheme from "../../colors";

const ExponentTool = () => {
  const theme = currTheme(useColorModeValue("light", "dark"));
  const [base, setBase] = useState({ txtVal: "", isValid: true, value: 0 });
  const [exponent, setExponent] = useState({
    txtVal: "",
    isValid: true,
    value: 0,
  });
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
    if (base.txtVal.trim() !== "" && exponent.txtVal.trim() !== "") {
      if (base.isValid && exponent.isValid) {
        setAns(Math.pow(base.value, exponent.value));
      }
    } else {
      let check = checkValidNumber(base.txtVal.trim(), false);
      setBase({ txtVal: base.txtVal, isValid: check.valid, value: check.num });
      check = checkValidNumber(exponent.txtVal.trim(), false);
      setExponent({
        txtVal: exponent.txtVal,
        isValid: check.valid,
        value: check.num,
      });
    }
  };
  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          headerTitle: "Exponent",
        }}
      />
      <VStack marginY={30} marginX={2} space={5} alignItems={"center"}>
        <Text fontSize={35}>Exponent Calculator</Text>
        <FormControl isInvalid={!base.isValid} isRequired>
          <FormControl.Label>Base</FormControl.Label>
          <Input
            placeholder="2"
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

        <FormControl isInvalid={!exponent.isValid} isRequired>
          <FormControl.Label>Exponent</FormControl.Label>
          <Input
            placeholder="4"
            w="100%"
            keyboardType="number-pad"
            value={exponent.txtVal}
            onChangeText={(t) => {
              let check = checkValidNumber(t.trim(), false);
              setExponent({
                txtVal: t,
                isValid: check.valid,
                value: check.num,
              });
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
            placeholder="16"
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

export default ExponentTool;
