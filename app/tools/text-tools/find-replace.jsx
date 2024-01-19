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

const FindReplace = () => {
  const theme = currTheme(useColorModeValue("light", "dark"));
  const [find, setFind] = useState();
  const [replace, setReplace] = useState();
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
  const startReplace = () => {
    let ans = text.replaceAll(find, replace);
    setText(ans);
  };
  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          headerTitle: "Find & Replace",
        }}
      />

      <VStack marginY={30} space={2}>
        <Text fontSize={25}>Find:</Text>
        <Input
          placeholder="Enter the word to Find"
          w="100%"
          value={find}
          onChangeText={(t) => setFind(t)}
          borderWidth={2}
          borderColor={theme.colors.teal[150]}
          bgColor={theme.colors.teal[50]}
          _dark={{ focusOutlineColor: "#788F95", color: "black" }}
        />
        <Text fontSize={25}>Replace:</Text>
        <Input
          placeholder="Enter the word to Replace with"
          w="100%"
          value={replace}
          onChangeText={(t) => setReplace(t)}
          borderWidth={3}
          borderColor={theme.colors.teal[150]}
          bgColor={theme.colors.teal[50]}
          _dark={{ focusOutlineColor: "#788F95", color: "black" }}
        />
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
            onPress={startReplace}
          >
            Find&Replace
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

export default FindReplace;
