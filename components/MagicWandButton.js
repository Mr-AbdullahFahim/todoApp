import { TouchableOpacity } from "react-native-gesture-handler";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Pressable } from "react-native";


export default function MagicWandButton({pressEvent}){
    return (
        <Pressable onPress={pressEvent} style={{ marginVertical : 'auto', padding : 10 , borderWidth : 1 , borderRadius : 50 , borderColor : '#BA83DE' }}>
            <FontAwesome6 name="wand-sparkles" size={16} color="gold" />
        </Pressable>
    )
}