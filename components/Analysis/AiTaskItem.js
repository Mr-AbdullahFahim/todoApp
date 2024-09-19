import { View,  StyleSheet , Text, Modal, Pressable , SafeAreaView} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';

export default function AiTaskItem({item}){
    return (
        <View style={styles.container}>
            <View style={{ flexDirection : 'row' , justifyContent: 'space-between' }}>
                
                <View>
                    <Text style={[styles.taskText , {color:'white' , fontSize: 17 , marginVertical: 'auto'}]}>Mobile App Research</Text>
                    <View style={{ display : 'flex', marginTop : 10, flexDirection : 'column'}}>
                        <View style={{ display : 'flex', flexDirection : 'row'}}>
                            <AntDesign name="calendar" size={18} color="gray" style={{ marginVertical: 'auto', marginRight : 5 }} />
                            <Text style={[styles.taskText , { fontWeight: 'bold',  color:'gray' , fontSize: 14 , marginVertical: 'auto'}]}>Started at 4 Oct</Text>
                        </View>

                        <View style={{ display : 'flex', marginTop : 5 , flexDirection : 'row'}}>
                            <AntDesign name="calendar" size={18} color="gray" style={{ marginVertical: 'auto', marginRight : 5 }} />
                            <Text style={[styles.taskText , { fontWeight: 'bold',  color:'gray' , fontSize: 14 , marginVertical: 'auto'}]}>Completed at 4 Oct</Text>
                        </View>
                        
                        <View style={{ display : 'flex', marginTop : 5 , flexDirection : 'row'}}>
                            <Entypo name="back-in-time" size={18} color="gray" style={{ marginVertical: 'auto', marginRight : 5 }} />
                            <Text style={[styles.taskText , { fontWeight: 'bold',  color:'gray' , fontSize: 14 , marginVertical: 'auto'}]}>Duration 4 hours</Text>
                        </View>
                        
                    </View>
                </View>

            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        padding: 15,
        paddingVertical: 20,
        marginVertical: 8,
        borderRadius: 8,
        backgroundColor: '#1F1F1F',
        borderLeftWidth: 15,
        borderLeftColor: '#8875FF',
        elevation: 2
    }
})