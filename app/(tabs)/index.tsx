import { View, Text } from "react-native"
import { Link } from "expo-router"


export default function Home(){
  return (
    <View className="bg-whtie">
        <Text className=" text-white">Hello World</Text>
        <Link href={'/welcome'}>
        How are you its been a while since i saw you
        </Link>
    </View>
  )
}
