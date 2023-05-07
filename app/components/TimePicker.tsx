import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

interface TimePickerProps {
  interval: number; // in minutes
  beginTime: number; // in minutes
  endTime: number; // in minutes
  selectedTimes?: number[]; // in minutes
  onTimesSelect: (times: number[]) => void; // in minutes
}

const TimePicker: React.FC<TimePickerProps> = ({
  interval,
  beginTime,
  endTime,
  selectedTimes = [],
  onTimesSelect,
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

  return (
    <View style={styles.container}>
      {timeSlots.map(time => (
        <TouchableOpacity
          key={time}
          style={[
            styles.timeButton,
            localSelectedTimes.includes(time) && styles.selectedTimeButton,
          ]}
          onPress={() => handleTimeSelect(time)}>
          <Text
            style={[
              styles.timeText,
              localSelectedTimes.includes(time) && styles.selectedTimeText,
            ]}>
            {formatTime(time)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
  },
  timeButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    margin: 5,
    alignItems: 'center',
  },
  selectedTimeButton: {
    backgroundColor: '#ccc',
  },
  timeText: {
    fontSize: 18,
  },
  selectedTimeText: {
    fontWeight: 'bold',
  },
});

export default TimePicker;
