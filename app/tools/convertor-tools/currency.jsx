import { CURRENCY_COV_API_KEY } from "@env";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";
import * as ClipBoard from "expo-clipboard";
import { Stack } from "expo-router";
import {
  Button,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
  Toast,
  VStack,
  useColorModeValue,
} from "native-base";
import { useState } from "react";
import { SafeAreaView } from "react-native";
import CurrencyModel from "../../../components/convertor-tools/CurrencyModel";
import currTheme from "../../colors";

const Currency = () => {
  const theme = currTheme(useColorModeValue("light", "dark"));
  const [from, setFrom] = useState(["USD", "United States Dollar"]);
  const [to, setTo] = useState(["INR", "Indian Rupee"]);
  const [fromValue, setFromValue] = useState(1);
  const [toValue, setToValue] = useState(1);
  const [isToModel, setIsToModel] = useState(false);
  const [isFromModel, setIsFromModel] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const copyToClipboard = async () => {
    try {
      await ClipBoard.setStringAsync(toValue + "");
      Toast.show({
        title: "Copied To Clipboard",
        avoidKeyboard: true,
      });
    } catch (e) {
      console.log(e);
    }
  };
  const startConvert = () => {
    setIsLoading(true);
    axios
      .get(
        `https://v6.exchangerate-api.com/v6/${CURRENCY_COV_API_KEY}/pair/${from[0]}/${to[0]}/${fromValue}`
      )
      .then((response) => {
        setToValue(response.data.conversion_result);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setToValue(0);
        setIsLoading(false);
      });
  };
  const swap = () => {
    let temp = from;
    setFrom(to);
    setTo(temp);
    startConvert();
  };
  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          headerTitle: "Currency",
        }}
      />
      <VStack marginY={30} marginX={2} space={2} alignItems={"center"}>
        <Text fontSize={25}>Currency Convertor</Text>
        <VStack
          borderWidth={3}
          borderColor={theme.colors.teal[150]}
          rounded={"sm"}
        >
          <InputGroup
            w="full"
            rounded={"none"}
            bgColor={theme.colors.teal[50]}
            _dark={{ focusOutlineColor: "#788F95", color: "black" }}
          >
            <InputLeftAddon
              bgColor={theme.colors.teal[50]}
              width={"18%"}
              rounded={"none"}
              children={"From:"}
            />
            <Input
              placeholder="From"
              w="82%"
              rounded={"none"}
              keyboardType="number-pad"
              value={fromValue + ""}
              onChangeText={(t) =>
                setFromValue(t.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, ""))
              }
            />
          </InputGroup>
          <Button
            display={"flex"}
            alignContent={"space-between"}
            rounded={"none"}
            onPress={() => setIsFromModel(true)}
            endIcon={<Icon as={Ionicons} name="chevron-down" size="lg" />}
          >
            {`${from[1]} (${from[0]})`}
          </Button>
        </VStack>
        <IconButton
          variant={"ghost"}
          _icon={{
            as: MaterialCommunityIcons,
            name: "swap-vertical",
            size: "10",
          }}
          w="20%"
          borderRadius="full"
          onPress={() => {
            swap();
          }}
        />
        <VStack
          borderWidth={3}
          borderColor={theme.colors.teal[150]}
          rounded={"sm"}
        >
          <InputGroup
            w="full"
            bgColor={theme.colors.teal[50]}
            rounded={"none"}
            _dark={{ focusOutlineColor: "#788F95", color: "black" }}
          >
            <InputLeftAddon
              bgColor={theme.colors.teal[50]}
              width="18%"
              rounded={"none"}
              children={"To:"}
            />
            <Input
              placeholder="From"
              w="82%"
              rounded={"none"}
              isReadOnly
              keyboardType="number-pad"
              value={toValue + ""}
              onChangeText={(t) =>
                setToValue(t.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, ""))
              }
            />
          </InputGroup>
          <Button
            rounded={"none"}
            onPress={() => setIsToModel(true)}
            endIcon={<Icon as={Ionicons} name="chevron-down" size="lg" />}
          >
            {`${to[1]} (${to[0]})`}
          </Button>
        </VStack>
        <HStack width={"100%"} marginY={5} space={3} justifyContent={"center"}>
          <Button
            size={"lg"}
            width={"84%"}
            variant={"subtle"}
            bgColor={theme.colors.teal[500]}
            onPress={startConvert}
            isLoading={isLoading}
            isLoadingText="Converting"
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
      <CurrencyModel
        setShowModal={setIsFromModel}
        value={from}
        setValue={setFrom}
        showModal={isFromModel}
      />
      <CurrencyModel
        setShowModal={setIsToModel}
        value={to}
        setValue={setTo}
        showModal={isToModel}
      />
    </SafeAreaView>
  );
};

export default Currency;
