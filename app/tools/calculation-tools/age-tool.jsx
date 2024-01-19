import { MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ClipBoard from "expo-clipboard";
import { Stack } from "expo-router";
import {
  Button,
  FormControl,
  HStack,
  IconButton,
  Input,
  Pressable,
  Text,
  Toast,
  VStack,
  useColorModeValue,
} from "native-base";
import { useState } from "react";
import { SafeAreaView } from "react-native";
import { ageCalculate } from "../../../tool-functions/calculatorTools";
import currTheme from "../../colors";

const AgeTool = () => {
  const theme = currTheme(useColorModeValue("light", "dark"));
  const [base, setBase] = useState(new Date());
  const [dob, setDob] = useState("");
  const [isPicker, setIsPicker] = useState(false);
  const [ans, setAns] = useState({ years: "", days: "" });
  const copyToClipboard = async () => {
    try {
      await ClipBoard.setStringAsync(ans.years + " & " + ans.days);
      Toast.show({
        title: "Copied To Clipboard",
        avoidKeyboard: true,
      });
    } catch (e) {
      console.log(e);
    }
  };
  const startCalculate = () => {
    let tem = ageCalculate(dob);
    setAns({
      years: "Your Age is " + tem.years,
      days: "Your Next Birthday is in " + tem.days + "days.",
    });
  };
  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          headerTitle: "Age Calculator",
        }}
      />
      <VStack marginY={30} marginX={2} space={5} alignItems={"center"}>
        <Text fontSize={35}>Age Calculator</Text>
        <Text alignSelf={"flex-start"}>Date of Birth(D.O.B)</Text>
        {isPicker && (
          <DateTimePicker
            mode="date"
            display="spinner"
            value={base}
            maximumDate={new Date()}
            onChange={({ type }, val) => {
              if (type === "set") {
                let va = val;
                setIsPicker((prev) => !prev);
                setBase(va);
                setDob(va.toDateString());
              } else setIsPicker((prev) => !prev);
            }}
          />
        )}
        {!isPicker && (
          <Pressable
            onPress={() => {
              setIsPicker((prev) => !prev);
            }}
          >
            <Input
              placeholder={new Date().toDateString()}
              w="100%"
              isReadOnly
              editable={false}
              keyboardType="number-pad"
              value={dob}
              borderWidth={3}
              borderColor={theme.colors.teal[150]}
              bgColor={theme.colors.teal[50]}
              _dark={{ focusOutlineColor: "#788F95", color: "black" }}
            />
          </Pressable>
        )}
        <HStack width={"100%"} marginY={5} space={3} justifyContent={"center"}>
          <Button
            size={"lg"}
            width={"84%"}
            variant={"subtle"}
            bgColor={theme.colors.teal[500]}
            onPress={startCalculate}
          >
            Calculate
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
        <FormControl isReadOnly>
          <FormControl.Label>Answer</FormControl.Label>
          <Input
            placeholder="6"
            w="100%"
            keyboardType="number-pad"
            value={ans.years}
            borderWidth={3}
            borderColor={theme.colors.teal[150]}
            bgColor={theme.colors.teal[50]}
            _dark={{ focusOutlineColor: "#788F95", color: "black" }}
          />
          <FormControl.HelperText>{ans.days}</FormControl.HelperText>
        </FormControl>
      </VStack>
    </SafeAreaView>
  );
};

export default AgeTool;
