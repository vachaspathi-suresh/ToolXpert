import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ClipBoard from "expo-clipboard";
import { Stack } from "expo-router";
import {
  Button,
  HStack,
  IconButton,
  Text,
  TextArea,
  Toast,
  useColorModeValue,
} from "native-base";
import { useState } from "react";
import { SafeAreaView } from "react-native";
import { sortWords } from "../../../tool-functions/textTools";
import currTheme from "../../colors";

const SortWords = () => {
  const theme = currTheme(useColorModeValue("light", "dark"));
  const [type, setType] = useState("upper");
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
  const startSort = () => {
    let ans = sortWords(text);
    setText(ans);
  };
  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          headerTitle: "Sort Words",
        }}
      />
      <Text fontSize={25}>Sort Words</Text>
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
          onPress={startSort}
        >
          Sort
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

export default SortWords;
