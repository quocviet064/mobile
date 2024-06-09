import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, FlatList } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import moment from 'moment';

export default function Schedule() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [notes, setNotes] = useState({});
  const [currentNote, setCurrentNote] = useState("");
  const [showNote, setShowNote] = useState(false);
  const [markedDates, setMarkedDates] = useState({});
  const [currentWeek, setCurrentWeek] = useState(moment().startOf('isoWeek'));

  const today = new Date().toISOString().split('T')[0];

  const startOfWeek = currentWeek.clone().startOf('isoWeek');
  const endOfWeek = currentWeek.clone().endOf('isoWeek');

  const onDayPress = (day) => {
    setSelectedDate(day);
    setCurrentNote(notes[day] || "");
    setShowNote(true);
  };

  const onNoteChange = (text) => {
    setCurrentNote(text);
    const updatedNotes = {
      ...notes,
      [selectedDate]: text,
    };
    setNotes(updatedNotes);
    if (text.trim() === "") {
      delete updatedNotes[selectedDate];
    }
    updateMarkedDates(updatedNotes);
  };

  const deleteNote = () => {
    const updatedNotes = { ...notes };
    delete updatedNotes[selectedDate];
    setNotes(updatedNotes);
    setCurrentNote("");
    setShowNote(false);
    updateMarkedDates(updatedNotes);
  };

  const updateMarkedDates = (updatedNotes) => {
    const updatedMarkedDates = { ...markedDates };
    Object.keys(updatedMarkedDates).forEach((date) => {
      if (!updatedNotes[date]) {
        delete updatedMarkedDates[date];
      }
    });
    setMarkedDates(updatedMarkedDates);
  };

  const getWeekDays = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = startOfWeek.clone().add(i, 'days').format('YYYY-MM-DD');
      days.push(day);
    }
    return days;
  };

  const weekDays = getWeekDays();

  const markedDatesWithWeek = weekDays.reduce((acc, day) => {
    acc[day] = markedDates[day] || {};
    return acc;
  }, {});

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => setCurrentWeek(prev => prev.clone().subtract(1, 'week'))}>
          <AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <AntDesign name="calendar" size={24} color="black" />
          <Text style={styles.headerText}>
            {currentWeek.format("MMMM YYYY")}
          </Text>
        </View>
        <TouchableOpacity onPress={() => setCurrentWeek(prev => prev.clone().add(1, 'week'))}>
          <AntDesign name="right" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={weekDays}
        keyExtractor={(item) => item}
        horizontal
        renderItem={({ item }) => {
          const isSelected = item === selectedDate;
          const isToday = item === today;
          return (
            <TouchableOpacity
              style={[
                styles.dayContainer,
                isSelected && styles.selectedDayContainer,
                isToday && styles.todayContainer,
                notes[item] && styles.noteDayContainer
              ]}
              onPress={() => onDayPress(item)}
            >
              <Text style={[styles.dayText, isToday && styles.todayText]}>{moment(item).format('ddd')}</Text>
              <Text style={[styles.dateText, isToday && styles.todayText]}>{moment(item).format('DD')}</Text>
            </TouchableOpacity>
          );
        }}
      />

      {showNote && selectedDate && (
        <ScrollView contentContainerStyle={styles.noteContainer}>
          <View style={styles.noteHeader}>
            <Text style={styles.noteTitle}>Notes for {selectedDate}</Text>
            <TouchableOpacity onPress={() => setShowNote(false)}>
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.noteInput}
            value={currentNote}
            onChangeText={onNoteChange}
            placeholder="Enter notes..."
            multiline
          />
          {currentNote ? (
            <TouchableOpacity style={styles.deleteButton} onPress={deleteNote}>
              <Text style={styles.deleteText}>Delete Note</Text>
            </TouchableOpacity>
          ) : null}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
  },
  headerTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
    color: "#333",
  },
  dayContainer: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    width: 49,
    height: 100,
    backgroundColor: "#fff",
    marginHorizontal: 5,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  selectedDayContainer: {
    backgroundColor: "#c3e4ff",
    borderRadius: 15,
  },
  todayContainer: {
    borderColor: "#6EB5FF",
    borderWidth: 2,
  },
  noteDayContainer: {
    backgroundColor: "#ffcccc",
    borderRadius: 15,
  },
  dayText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  dateText: {
    fontSize: 14,
    color: "#666",
  },
  todayText: {
    color: "#6EB5FF",
  },
  noteContainer: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#ddd",
    marginTop: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  noteHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  noteInput: {
    flex: 1,
    borderColor: "#ddd",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    textAlignVertical: "top",
    backgroundColor: "#f9f9f9",
  },
  deleteButton: {
    backgroundColor: "#ff4d4d",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  deleteText: {
    color: "white",
    fontWeight: "bold",
  },
});
