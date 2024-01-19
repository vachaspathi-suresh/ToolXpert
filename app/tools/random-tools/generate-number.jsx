import { Stack } from "expo-router";
import {
  Button,
  FormControl,
  HStack,
  Input,
  Text,
  VStack,
  useColorModeValue,
} from "native-base";
import { useEffect, useRef, useState } from "react";
import { Animated, SafeAreaView } from "react-native";
import currTheme from "../../colors";

const GenerateNumber = () => {
  const theme = currTheme(useColorModeValue("light", "dark"));
  const animation = useRef(new Animated.Value(0)).current;
  const [isRolling, setIsRolling] = useState(false);
  const [number, setNumber] = useState(3);
  const [from, setFrom] = useState("0");
  const [to, setTo] = useState("10");
  useEffect(() => {
    Animated.spring(animation, {
      toValue: isRolling ? 1 : 0,
      useNativeDriver: true,
    }).start();
  }, [isRolling]);
  const generateRandom = () => {
    let tTo = parseInt(to);
    let tFrom = parseInt(from);
    if (!parseInt(to)) {
      setTo("10");
      tTo = 10;
    }
    if (!parseInt(from)) {
      setFrom("0");
      tFrom = 0;
    }
    if (parseInt(to) < parseInt(from)) {
      setTo(parseInt(from) + 1 + "");
      tTo = tFrom + 1;
    }
    setIsRolling(true);
    setTimeout(() => {
      let num = Math.floor(Math.random() * (tTo - tFrom + 1)) + tFrom;
      setNumber(num);
      setIsRolling(false);
    }, 500);
  };
  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          headerTitle: "Random Number",
        }}
      />
      <VStack marginY={30} space={15} alignItems={"center"}>
        <Text fontSize={40}>Random Number</Text>
        <Animated.View
          style={[
            {
              transform: [
                {
                  scale: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 50],
                  }),
                },
                {
                  rotate: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0deg", "810deg"],
                  }),
                },
              ],
            },
          ]}
        >
          <Text fontSize={number > 100000 ? 90 : number > 10000 ? 120 : 150}>
            {number}
          </Text>
        </Animated.View>
        <HStack space={40} justifyContent={"space-between"}>
          <FormControl width={100}>
            <FormControl.Label>From:</FormControl.Label>
            <Input
              placeholder="Enter a number(0-100000000)"
              keyboardType="number-pad"
              value={from}
              onChangeText={(t) => {
                let temp = t.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, "");
                try {
                  if (parseInt(temp) >= 100000000)
                    setFrom(((parseInt(temp) / 10) | 0) + "");
                  else setFrom(temp);
                } catch (error) {
                  setFrom("0");
                }
              }}
              bgColor={theme.colors.teal[50]}
              borderWidth={2}
              _dark={{ focusOutlineColor: "#788F95", color: "black" }}
            />
          </FormControl>
          <FormControl w={100}>
            <FormControl.Label>To:</FormControl.Label>
            <Input
              placeholder="Enter a number(0-100000000)"
              keyboardType="number-pad"
              value={to}
              onChangeText={(t) => {
                let temp = t.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, "");
                try {
                  if (parseInt(temp) >= 100000000)
                    setTo(((parseInt(temp) / 10) | 0) + "");
                  else setTo(temp);
                } catch (error) {
                  setTo("10");
                }
              }}
              bgColor={theme.colors.teal[50]}
              borderWidth={2}
              _dark={{ focusOutlineColor: "#788F95", color: "black" }}
            />
          </FormControl>
        </HStack>
        <Button
          size={"lg"}
          onPress={() => {
            generateRandom();
          }}
        >
          Generate
        </Button>
      </VStack>
    </SafeAreaView>
  );
};

export default GenerateNumber;
