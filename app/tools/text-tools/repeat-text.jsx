import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ClipBoard from "expo-clipboard";
import { Stack } from "expo-router";
import {
  Button,
  HStack,
  IconButton,
  Input,
  Text,
  TextArea,
  Toast,
  VStack,
  useColorModeValue,
} from "native-base";
import { useState } from "react";
import { SafeAreaView } from "react-native";
import currTheme from "../../colors";

const RepeatText = () => {
  const theme = currTheme(useColorModeValue("light", "dark"));
  const [count, setCount] = useState(1);
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
    let ans = text.repeat(count);
    setText(ans);
  };
  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          headerTitle: "Repeat Text",
        }}
      />
      <VStack marginY={30} space={2}>
        <Text fontSize={25}>Count to Repeat:</Text>
        <Input
          placeholder="Enter a Number"
          w="100%"
          keyboardType="number-pad"
          value={count + ""}
          onChangeText={(t) =>
            setCount(t.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, ""))
          }
          borderWidth={3}
          borderColor={theme.colors.teal[150]}
          bgColor={theme.colors.teal[50]}
          _dark={{ focusOutlineColor: "#788F95", color: "black" }}
        />
        <TextArea
          value={text}
          onChangeText={(text) => setText(text)}
          placeholder="Enter the Text to be Repeated"
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
      </VStack>
    </SafeAreaView>
  );
};

export default RepeatText;
