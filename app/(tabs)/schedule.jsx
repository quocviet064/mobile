import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { Calendar } from "react-native-calendars";
import { AntDesign } from "@expo/vector-icons";

export default function Schedule() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [notes, setNotes] = useState({});
  const [currentNote, setCurrentNote] = useState("");
  const [showNote, setShowNote] = useState(false);
  const [markedDates, setMarkedDates] = useState({});
  const today = new Date().toISOString().split('T')[0];

  const renderHeader = (date) => {
    const year = date.getFullYear();
    const month = date.toLocaleString("en-US", { month: "long" });
    return (
      <View style={styles.headerContainer}>
        <AntDesign name="calendar" size={24} color="black" />
        <Text style={styles.headerText}>
          {month} {year}
        </Text>
      </View>
    );
  };

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
    setCurrentNote(notes[day.dateString] || "");
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

  useEffect(() => {
    const updatedMarkedDates = {};
    Object.keys(notes).forEach((date) => {
      updatedMarkedDates[date] = {
        selected: true,
        selectedColor: "red",
      };
    });
    setMarkedDates(updatedMarkedDates);
  }, [notes]);

  return (
    <View style={styles.container}>
      <Calendar
        renderHeader={(date) => renderHeader(new Date(date))}
        onDayPress={onDayPress}
        markedDates={{
          ...markedDates,
          [selectedDate]: {
            selected: true,
            customStyles: {
              container: {
                borderColor: "blue",
                borderWidth: 2,
                borderRadius: 20,
                backgroundColor: "transparent",
                alignItems: "center",
                justifyContent: "center",
              },
              text: {
                color: "black",
              },
            },
          },
          [today]: {
            selected: true,
            selectedColor: "#6EB5FF",
          },
        }}
        // Remaining code...
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
              <Text style={styles.deleteText}>Xóa ghi chú</Text>
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
    backgroundColor: "#fff",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  noteContainer: {
    flexGrow: 1,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderTopWidth: 1,
    borderColor: "#e0e0e0",
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
  },
  noteInput: {
    flex: 1,
    borderColor: "#e0e0e0",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    textAlignVertical: "top",
  },
  deleteButton: {
    backgroundColor: "red",
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
