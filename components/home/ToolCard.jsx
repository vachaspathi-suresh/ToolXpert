import { useRouter } from "expo-router";
import {
  Circle,
  Icon,
  Pressable,
  Square,
  Text,
  useColorModeValue,
} from "native-base";
import currTheme, { florescent } from "../../app/colors";
import { Dimensions } from "react-native";

const ToolCard = ({ tool }) => {
  const { width } = Dimensions.get("window");
  const theme = currTheme(useColorModeValue("light", "dark"));
  const router = useRouter();
  return (
    <Pressable
      onPress={() => {
        router.push("/" + tool.route);
      }}
    >
      <Square
        size={width / 2 - width / 9}
        margin={width / 41}
        backgroundColor={theme.colors.teal[100]}
        shadow={5}
        rounded={8}
      >
        <Circle size="48%" backgroundColor={florescent[tool.color - (1 % 7)]}>
          {tool.icon.isCustom ? (
            <tool.icon.pack size={width / 7} color={"gray.800"} />
          ) : (
            <Icon
              as={tool.icon.pack}
              name={tool.icon.id}
              size={width / 7}
              color={"gray.800"}
            />
          )}
        </Circle>
        <Text style={{ fontFamily: "Lumanosimo-Regular", fontSize: 14 }}>
          {tool.title}
        </Text>
      </Square>
    </Pressable>
  );
};

export default ToolCard;
