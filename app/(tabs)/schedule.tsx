import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import moment from "moment";
import Background from "@/src/Background";
import { EmployeeShift, employeeApi } from "@/api/employee.api";

export default function Schedule() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentWeek, setCurrentWeek] = useState(moment().startOf("isoWeek"));
  const flatListRef = useRef(null);
  const [shifts, setShifts] = useState<EmployeeShift[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShifts = async () => {
      try {
        const data = await employeeApi.getEmployeeShift("2024-16-06");
        setShifts(data);
      } catch (error) {
        Alert.alert("Error", "Failed to fetch shifts. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchShifts();
  }, []);
  console.log("shifts", shifts);
  const today = new Date().toISOString().split("T")[0];

  const startOfWeek = currentWeek.clone().startOf("isoWeek");
  const endOfWeek = currentWeek.clone().endOf("isoWeek");

  const onDayPress = (day: any) => {
    setSelectedDate(day);
    const index = weekDays.findIndex((date) => date === day);
    flatListRef.current?.scrollToIndex({ animated: true, index });
  };

  const getWeekDays = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = startOfWeek.clone().add(i, "days").format("YYYY-MM-DD");
      days.push(day);
    }
    return days;
  };

  const weekDays = getWeekDays();

  useEffect(() => {
    if (selectedDate) {
      const index = weekDays.findIndex((date) => date === selectedDate);
      flatListRef.current?.scrollToIndex({ animated: true, index });
    }
  }, [selectedDate]);

  return (
    <Background>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() =>
              setCurrentWeek((prev) => prev.clone().subtract(1, "week"))
            }
          >
            <AntDesign name="left" size={24} color="black" />
          </TouchableOpacity>
          <View style={styles.headerTextContainer}>
            <AntDesign name="calendar" size={24} color="black" />
            <Text style={styles.headerText}>
              {currentWeek.format("MMMM YYYY")}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              setCurrentWeek((prev) => prev.clone().add(1, "week"))
            }
          >
            <AntDesign name="right" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <FlatList
          ref={flatListRef}
          data={weekDays}
          keyExtractor={(item) => item}
          horizontal
          renderItem={({ item }) => {
            const isSelected = item === selectedDate;
            const isToday = item === today;
            return (
              <TouchableOpacity
                style={[
                  styles.dayContainer1,
                  isSelected && styles.selectedDayContainer1,
                  isToday && styles.todayContainer1,
                ]}
                onPress={() => onDayPress(item)}
              >
                <Text style={[styles.dayText1, isToday && styles.todayText1]}>
                  {moment(item).format("ddd")}
                </Text>
                <Text style={[styles.dateText1, isToday && styles.todayText1]}>
                  {moment(item).format("DD")}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
        <FlatList
          ref={flatListRef}
          data={weekDays}
          keyExtractor={(item) => item}
          renderItem={({ item }) => {
            const isSelected = item === selectedDate;
            const isToday = item === today;
            return (
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={[
                    styles.dayContainer,
                    isSelected && styles.selectedDayContainer,
                    isToday && styles.todayContainer,
                  ]}
                  onPress={() => onDayPress(item)}
                >
                  <Text style={[styles.dayText, isToday && styles.todayText1]}>
                    {moment(item).format("ddd")}
                  </Text>
                  <Text style={[styles.dateText, isToday && styles.todayText1]}>
                    {moment(item).format("DD")}
                  </Text>
                </TouchableOpacity>

                <View style={[styles.dayContainer6]}>
                  <View style={{ flexDirection: "column" }}>
                    <View style={[styles.dayContainer3]}>
                      <Text style={styles.slotText}>Work shift 1:</Text>
                    </View>
                    <View style={[styles.dayContainer3]}>
                      <Text style={styles.slotText}>Work shift 2:</Text>
                    </View>
                  </View>
                </View>
              </View>
            );
          }}
        />
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 6,
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
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    width: "20%",
    backgroundColor: "#fff",
    marginVertical: 0,
    borderColor: "#6EB5FF",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  dayText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  dateText: {
    fontSize: 18,
    color: "#666",
  },
  dayContainer1: {
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
    width: 52.9,
    height: 100,
    backgroundColor: "#fff",
    marginHorizontal: 2.1,
    marginBottom: 40,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  selectedDayContainer1: {
    backgroundColor: "#c3e4ff",
    borderRadius: 15,
  },
  todayContainer1: {
    borderColor: "#6EB5FF",
    borderWidth: 2,
  },
  dayText1: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  dateText1: {
    fontSize: 14,
    color: "#666",
  },
  todayText1: {
    color: "#6EB5FF",
  },

  dayContainer3: {
    height: 100,
    justifyContent: "center",
    width: "80%",
    backgroundColor: "#fff",
    marginVertical: 0,
    borderColor: "#6EB5FF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    borderTopWidth: 1,
    paddingStart: 10,
  },
  dayContainer6: {
    width: "100%",
  },
  slotText: {
    color: "green",
    fontWeight: "bold",
  },
});
