import { View, StyleSheet, Text, Modal, Pressable, SafeAreaView, FlatList, Dimensions, TextInput, Animated, Easing } from 'react-native';
import React, { useContext, useState, useEffect, useRef } from 'react';
import { TodoContext } from '../../store/store';
import Ionicons from '@expo/vector-icons/Ionicons';
import Fontisto from '@expo/vector-icons/Fontisto';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import ProfileService from '../../services/ProfileService';
import AsyncStorageService from '../../services/AsyncStorageService';
import { useNavigation } from '@react-navigation/native';
import LoadingModal from './LoadindModal';


const AddProfileComponent = ({ setShow, isVisible }) => {
  const backColors = ['#0970E7', '#2BBD76', '#E50913', '#F2A242'];
  const [selectedColor , setSelectedColor] = useState(backColors[Math.floor(Math.random() * backColors.length)]);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const { state , dispatch } = useContext(TodoContext); 
  
  const [formData , setFormData] = useState({
    name: '',
    color: selectedColor,
  })

  const handleCreateProfile = async () => {
    let res = await ProfileService.createNewProfile(formData)

    if(!res.success){
        alert(res.message);
        return;
    }

    dispatch({ type: "ADD_PROFILE", payload: res.message });
    setFormData({
        name: '',
        color: selectedColor,
    });
    setShow(false)
  };

  useEffect(() => {
    setSelectedColor(backColors[Math.floor(Math.random() * backColors.length)])
    setFormData({
        name: '',
        color: selectedColor,
    });
  }, [])

  // Animate the component when it's visible or hidden
  useEffect(() => {
    if (isVisible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
        easing: Easing.in(Easing.ease),
      }).start();
    }
  }, [isVisible, fadeAnim]);

  return (
    <Animated.View
      style={{
        opacity: fadeAnim, // Bind opacity to animated value
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingHorizontal: 35,
      }}
    >
      <View style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
        <View>
          <View
            style={{
              backgroundColor: selectedColor,
              padding: 30,
              borderWidth: 1,
              borderColor: 'white',
              borderRadius: 15,
            }}
          >
            <MaterialCommunityIcons name="account" size={70} color="white" />
          </View>
        </View>
      </View>

      <TextInput
        style={{
          marginTop: 30,
          justifyContent: 'center',
          borderWidth: 1,
          borderColor: 'rgba(255,255,255,0.3)',
          padding: 15,
          borderRadius: 12,
          width: '100%',
          color: 'white',
        }}
        placeholder="Enter your profile name"
        placeholderTextColor={'white'}
        onChangeText={(text) => setFormData({...formData , name : text})}
        value={formData.name}
      />

      <Pressable
        onPress={handleCreateProfile}
        style={{
          backgroundColor: '#D682B9',
          padding: 15,
          marginTop: 35,
          borderRadius: 5,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ fontSize: 18, color: 'white' }}>Add new profile</Text>
      </Pressable>

      <Pressable
        onPress={() => setShow(false)}
        style={{
          padding: 15,
          marginTop: 15,
          borderRadius: 5,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: 'rgba(255,255,255,0.3)',
        }}
      >
        <Text style={{ fontSize: 18, color: 'white' }}>Cancel</Text>
      </Pressable>
    </Animated.View>
  );
};

export default function SwitchProfileModal({ visible, closeModal }) {
  const { state } = useContext(TodoContext);
  const [showAddProfileComponent, setShowAddProfileComponent] = useState(false);
  const [profiles , setProfiles] = useState([])
  const [loading  , setLoading] = useState(false);
  const data = Array.from({ length: 4 }, (_, index) => ({ key: String(index) }));
  const navigation = useNavigation();

    useEffect(() => {
      const loadProfiles = async () => {
        setProfiles((await ProfileService.loadProfiles()))
        console.log("profiles ---->" , profiles)
      }
      loadProfiles()
    }, [visible , showAddProfileComponent])

    const renderItem = ({ item, index }) => {
      const isLastItemOdd = data.length % 2 !== 0 && index === data.length - 1;

      const selectProfile = async () => {
        setLoading(true)
        await AsyncStorageService.setCurrentProfile(item.id)
        navigation.replace('Main')
        setLoading(false)
      }

      return (
        <View style={[styles.rectangle, isLastItemOdd && styles.centeredRectangle]}>
          <Pressable onPress={selectProfile} style={{display :'flex' , justifyContent : 'center' , alignItems : 'center' , borderRadius: 10, backgroundColor: item.color, minWidth: 120, height: '90%' }}>
            <MaterialCommunityIcons name="account" size={70} color="white" />
          </Pressable>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16, marginTop: 10 }}>{item.name.length <= 6  ? item.name : `${item.name.substring(0, 6)}...` }</Text>
        </View>
      );
    };

  return (
    <View>
      <Modal animationType="fade" transparent={false} visible={visible} onRequestClose={closeModal}>
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <Pressable style={{ display: 'flex', justifyContent: 'flex-start' }} onPress={closeModal}>
              <Ionicons name="close-circle" size={28} color="white" />
            </Pressable>

            <Text style={styles.headerText}>Switch Profiles</Text>

            <View></View>
          </View>

          {!showAddProfileComponent && (
            <View>
              <View style={styles.body}>
                <FlatList
                  data={profiles}
                  renderItem={renderItem}
                  numColumns={2}
                  keyExtractor={(item) => item.id}
                  contentContainerStyle={styles.gridContainer}
                  scrollEnabled={false}
                />
              </View>
                
              {profiles.length < 4 && (
                <Pressable onPress={() => setShowAddProfileComponent(true)} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' , justifyContent :'center' , height  : profiles.length == 0 ?'85%' : 'auto' }}>
                    <View >
                      <View style={{ padding: 50, borderWidth: 1, borderColor: 'white', borderRadius: 15 }} >
                        <Fontisto name="plus-a" size={24} color="white" />
                      </View>
                      <Text
                        style={{ color: 'white', fontWeight: 'bold', fontSize: 16, marginTop: 10, textAlign: 'center' }}
                      >
                        Add Profile
                      </Text>
                    </View>
                </Pressable>
              )}
                
            </View>
          )}

          {(showAddProfileComponent) && (
            <View style={{ marginTop: 40}}>
              <AddProfileComponent setShow={setShowAddProfileComponent} isVisible={showAddProfileComponent} />
            </View>
          )}

          <LoadingModal modalVisible={loading} />
        </SafeAreaView>
      </Modal>
    </View>
  );
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
    paddingHorizontal: 15,
  },

  headerText: {
    justifyContent: 'center',
    color: 'white',
    fontSize: 20,
    marginVertical: 'auto',
    marginLeft: 50,
  },

  body: {
    display: 'flex',
    justifyContent: 'center',
    paddingHorizontal: 25,
    marginVertical: 20,
  },

  gridContainer: {
    padding: 10,
  },

  rectangle: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').width / 2 - 20,
    margin: 12,
    padding: 10,
    borderRadius: 10,
  },

  centeredRectangle: {
    alignSelf: 'center',
  },
});
