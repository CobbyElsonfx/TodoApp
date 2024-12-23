
import { View, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";


const SearchInput: React.FC<{ value: string; onChange: (text: string) => void }> = ({ value, onChange }) => (
    <View
      style={{
        marginBottom: 12,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#1A3E5C",
        borderRadius: 30,
        paddingHorizontal: 16,
        paddingVertical: 12,
      }}
    >
      <Ionicons name="search" size={22} color="#fff" />
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder="Search tasks..."
        placeholderTextColor="#AAB2BB"
        style={{ flex: 1, marginLeft: 12, color: "#fff", fontSize: 16 }}
      />
    </View>
  );
  

  export default SearchInput