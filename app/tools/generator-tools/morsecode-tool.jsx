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
  morseToText,
  textToMorse,
} from "../../../tool-functions/generatorTools";
import currTheme from "../../colors";

const MorseCodeConvertor = () => {
  const theme = currTheme(useColorModeValue("light", "dark"));
  const [type, setType] = useState("tmc");
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const copyToClipboard = async () => {
    try {
      await ClipBoard.setStringAsync(text2 + "");
      Toast.show({
        title: "Copied To Clipboard",
        avoidKeyboard: true,
      });
    } catch (e) {
      console.log(e);
    }
  };
  const startConvert = () => {
    let ans = "";
    switch (type) {
      case "tmc":
        ans = textToMorse(text1);
        break;
      case "mct":
        ans = morseToText(text1);
        break;
      default:
        ans = null;
        break;
    }
    setText2(ans);
  };
  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          headerTitle: "Morse Code",
        }}
      />
      <VStack marginY={30} space={2}>
        <Text fontSize={25}>Morse Code Convertor</Text>
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
          <Select.Item label="Text to Morse Code" value="tmc" />
          <Select.Item label="Morse code to Text" value="mct" />
        </Select>
        <TextArea
          value={text1}
          onChangeText={(t) => setText1(t)}
          placeholder={`Enter Your ${
            type === "tmc" ? "Text" : "Morse Code"
          } Here`}
          width={"100%"}
          borderWidth={3}
          borderColor={theme.colors.teal[150]}
          bgColor={theme.colors.teal[50]}
          h={200}
          _dark={{ focusOutlineColor: "#788F95", color: "black" }}
          clearButtonMode="while-editing"
          isFullWidth
        />
        <TextArea
          value={text2}
          isReadOnly
          placeholder={
            type === "tmc"
              ? "Your Morse Code Will Appear Here"
              : "Your Converted Text Will Appear Here"
          }
          fontSize={"lg"}
          width={"100%"}
          borderWidth={3}
          borderColor={theme.colors.teal[150]}
          bgColor={theme.colors.teal[50]}
          h={200}
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

export default MorseCodeConvertor;
