import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Text, SafeAreaView, TextInput } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import CalendarPicker from '../../components/modals/CalendarView';
import ProgressTracker from '../../components/dashboard/ProgressComponent';
import { ScrollView } from 'react-native-gesture-handler';
import FilterList from '../../components/FilterListComponent';
import AnalysisModal from '../../components/modals/Analysis';
import TodoFilterList from '../../components/TodoScreen/TodoFilterList';
import { TodoContext } from '../../store/store';
import TodoService from '../../services/TodoService';

export default function TodoScreen() {
    const [filterType, setFilterType] = useState('Priority');
    const { state } = useContext(TodoContext);
    const [todoList , setTodoList] = useState([]);
    const [filterArray, setFilterArray] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDate , setSelectedDate] = useState(new Date());

    useEffect(() => {
        const res = TodoService.getTodosByDate(selectedDate , state.tasks);
        setTodoList(res)
    } , [state.tasks])

    useEffect(() => {
        const res = TodoService.getTodosByDate(selectedDate , state.tasks);
        setTodoList(res)
    } , [selectedDate , state.tasks])

    useEffect(() => {
        filterTasks();
    }, [filterType, searchQuery , todoList , selectedDate]);

    const filterTasks = () => {
        let filteredTasks = [];

        switch (filterType) {
            case 'Priority':
                filteredTasks = filterByPriority();
                break;
            case 'Category':
                filteredTasks = filterByCategory();
                break;
            case 'Status':
                filteredTasks = filterByStatus();
                break;
            default:
                filteredTasks = filterByPriority();
                break;
        }

        if (searchQuery.trim() !== '') {
            filteredTasks = filteredTasks.map(group => ({
                ...group,
                list: group.list.filter(task => task.title.toLowerCase().includes(searchQuery.toLowerCase()))
            }));
        }

        setFilterArray(filteredTasks);
    };

    const filterByPriority = () => {
        const l1 = todoList.filter(task => task.priority === 'High');
        const l2 = todoList.filter(task => task.priority === 'Medium');
        const l3 = todoList.filter(task => task.priority === 'Low');

        return [
            { type: 'High', list: l1 },
            { type: 'Medium', list: l2 },
            { type: 'Low', list: l3 }
        ];
    };

    const filterByCategory = () => {
        const l1 = todoList.filter(task => task.category === 'Work');
        const l2 = todoList.filter(task => task.category === 'Study');
        const l3 = todoList.filter(task => task.category === 'Personal');

        return [
            { type: 'Work', list: l1 },
            { type: 'Study', list: l2 },
            { type: 'Personal', list: l3 }
        ];
    };

    const filterByStatus = () => {
        const l1 = todoList.filter(task => task.completed === true);
        const l2 = todoList.filter(task => task.completed === false);

        return [
            { type: 'Completed', list: l1 },
            { type: 'Incomplete', list: l2 }
        ];
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ paddingHorizontal: 15 }}>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.headerText}>Task List</Text>
                        <Text style={styles.headerText}>Explore your tasks 🌍</Text>
                    </View>
                    <AnalysisModal />
                </View>

                <View style={styles.search}>
                    <View>
                        <FontAwesome name={'search'} size={24} color='#a2a2a2' />
                    </View>
                    <TextInput
                        style={{ color: 'white', marginLeft: 10 }}
                        placeholder='Search Task Here'
                        placeholderTextColor={'white'}
                        value={searchQuery}
                        onChangeText={(text) => setSearchQuery(text)}
                    />
                </View>

                <ScrollView style={{ marginBottom: 130 }}>
                    
                    <View style={styles.calendarArea}>
                        <CalendarPicker setDate={setSelectedDate} />
                    </View>

                    <View style= {{ marginBottom : 10 }}>
                        <ProgressTracker date={new Date(selectedDate)} />
                    </View>


                    <FilterList selectedChip={filterType} clickEvent={setFilterType} />

                    {filterArray.map((item, index) => (
                        <TodoFilterList key={index} list={item.list} task={item.type} />
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    header: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        paddingVertical: 10,
        justifyContent: 'space-between',
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    search: {
        display: 'flex',
        flexDirection: 'row',
        borderColor: '#ccc',
        paddingHorizontal: 10,
        paddingVertical: 13,
        borderRadius: 5,
        marginVertical: 10,
        backgroundColor: '#1E1E1E',
    },
    calendarArea: {
        marginVertical: 30,
    },
});
