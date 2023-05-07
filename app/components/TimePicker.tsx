import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ListRenderItem,
} from 'react-native';

interface TimePickerProps {
  interval: number; // in minutes
  beginTime: number; // in minutes
  endTime: number; // in minutes
  selectedTimes?: number[]; // in minutes
  onTimesSelect: (times: number[]) => void; // in minutes
  numColumns: number; // number of columns to render
}

const TimePicker: React.FC<TimePickerProps> = ({
  interval,
  beginTime,
  endTime,
  selectedTimes = [],
  onTimesSelect,
  numColumns = 4,
}) => {
  const [localSelectedTimes, setLocalSelectedTimes] =
    useState<number[]>(selectedTimes);

  const timeSlots = [];
  let currentTime = beginTime;

  while (currentTime <= endTime) {
    timeSlots.push(currentTime);
    currentTime += interval;
  }

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;

    return `${hours}.${minutes.toString().padStart(2, '0')}`;
  };

  const handleTimeSelect = (time: number) => {
    let newSelectedTimes;

    if (localSelectedTimes.includes(time)) {
      newSelectedTimes = localSelectedTimes.filter(t => t !== time);
    } else {
      newSelectedTimes = [...localSelectedTimes, time];
    }

    setLocalSelectedTimes(newSelectedTimes);
    onTimesSelect(newSelectedTimes);
  };

  const renderItem: ListRenderItem<number> = ({item}) => (
    <TouchableOpacity
      style={[
        styles.timeButton,
        localSelectedTimes.includes(item) && styles.selectedTimeButton,
      ]}
      onPress={() => handleTimeSelect(item)}>
      <Text
        style={[
          styles.timeText,
          localSelectedTimes.includes(item) && styles.selectedTimeText,
        ]}>
        {formatTime(item)}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={timeSlots}
        keyExtractor={item => item.toString()}
        renderItem={renderItem}
        numColumns={numColumns}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 400,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
  },
  flatListContainer: {
    justifyContent: 'space-between',
  },
  timeButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 5,
    flex: 1,
  },
  selectedTimeButton: {
    backgroundColor: '#ccc',
  },
  timeText: {
    fontSize: 16,
    textAlign: 'center',
  },
  selectedTimeText: {
    fontWeight: 'bold',
  },
});

export default TimePicker;
