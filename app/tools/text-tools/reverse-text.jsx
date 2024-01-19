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
import { reverseText, reverseWords } from "../../../tool-functions/textTools";
import currTheme from "../../colors";

const ReverseText = () => {
  const theme = currTheme(useColorModeValue("light", "dark"));
  const [type, setType] = useState("words");
  const [text, setText] = useState();
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
  const startReverse = () => {
    let ans = "";
    switch (type) {
      case "words":
        ans = reverseWords(text);
        break;
      case "text":
        ans = reverseText(text);
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
          headerTitle: "Reverse Text",
        }}
      />
      <VStack marginY={30} space={2}>
        <Text fontSize={25}>What to Reverse:</Text>
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
          <Select.Item label="Words" value="words" />
          <Select.Item label="Text" value="text" />
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
          onPress={startReverse}
        >
          Reverse
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

export default ReverseText;
