import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ClipBoard from "expo-clipboard";
import { Stack } from "expo-router";
import {
  Button,
  CheckIcon,
  FormControl,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Text,
  Toast,
  VStack,
  WarningOutlineIcon,
  useColorModeValue,
} from "native-base";
import { useState } from "react";
import { SafeAreaView } from "react-native";
import {
  checkNumSys,
  convertNumSys,
} from "../../../tool-functions/conversionTools";
import currTheme from "../../colors";

const NumberSystem = () => {
  const theme = currTheme(useColorModeValue("light", "dark"));
  const [from, setFrom] = useState("deci");
  const [to, setTo] = useState("bi");
  const [fromValue, setFromValue] = useState({
    txtVal: "1",
    isValid: true,
    value: 1,
  });
  const [toValue, setToValue] = useState(1);
  const copyToClipboard = async () => {
    try {
      await ClipBoard.setStringAsync(toValue + "");
      Toast.show({
        title: "Copied To Clipboard",
        avoidKeyboard: true,
      });
    } catch (e) {
      console.log(e);
    }
  };
  const startConvert = () => {
    if (fromValue.txtVal.trim() !== "" && fromValue.isValid) {
      let ans = convertNumSys(fromValue.value, from, to);
      setToValue(ans);
    } else {
      let check = checkNumSys(fromValue.txtVal.trim(), from);
      setFromValue({
        txtVal: fromValue.txtVal,
        isValid: check,
        value: fromValue.txtVal.trim(),
      });
    }
  };
  const swap = () => {
    let temp = from;
    setFrom(to);
    setTo(temp);
    startConvert();
  };
  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          headerTitle: "Number System",
        }}
      />
      <VStack marginY={30} marginX={2} space={2} alignItems={"center"}>
        <Text fontSize={25}>Number System Convertor</Text>
        <VStack
          borderWidth={3}
          borderColor={fromValue.isValid ? theme.colors.teal[150] : "red.600"}
          rounded={"sm"}
        >
          <InputGroup
            w="full"
            overflow={"hidden"}
            bgColor={theme.colors.teal[50]}
            _dark={{ focusOutlineColor: "#788F95", color: "black" }}
          >
            <InputLeftAddon
              bgColor={theme.colors.teal[50]}
              width={"18%"}
              children={"From:"}
            />
            <Input
              placeholder="From"
              w="82%"
              keyboardType="number-pad"
              value={fromValue.txtVal}
              onChangeText={(t) => {
                let check = checkNumSys(t.trim(), from);
                setFromValue({
                  txtVal: t,
                  isValid: check,
                  value: t.trim(),
                });
              }}
            />
          </InputGroup>
          <Select
            selectedValue={from}
            minWidth={300}
            _selectedItem={{
              bg: theme.colors.teal[200],
              endIcon: <CheckIcon size="5" />,
            }}
            onValueChange={(val) => {
              setFrom(val);
              let check = checkNumSys(fromValue.txtVal.trim(), val);
              setFromValue({
                txtVal: fromValue.txtVal,
                isValid: check,
                value: fromValue.txtVal.trim(),
              });
            }}
          >
            <Select.Item label="Decimal" value="deci" />
            <Select.Item label="Binary" value="bi" />
            <Select.Item label="Octal" value="oct" />
            <Select.Item label="Hexadecimal" value="hex" />
          </Select>
        </VStack>
        <FormControl isInvalid={!fromValue.isValid}>
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            Enter a valid Integer number.
          </FormControl.ErrorMessage>
        </FormControl>
        <IconButton
          variant={"ghost"}
          _icon={{
            as: MaterialCommunityIcons,
            name: "swap-vertical",
            size: "10",
          }}
          w="20%"
          borderRadius="full"
          onPress={() => {
            swap();
          }}
        />
        <VStack
          borderWidth={3}
          borderColor={theme.colors.teal[150]}
          rounded={"sm"}
        >
          <InputGroup
            w="full"
            bgColor={theme.colors.teal[50]}
            _dark={{ focusOutlineColor: "#788F95", color: "black" }}
          >
            <InputLeftAddon
              bgColor={theme.colors.teal[50]}
              width="18%"
              children={"To:"}
            />
            <Input
              placeholder="From"
              w="82%"
              isReadOnly
              keyboardType="number-pad"
              value={toValue + ""}
              onChangeText={(t) =>
                setToValue(t.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, ""))
              }
            />
          </InputGroup>
          <Select
            selectedValue={to}
            minWidth={300}
            _selectedItem={{
              bg: theme.colors.teal[200],
              endIcon: <CheckIcon size="5" />,
            }}
            onValueChange={(val) => setTo(val)}
          >
            <Select.Item label="Decimal" value="deci" />
            <Select.Item label="Binary" value="bi" />
            <Select.Item label="Octal" value="oct" />
            <Select.Item label="Hexadecimal" value="hex" />
          </Select>
        </VStack>
        <HStack width={"100%"} marginY={5} space={3} justifyContent={"center"}>
          <Button
            size={"lg"}
            width={"84%"}
            variant={"subtle"}
            bgColor={theme.colors.teal[500]}
            onPress={startConvert}
          >
            Convert
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
      </VStack>
    </SafeAreaView>
  );
};

export default NumberSystem;
