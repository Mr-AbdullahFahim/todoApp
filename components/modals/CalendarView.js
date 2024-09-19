import React, { useState } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ScrollView } from "react-native-gesture-handler";
import { format, addDays, startOfWeek, addWeeks, subWeeks } from "date-fns";

function DateItem({ date, selected, onPress }) {
  const dayName = format(date, "EEE");
  const dayNumber = format(date, "d");

  return (
    <Pressable
      style={[styles.dateItem, { borderWidth: selected ? 2 : 0 }]}
      onPress={() => onPress(date)}
    >
      <Text style={styles.dateText}>{dayName}</Text>
      <Text style={styles.dateText}>{dayNumber}</Text>
    </Pressable>
  );
}

export default function CalendarPicker({ setDate , gotDate}) {
  
  const [selectedDate, setSelectedDate] = useState(gotDate || new Date());

  const [currentWeekStart, setCurrentWeekStart] = useState(gotDate || new Date());
  
  const handlePrevWeek = () => {
    setCurrentWeekStart(subWeeks(currentWeekStart, 1));
  };

  const handleNextWeek = () => {
    setCurrentWeekStart(addWeeks(currentWeekStart, 1));
  };

  const isSelected = (date) => {
    return format(date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setDate(date);
  };

  const renderWeekDates = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      dates.push(addDays(currentWeekStart, i));
    }
    return dates;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons
          name="chevron-back-outline"
          size={30}
          color="#BA83DE"
          onPress={handlePrevWeek}
        />
        <Text style={styles.headerText}>
          {format(currentWeekStart, "dd MMM")} -{" "}
          {format(addDays(currentWeekStart, 6), "dd MMM")}
        </Text>
        <Ionicons
          name="chevron-forward-outline"
          size={30}
          color="#BA83DE"
          onPress={handleNextWeek}
        />
      </View>

      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
      >
        {renderWeekDates().map((date, index) => (
          <DateItem
            key={index}
            date={date}
            selected={isSelected(date)}
            onPress={handleDateSelect}
          />
        ))}
      </ScrollView>

      {/*<Text style={styles.selectedDateText}>
        Selected Date: {format(selectedDate, "EEEE, MMMM d, yyyy")}
      </Text>*/}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontSize: 18,
    color: "#BA83DE",
  },
  scrollView: {
    marginTop: 10,
  },
  dateItem: {
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 5,
    borderColor: "#BA83DE",
  },
  dateText: {
    color: "#6C757D",
    fontSize: 16,
  },
  selectedDateText: {
    marginTop: 20,
    fontSize: 16,
    color: "#BA83DE",
    textAlign: "center",
  },
});
