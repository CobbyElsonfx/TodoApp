import { Picker } from "@react-native-picker/picker";



const StatusPicker: React.FC<{ statusFilter: string; onValueChange: (value: string) => void }> = ({
    statusFilter,
    onValueChange,
  }) => (
    <Picker
      selectedValue={statusFilter}
      onValueChange={onValueChange}
      dropdownIconColor="#fff"
      style={{ flex: 1, color: "#fff", backgroundColor: "#1A3E5C", fontSize: 16 }}
    >
      <Picker.Item label="All" value="all" />
      <Picker.Item label="In Progress" value="in_progress" />
      <Picker.Item label="Completed" value="completed" />
      <Picker.Item label="Not Started" value="not_started" />
    </Picker>
  );

  
  export default StatusPicker