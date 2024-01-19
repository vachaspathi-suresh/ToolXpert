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
import { checkValidNumber } from "../../../tool-functions/calculatorTools";
import { convertSpeed } from "../../../tool-functions/conversionTools";
import currTheme from "../../colors";

const Speed = () => {
  const theme = currTheme(useColorModeValue("light", "dark"));
  const [from, setFrom] = useState("ms");
  const [to, setTo] = useState("kmh");
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
      let ans = convertSpeed(fromValue.value, from, to);
      setToValue(ans);
    } else {
      let check = checkValidNumber(fromValue.txtVal.trim(), false);
      setFromValue({
        txtVal: fromValue.txtVal,
        isValid: check.valid,
        value: check.num,
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
          headerTitle: "Speed",
        }}
      />
      <VStack marginY={30} marginX={2} space={2} alignItems={"center"}>
        <Text fontSize={25}>Speed Convertor</Text>
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
                let check = checkValidNumber(t.trim(), false);
                setFromValue({
                  txtVal: t,
                  isValid: check.valid,
                  value: check.num,
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
            onValueChange={(val) => setFrom(val)}
          >
            <Select.Item label="Meter per Second" value="ms" />
            <Select.Item label="Miles per Second" value="mis" />
            <Select.Item label="KiloMeter per Second" value="kms" />
            <Select.Item label="KiloMeter per Hour" value="kmh" />
            <Select.Item label="Miles per Hour" value="mih" />
            <Select.Item label="Meter per Hour" value="mh" />
            <Select.Item label="KiloMeter per Minute" value="kmm" />
            <Select.Item label="Miles per Minute" value="mim" />
            <Select.Item label="Meter per Minute" value="mm" />
            <Select.Item label="Knot" value="k" />
            <Select.Item label="Mach" value="m" />
          </Select>
        </VStack>
        <FormControl isInvalid={!fromValue.isValid}>
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            Enter a valid number.
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
            <Select.Item label="Meter per Second" value="ms" />
            <Select.Item label="Miles per Second" value="mis" />
            <Select.Item label="KiloMeter per Second" value="kms" />
            <Select.Item label="KiloMeter per Hour" value="kmh" />
            <Select.Item label="Miles per Hour" value="mih" />
            <Select.Item label="Meter per Hour" value="mh" />
            <Select.Item label="KiloMeter per Minute" value="kmm" />
            <Select.Item label="Miles per Minute" value="mim" />
            <Select.Item label="Meter per Minute" value="mm" />
            <Select.Item label="Knot" value="k" />
            <Select.Item label="Mach" value="m" />
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

export default Speed;
