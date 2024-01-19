import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ClipBoard from "expo-clipboard";
import { Stack } from "expo-router";
import {
  Button,
  CheckIcon,
  HStack,
  IconButton,
  Select,
  Text,
  TextArea,
  Toast,
  VStack,
  useColorModeValue,
} from "native-base";
import { useState } from "react";
import { SafeAreaView } from "react-native";
import {
  invertCase,
  toCamelCase,
  toDotCase,
  toKebabCase,
  toPascalCase,
  toSnakeCase,
  toTitleCase,
} from "../../../tool-functions/textTools";
import currTheme from "../../colors";

const CaseChanger = () => {
  const theme = currTheme(useColorModeValue("light", "dark"));
  const [type, setType] = useState("upper");
  const [text, setText] = useState("");
  const copyToClipboard = async () => {
    try {
      await ClipBoard.setStringAsync(text + "");
      Toast.show({
        title: "Copied To Clipboard",
        avoidKeyboard: true,
      });
    } catch (e) {
      console.log(e);
    }
  };
  const startCount = () => {
    let ans = "";
    switch (type) {
      case "upper":
        ans = text.toUpperCase();
        break;
      case "lower":
        ans = text.toLowerCase();
        break;
      case "camel":
        ans = toCamelCase(text);
        break;
      case "pascal":
        ans = toPascalCase(text);
        break;
      case "title":
        ans = toTitleCase(text);
        break;
      case "snake":
        ans = toSnakeCase(text);
        break;
      case "kebab":
        ans = toKebabCase(text);
        break;
      case "invert":
        ans = invertCase(text);
        break;
      case "dot":
        ans = toDotCase(text);
        break;
      default:
        ans = null;
        break;
    }
    setText(ans);
  };
  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          headerTitle: "Case Changer",
        }}
      />
      <VStack marginY={30} space={2}>
        <Text fontSize={25}>Choose a Case Format:</Text>
        <Select
          selectedValue={type}
          minWidth={300}
          _selectedItem={{
            bg: theme.colors.teal[200],
            endIcon: <CheckIcon size="5" />,
          }}
          marginBottom={3}
          borderWidth={2}
          borderColor={theme.colors.teal[150]}
          onValueChange={(val) => setType(val)}
        >
          <Select.Item label="UPPER CASE" value="upper" />
          <Select.Item label="lower case" value="lower" />
          <Select.Item label="camelCase" value="camel" />
          <Select.Item label="PascalCase" value="pascal" />
          <Select.Item label="Title Case" value="title" />
          <Select.Item label="snake_case" value="snake" />
          <Select.Item label="kebab-case" value="kebab" />
          <Select.Item label="Invert case" value="invert" />
          <Select.Item label="dot.Case" value="dot" />
        </Select>
      </VStack>
      <TextArea
        value={text}
        onChangeText={(text) => setText(text)}
        placeholder="Enter Your Text Here"
        width={"100%"}
        borderWidth={3}
        borderColor={theme.colors.teal[150]}
        bgColor={theme.colors.teal[50]}
        h={300}
        _dark={{ focusOutlineColor: "#788F95", color: "black" }}
        clearButtonMode="while-editing"
        isFullWidth
      />
      <HStack width={"100%"} marginY={5} space={3} justifyContent={"center"}>
        <Button
          size={"lg"}
          width={"84%"}
          variant={"subtle"}
          bgColor={theme.colors.teal[500]}
          onPress={startCount}
        >
          Change
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
    </SafeAreaView>
  );
};

export default CaseChanger;
