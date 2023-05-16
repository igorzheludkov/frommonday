import React, {useCallback, useEffect, useRef, useState} from 'react';
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
  const [allElementsLoaded, setAllElementsLoaded] = useState(false);

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

  const flatListRef = useRef<FlatList<number>>(null);

  const scrollToClosestTime = useCallback(
    (time: number) => {
      const closestTimeIndex = timeSlots.reduce(
        (prevIndex, currentTime, currentIndex) => {
          const prevTime = timeSlots[prevIndex];
          const timeDiff = Math.abs(currentTime - prevTime);
          const closestTimeDiff = Math.abs(time - prevTime);

          return closestTimeDiff < timeDiff ? currentIndex : prevIndex;
        },
      );
      const numColumnsInView = Math.floor(timeSlots.length / numColumns);

      const offset =
        Math.max(0, closestTimeIndex - numColumnsInView) *
        styles.timeButton.height;

      flatListRef.current?.scrollToOffset({offset, animated: true});
    },
    [timeSlots, numColumns],
  );

  useEffect(() => {
    if (timeSlots.length > 0 && allElementsLoaded) {
      scrollToClosestTime(beginTime);
    }
  }, [timeSlots, beginTime, scrollToClosestTime, allElementsLoaded]);

  const handleAllElementsLoaded = useCallback(() => {
    setAllElementsLoaded(true);
  }, []);

  const renderItem: ListRenderItem<number> = ({item, index}) => (
    <TouchableOpacity
      style={[
        styles.timeButton,
        localSelectedTimes.includes(item) && styles.selectedTimeButton,
      ]}
      onPress={() => handleTimeSelect(item)}
      onLayout={
        index === timeSlots.length - 1 ? handleAllElementsLoaded : undefined
      }>
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
        ref={flatListRef}
        data={timeSlots}
        keyExtractor={item => item.toString()}
        renderItem={renderItem}
        numColumns={numColumns}
        contentContainerStyle={styles.flatListContainer}
        getItemLayout={(_, index) => ({
          length: styles.timeButton.height,
          offset: styles.timeButton.height * index,
          index,
        })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 350,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
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
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
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
