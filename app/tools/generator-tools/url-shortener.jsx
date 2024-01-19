import { URL_SHORTENER_API_KEY } from "@env";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";
import * as ClipBoard from "expo-clipboard";
import { Stack } from "expo-router";
import {
  Box,
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

const URLShortenerTool = () => {
  const theme = currTheme(useColorModeValue("light", "dark"));
  const [longURL, setLongURL] = useState("");
  const [shortURL, setShortURL] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const copyToClipboard = async () => {
    try {
      await ClipBoard.setStringAsync(shortURL + "");
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
    setIsLoading(true);
    axios
      .post(
        "https://luffy.cyclic.app/api/short",
        { origUrl: longURL },
        {
          headers: { Authorization: `Bearer ${URL_SHORTENER_API_KEY}` },
        }
      )
      .then((response) => {
        ans = response?.data?.shortUrl;
        setShortURL(ans);
      })
      .catch((e) => {
        console.log(e);
        Toast.show({
          avoidKeyboard: true,
          duration: 3000,
          render: () => {
            return (
              <Box bg="red.400" px="8" py="5" rounded="sm" mt={15}>
                <Text fontSize={"2xl"}>Invalid URL!</Text>
              </Box>
            );
          },
        });
      });
    setIsLoading(false);
  };
  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          headerTitle: "URL Shortener",
        }}
      />
      <VStack marginY={30} space={5}>
        <Text fontSize={25}>URL Shortener</Text>
        <TextArea
          value={longURL}
          onChangeText={(t) => setLongURL(t)}
          placeholder={"Enter Your Original URL"}
          width={"100%"}
          borderWidth={3}
          borderColor={theme.colors.teal[150]}
          bgColor={theme.colors.teal[50]}
          h={150}
          _dark={{ focusOutlineColor: "#788F95", color: "black" }}
          clearButtonMode="while-editing"
          isFullWidth
        />
        <Input
          placeholder="Shorten URL"
          w="full"
          isReadOnly
          _dark={{ focusOutlineColor: "#788F95", color: "black" }}
          value={shortURL}
        />
        <HStack width={"100%"} marginY={5} space={3} justifyContent={"center"}>
          <Button
            size={"lg"}
            width={"84%"}
            variant={"subtle"}
            bgColor={theme.colors.teal[500]}
            onPress={startConvert}
            isLoading={isLoading}
            isLoadingText="Shortening"
          >
            Generate
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

export default URLShortenerTool;
