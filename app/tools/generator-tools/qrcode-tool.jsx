import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { Stack } from "expo-router";
import * as Sharing from "expo-sharing";
import {
  Box,
  Button,
  FormControl,
  HStack,
  Icon,
  Input,
  Text,
  Toast,
  VStack,
  View,
  useColorModeValue,
} from "native-base";
import { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native";
import QRCode from "react-native-qrcode-svg";
import currTheme from "../../colors";

const QRCodeTool = () => {
  const theme = currTheme(useColorModeValue("light", "dark"));
  const [QRValue, setQRValue] = useState("");
  const [QRSetValue, setQRSetValue] = useState("A ToolXpert App QR Code");
  const [QRImage, setQRImage] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);
  const ref = useRef();
  useEffect(() => {
    ref.current.toDataURL((data) => {
      setQRImage("data:image/png;base64," + data);
    });
  }, [QRSetValue]);
  const handleSave = async () => {
    setIsDownloading(true);
    const image_source =
      "https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80";
    var qr_data = "";
    ref.current.toDataURL((data) => {
      qr_data = data;
      setQRImage("data:image/png;base64," + data);
    });

    qr_data =
      qr_data === "" ? QRImage.split("data:image/png;base64,")[1] : qr_data;
    const filePath =
      FileSystem.cacheDirectory +
      "/toolxpert_" +
      new Date().getSeconds() +
      ".png";
    FileSystem.downloadAsync(image_source, filePath)
      .then(({ uri }) => {
        FileSystem.writeAsStringAsync(uri, qr_data, {
          encoding: FileSystem.EncodingType.Base64,
        })
          .then(async () => {
            const { status } = await MediaLibrary.requestPermissionsAsync();
            if (status === "granted") {
              MediaLibrary.saveToLibraryAsync(uri)
                .then(() => {
                  Toast.show({
                    avoidKeyboard: true,
                    duration: 3000,
                    render: () => {
                      return (
                        <Box
                          bg="emerald.400"
                          px="8"
                          py="5"
                          rounded="sm"
                          mt={15}
                        >
                          <Text fontSize={"4xl"}>Saved To Gallery!</Text>
                        </Box>
                      );
                    },
                  });
                })
                .catch((e) => console.log(e));
            }
          })
          .catch((e) => console.log(e));
      })
      .catch((e) => console.log(e));
    setIsDownloading(false);
  };
  const handleShare = async () => {
    try {
      const image_source =
        "https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80";
      var qr_data = "";
      ref.current.toDataURL((data) => {
        qr_data = data;
        setQRImage("data:image/png;base64," + data);
      });

      qr_data =
        qr_data === "" ? QRImage.split("data:image/png;base64,")[1] : qr_data;
      const filePath =
        FileSystem.cacheDirectory +
        "/toolxpert_" +
        new Date().getSeconds() +
        ".png";
      FileSystem.downloadAsync(image_source, filePath)
        .then(({ uri }) => {
          FileSystem.writeAsStringAsync(uri, qr_data, {
            encoding: FileSystem.EncodingType.Base64,
          })
            .then(async () => {
              Sharing.shareAsync(uri).catch((e) => console.log(e));
            })
            .catch((e) => console.log(e));
        })
        .catch((e) => console.log(e));
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          headerTitle: "QR Code",
        }}
      />
      <VStack marginY={11} space={5} alignItems={"center"}>
        <Text fontSize={30}>QR Code Generator</Text>
        <View
          padding={5}
          backgroundColor={theme.colors.teal[50]}
          rounded={"3xl"}
        >
          <QRCode
            size={300}
            value={QRSetValue ? QRSetValue : "A ToolXpert App QR Code"}
            getRef={ref}
          />
        </View>
        <FormControl>
          <FormControl.Label>Text/URL:</FormControl.Label>
          <Input
            placeholder="Enter a Text or Valid URL"
            value={QRValue}
            onChangeText={(t) => {
              setQRValue(t);
            }}
            bgColor={theme.colors.teal[50]}
            borderWidth={2}
            _dark={{ focusOutlineColor: "#788F95", color: "black" }}
          />
        </FormControl>
        <Button
          width={"full"}
          onPress={() => {
            setQRSetValue(QRValue);
          }}
        >
          Generate QR
        </Button>
        <HStack space={5}>
          <Button
            width={"40%"}
            onPress={handleShare}
            endIcon={
              <Icon
                as={MaterialCommunityIcons}
                name="share-variant"
                size="lg"
              />
            }
          >
            Share
          </Button>
          <Button
            width={"40%"}
            onPress={handleSave}
            endIcon={
              <Icon as={MaterialCommunityIcons} name="download" size="lg" />
            }
            isLoading={isDownloading}
            isLoadingText="Downloading"
          >
            Save to Gallery
          </Button>
        </HStack>
      </VStack>
    </SafeAreaView>
  );
};

export default QRCodeTool;
