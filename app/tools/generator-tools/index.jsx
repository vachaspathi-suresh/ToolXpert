import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FlatList } from "native-base";
import { SafeAreaView } from "react-native";
import ToolCard from "../../../components/home/ToolCard";
import { MorseCode } from "../../icons";
const toolsList = [
  {
    title: "QR Code",
    color: 5,
    icon: { pack: MaterialCommunityIcons, id: "qrcode" },
    route: "/tools/generator-tools/qrcode-tool",
  },
  {
    title: "URL Shortener",
    color: 5,
    icon: { pack: MaterialCommunityIcons, id: "link-variant" },
    route: "/tools/generator-tools/url-shortener",
  },
  {
    title: "Morse Code",
    color: 5,
    icon: { pack: MorseCode, id: "morse-code", isCustom: true },
    route: "/tools/generator-tools/morsecode-tool",
  },
];
const GeneratorTools = () => {
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

export default GeneratorTools;
