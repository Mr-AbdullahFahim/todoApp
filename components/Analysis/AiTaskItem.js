import { View,  StyleSheet , Text, Modal, Pressable , SafeAreaView} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import { format } from 'date-fns';

export default function AiTaskItem({item}){

    const getTimeDuration = () => {
        const timeDifference = new Date(item.completedTime).getTime() - new Date(item.date).getTime();
        const hours = Math.floor(timeDifference / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
        return `${String(hours).padStart(2, '0')}h : ${String(minutes).padStart(2, '0')}m : ${String(seconds).padStart(2, '0')}s`;
    };
    
    return (
        <View style={styles.container}>
            <View style={{ flexDirection : 'row' , justifyContent: 'space-between' }}>
                
                <View>
                    <Text style={[styles.taskText , {color:'white' , fontSize: 17 , marginVertical: 'auto'}]}>{item.title}</Text>
                    <View style={{ display : 'flex', marginTop : 10, flexDirection : 'column'}}>
                        <View style={{ display : 'flex', flexDirection : 'row'}}>
                            <AntDesign name="calendar" size={18} color="gray" style={{ marginVertical: 'auto', marginRight : 5 }} />
                            <Text style={[styles.taskText , { fontWeight: 'bold',  color:'gray' , fontSize: 14 , marginVertical: 'auto'}]}>Started at {format(item.date, "dd MMM") }</Text>
                        </View>

                        <View style={{ display : 'flex', marginTop : 5 , flexDirection : 'row'}}>
                            <AntDesign name="calendar" size={18} color="gray" style={{ marginVertical: 'auto', marginRight : 5 }} />
                            <Text style={[styles.taskText , { fontWeight: 'bold',  color:'gray' , fontSize: 14 , marginVertical: 'auto'}]}>Completed at {item.completedTime != null ? format(item.completedTime, "dd MMM") : "N/A"}</Text>
                        </View>
                        
                        <View style={{ display : 'flex', marginTop : 5 , flexDirection : 'row'}}>
                            <Entypo name="back-in-time" size={18} color="gray" style={{ marginVertical: 'auto', marginRight : 5 }} />
                            <Text style={[styles.taskText , { fontWeight: 'bold',  color:'gray' , fontSize: 14 , marginVertical: 'auto'}]}>Duration {item.completedTime != null ? getTimeDuration() : "N/A"}</Text>
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