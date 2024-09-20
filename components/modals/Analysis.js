import { View,  StyleSheet , Text, Modal, Pressable , SafeAreaView} from 'react-native';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import React , {useState , useContext, useEffect} from 'react';
import AIDescriptionCard from '../Analysis/AIDescription';
import { ScrollView } from 'react-native-gesture-handler';
import AiTaskItem from '../Analysis/AiTaskItem';
import { TodoContext } from '../../store/store';
import AIService from '../../services/AIService';
import Markdown, { MarkdownIt } from 'react-native-markdown-display';
import { TouchableOpacity } from 'react-native';
import LoadingModal from './LoadindModal';
import MagicWandButton from '../MagicWandButton';


export default function AnalysisModal({date}){

    const [modalVisible, setModalVisible] = useState(false);
    const {state} = useContext(TodoContext);
    const [analysisData, setAnalysisData] = useState('');
    const [todayTasks , setTodayTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const dayTasks = state.tasks.filter(task => new Date(task.date).toDateString() === new Date(date).toDateString())
        setTodayTasks(dayTasks)
    } , [date , state.tasks])

    const openModal = () => {
        setModalVisible(true);
    };
    
    const closeModal = () => {
        setModalVisible(false);
    };

    const handleAI = async () => {
        setIsLoading(true)
        setAnalysisData('')
        console.log("pressed \n");
        const dayTasks = state.tasks.filter(task => new Date(task.date).toDateString() === new Date(date).toDateString())
        const res = await AIService.analyzeTasks(dayTasks)

        if(res.success){
            setAnalysisData(res.output);
        } else {
            alert("Error while analyzing data");
        }

        setIsLoading(false)

    }

    const customStyle = {
        text: {
          fontSize: 16,
          color: 'white', // Customize the text color
        },
        strong: {
          fontWeight: 'bold',
          color: '#0000FF', // Blue for bold text
        },
        listItem: {
          flexDirection: 'row',
          alignItems: 'flex-start',
          paddingVertical: 4,
        },
        bullet: {
          color: 'white', // Hot pink for bullet points
          fontSize: 24, // Bigger size for bullet
        },
        listItemText: {
          fontSize: 16,
          color: 'white', // Black for list item text
        },
        em: {
          fontStyle: 'italic',
          color: 'white', // Hot pink for italic text
        },
    };
    

    return (
        <View>
            <Pressable style={{ marginVertical : 'auto', marginRight : 10 }} onPress={openModal}>
                <SimpleLineIcons name="energy" size={28} color="white" />
            </Pressable>

            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={closeModal}
            >

                <SafeAreaView style={styles.container}>

                    <View style={styles.header}>
                        
                        <Pressable style={{ display : 'flex' , justifyContent: 'flex-start' }} onPress={closeModal}>
                            <Ionicons name="close-circle" size={28} color="white" />
                        </Pressable>

                        <Text style={styles.headerText}>Detailed Analysis</Text>
                    </View>

                    <ScrollView style={styles.body}>
                    
                        <AIDescriptionCard date={date} />
                        
                        <View style={{ marginTop : 30 , display :'flex' , flexDirection : 'row' , justifyContent : 'space-between' , width : '100%'}}>
                            <Text style={[styles.titleText , {marginVertical : 'auto'}]}>Detailed Analysis</Text>
                            <MagicWandButton pressEvent={handleAI} />
                        </View>
                        
                        <View style={{ backgroundColor : '#181818' ,  marginTop : 20 , padding : 15 , borderRadius : 8}}>
                            <Markdown
                                    style={customStyle}
                                    markdownit={
                                        MarkdownIt({typographer: true}).disable([ 'link', 'image' ])
                                    }
                                >
                                    {analysisData}
                            </Markdown>
                        </View>

                        <Text style={[styles.titleText , { marginTop : 30}]}>Time Analysis</Text>

                        <View style={{ marginVertical : 20 }}>
                            {todayTasks.map((item) => <AiTaskItem key={item.id} item={item} /> )}
                        </View>
                    
                    </ScrollView>

                    <LoadingModal modalVisible={isLoading} />

                </SafeAreaView>

            </Modal>
                
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },

    header: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingHorizontal : 15
    },

    headerText: {
        justifyContent: 'center',
        color: 'white',
        fontSize: 20,
        marginVertical: 'auto',
        marginLeft: 50,
    },

    titleText: {
        color: 'white',
        fontSize: 20,
    },

    body: {
        paddingHorizontal : 15,
        marginVertical: 30,
    }

})