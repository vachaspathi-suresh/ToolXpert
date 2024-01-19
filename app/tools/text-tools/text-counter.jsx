import { Stack } from "expo-router";
import {
  Button,
  CheckIcon,
  Select,
  Text,
  TextArea,
  VStack,
  useColorModeValue,
} from "native-base";
import { useState } from "react";
import { SafeAreaView } from "react-native";
import {
  countChar,
  countLines,
  countSpaces,
  countWords,
} from "../../../tool-functions/textTools";
import currTheme from "../../colors";

const TextCounter = () => {
  const theme = currTheme(useColorModeValue("light", "dark"));
  const [type, setType] = useState("word");
  const [text, setText] = useState();
  const [result, setResult] = useState();
  const startCount = () => {
    let ans = "";
    switch (type) {
      case "word":
        ans = "Total Words: " + countWords(text);
        break;
      case "line":
        ans = "Total Lines: " + countLines(text);
        break;
      case "space":
        ans = "Total White Spaces: " + countSpaces(text);
        break;
      case "char":
        ans = "Total Characters: " + countChar(text);
        break;
      default:
        ans = null;
        break;
    }
    setResult(ans);
  };
  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          headerTitle: "Text Counter",
        }}
      />
      <VStack marginY={30} space={2}>
        <Text fontSize={25}>What to Count?</Text>
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
          <Select.Item label="Words" value="word" />
          <Select.Item label="Lines" value="line" />
          <Select.Item label="White Space" value="space" />
          <Select.Item label="Characters" value="char" />
        </Select>
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
        <Text fontSize={20}>{result}</Text>
        <Button
          size={"lg"}
          variant={"subtle"}
          bgColor={theme.colors.teal[500]}
          onPress={startCount}
        >
          Count
        </Button>
      </VStack>
    </SafeAreaView>
  );
};

export default TextCounter;
