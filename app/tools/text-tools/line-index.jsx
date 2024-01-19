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
import { indexLines } from "../../../tool-functions/textTools";
import currTheme from "../../colors";

const IndexLine = () => {
  const theme = currTheme(useColorModeValue("light", "dark"));
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
  const startIndexing = () => {
    let ans = indexLines(text);
    setText(ans);
  };
  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          headerTitle: "Number the Lines",
        }}
      />
      <Text fontSize={25}>Number The Lines</Text>
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
          onPress={startIndexing}
        >
          Start
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

export default IndexLine;
