import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { FlatList } from "native-base";
import { SafeAreaView } from "react-native";
import ToolCard from "../../../components/home/ToolCard";
import { TextCounter } from "../../icons";
const toolsList = [
  {
    title: "Text Counter",
    color: 1,
    icon: { pack: TextCounter, id: "file-text", isCustom: true },
    route: "/tools/text-tools/text-counter",
  },
  {
    title: "Case Changer",
    color: 1,
    icon: { pack: MaterialCommunityIcons, id: "format-letter-case" },
    route: "/tools/text-tools/case-changer",
  },
  {
    title: "Sort Words",
    color: 1,
    icon: { pack: MaterialCommunityIcons, id: "sort-ascending" },
    route: "/tools/text-tools/sort-words",
  },
  {
    title: "Find & Replace",
    color: 1,
    icon: { pack: MaterialCommunityIcons, id: "find-replace" },
    route: "/tools/text-tools/find-replace",
  },
  {
    title: "Repeat Text",
    color: 1,
    icon: { pack: Feather, id: "repeat" },
    route: "/tools/text-tools/repeat-text",
  },
  {
    title: "Remove Spaces",
    color: 1,
    icon: { pack: MaterialCommunityIcons, id: "tray-remove" },
    route: "/tools/text-tools/remove-space",
  },
  {
    title: "Remove Duplicates",
    color: 1,
    icon: { pack: MaterialCommunityIcons, id: "text-box-remove-outline" },
    route: "/tools/text-tools/remove-duplicate",
  },
  {
    title: "Number the Lines",
    color: 1,
    icon: { pack: MaterialCommunityIcons, id: "format-list-text" },
    route: "/tools/text-tools/line-index",
  },
  {
    title: "Reverse Text",
    color: 1,
    icon: { pack: MaterialCommunityIcons, id: "keyboard-tab-reverse" },
    route: "/tools/text-tools/reverse-text",
  },
];
const TextTools = () => {
  return (
    <SafeAreaView>
      <FlatList
        data={toolsList}
        renderItem={({ item }) => <ToolCard key={item.title} tool={item} />}
        numColumns={2}
        keyExtractor={(i) => i.title}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default TextTools;
