import { View, StyleSheet, Text, Modal, Pressable, SafeAreaView, FlatList, Dimensions, TextInput, Animated, Easing } from 'react-native';
import React, { useContext, useState, useEffect, useRef } from 'react';
import { TodoContext } from '../../store/store';
import Ionicons from '@expo/vector-icons/Ionicons';
import Fontisto from '@expo/vector-icons/Fontisto';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const AddProfileComponent = ({ setShow, isVisible }) => {
  const [name, setName] = useState('');
  const backColors = ['#0970E7', '#2BBD76', '#E50913', '#F2A242'];
  const [selectedColor , setSelectedColor] = useState(backColors[Math.floor(Math.random() * backColors.length)]);
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity value

  const handleCreateTask = () => {
    console.log();
  };

  useEffect(() => {
    setSelectedColor(backColors[Math.floor(Math.random() * backColors.length)])
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
          <TouchableOpacity
            onPress={handleCreateTask}
            style={{
              backgroundColor: selectedColor,
              padding: 30,
              borderWidth: 1,
              borderColor: 'white',
              borderRadius: 15,
            }}
          >
            <MaterialCommunityIcons name="account" size={70} color="white" />
          </TouchableOpacity>
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
        onChangeText={(text) => setName(text)}
        value={name}
      />

      <TouchableOpacity
        onPress={handleCreateTask}
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
      </TouchableOpacity>

      <TouchableOpacity
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
      </TouchableOpacity>
    </Animated.View>
  );
};

export default function SwitchProfileModal({ visible, closeModal }) {
  const { state } = useContext(TodoContext);
  const [showAddProfileComponent, setShowAddProfileComponent] = useState(false);

  const data = Array.from({ length: 4 }, (_, index) => ({ key: String(index) }));

  const renderItem = ({ item, index }) => {
    const isLastItemOdd = data.length % 2 !== 0 && index === data.length - 1;

    return (
      <View style={[styles.rectangle, isLastItemOdd && styles.centeredRectangle]}>
        <View style={{ borderRadius: 10, backgroundColor: 'red', minWidth: 120, height: '90%' }}></View>
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16, marginTop: 10 }}>Naveen H...</Text>
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
                  data={data}
                  renderItem={renderItem}
                  numColumns={2}
                  keyExtractor={(item) => item.key}
                  contentContainerStyle={styles.gridContainer}
                  scrollEnabled={false}
                />
              </View>

              <View style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
                <View>
                  <TouchableOpacity
                    onPress={() => setShowAddProfileComponent(true)}
                    style={{ padding: 50, borderWidth: 1, borderColor: 'white', borderRadius: 15 }}
                  >
                    <Fontisto name="plus-a" size={24} color="white" />
                  </TouchableOpacity>
                  <Text
                    style={{ color: 'white', fontWeight: 'bold', fontSize: 16, marginTop: 10, textAlign: 'center' }}
                  >
                    Add Profile
                  </Text>
                </View>
              </View>
            </View>
          )}

          {showAddProfileComponent && (
            <View style={{ marginTop: 40 }}>
              <AddProfileComponent setShow={setShowAddProfileComponent} isVisible={showAddProfileComponent} />
            </View>
          )}
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
