import {
  AntDesign,
  Entypo,
  Feather,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { FlatList } from "native-base";
import ToolCard from "./ToolCard";

const toolsList = [
  {
    title: "Text Tools",
    icon: { pack: Feather, id: "file-text", isCustom: false },
    route: "tools/text-tools/",
    color: 1,
  },
  {
    title: "Convertor Tools",
    icon: { pack: AntDesign, id: "swap", isCustom: false },
    route: "tools/convertor-tools/",
    color: 2,
  },
  {
    title: "Calculation Tools",
    icon: {
      pack: MaterialCommunityIcons,
      id: "calculator-variant-outline",
      isCustom: false,
    },
    route: "tools/calculation-tools/",
    color: 3,
  },
  {
    title: "Random Tools",
    icon: {
      pack: MaterialCommunityIcons,
      id: "dice-multiple-outline",
      isCustom: false,
    },
    route: "tools/random-tools/",
    color: 4,
  },
  {
    title: "Generator Tools",
    icon: { pack: MaterialCommunityIcons, id: "qrcode-edit", isCustom: false },
    route: "tools/generator-tools/",
    color: 5,
  },
  {
    title: "Other Tools",
    icon: { pack: Entypo, id: "tools", isCustom: false },
    route: "tools/other-tools/",
    color: 6,
  },
];
const ToolsList = () => {
  return (
    <FlatList
      data={toolsList}
      renderItem={({ item }) => <ToolCard key={item.color} tool={item} />}
      numColumns={2}
      keyExtractor={(i) => i.color}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default ToolsList;
