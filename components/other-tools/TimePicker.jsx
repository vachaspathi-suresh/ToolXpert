import {
  CheckIcon,
  HStack,
  Modal,
  Select,
  Text,
  useColorModeValue,
} from "native-base";
import currTheme from "../../app/colors";
const TimePicker = ({ showModal, setShowModal, time, setTime, setReset }) => {
  const theme = currTheme(useColorModeValue("light", "dark"));
  return (
    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
      <Modal.Content minWidth="320">
        <Modal.CloseButton />
        <Modal.Header>Select Time</Modal.Header>
        <Modal.Body>
          <HStack width={"full"} justifyContent={"space-around"}>
            <Text fontSize={"2xl"}>Hrs:</Text>
            <Text fontSize={"2xl"}>Mins:</Text>
            <Text fontSize={"2xl"}>Secs:</Text>
          </HStack>
          <HStack space={1}>
            <Select
              selectedValue={time[0] + ""}
              minWidth={90}
              _selectedItem={{
                bg: theme.colors.teal[200],
                endIcon: <CheckIcon size="5" />,
              }}
              onValueChange={(val) => {
                setTime((prev) => [parseInt(val), prev[1], prev[2]]);
                setReset(true);
              }}
            >
              {[...Array(24).keys()].map((i) => (
                <Select.Item value={i + ""} key={i} label={i + ""} />
              ))}
            </Select>
            <Select
              selectedValue={time[1] + ""}
              minWidth={90}
              _selectedItem={{
                bg: theme.colors.teal[200],
                endIcon: <CheckIcon size="5" />,
              }}
              onValueChange={(val) => {
                setTime((prev) => [prev[0], parseInt(val), prev[2]]);
                setReset(true);
              }}
            >
              {[...Array(60).keys()].map((i) => (
                <Select.Item value={i + ""} key={i} label={i + ""} />
              ))}
            </Select>
            <Select
              selectedValue={time[2] + ""}
              minWidth={90}
              _selectedItem={{
                bg: theme.colors.teal[200],
                endIcon: <CheckIcon size="5" />,
              }}
              onValueChange={(val) => {
                setTime((prev) => [prev[0], prev[1], parseInt(val)]);
                setReset(true);
              }}
            >
              {[...Array(60).keys()].map((i) => (
                <Select.Item value={i + ""} key={i} label={i + ""} />
              ))}
            </Select>
          </HStack>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default TimePicker;
