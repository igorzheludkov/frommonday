import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

interface DayOfWeek {
  name: string;
  index: number;
}

interface WeekDaysProps {
  onSelectionChange: (selectedDays: number[]) => void;
  selectedDays?: number[];
  multiple?: boolean;
}

const DAYS_OF_WEEK: DayOfWeek[] = [
  {name: 'Mon', index: 1},
  {name: 'Tue', index: 2},
  {name: 'Wed', index: 3},
  {name: 'Thu', index: 4},
  {name: 'Fri', index: 5},
  {name: 'Sat', index: 6},
  {name: 'Sun', index: 0},
];

const WeekDays: React.FC<WeekDaysProps> = ({
  onSelectionChange,
  selectedDays = [],
  multiple = true,
}) => {
  const [selected, setSelected] = useState<number[]>(selectedDays);

  const handleDayToggle = (dayIndex: number) => {
    let newSelected: number[];
    if (multiple) {
      newSelected = [...selected];
    } else {
      newSelected = [];
    }

    const index = newSelected.indexOf(dayIndex);

    if (index > -1) {
      newSelected.splice(index, 1);
    } else {
      newSelected.push(dayIndex);
    }

    setSelected(newSelected);
    onSelectionChange(newSelected);
  };

  const renderDay = ({name, index}: DayOfWeek) => {
    const isSelected = selected.includes(index);

    return (
      <TouchableOpacity
        key={name}
        style={[styles.dayButton, isSelected && styles.selectedDayButton]}
        onPress={() => handleDayToggle(index)}>
        <Text style={isSelected && styles.selectedDayText}>{name}</Text>
      </TouchableOpacity>
    );
  };

  return <View style={styles.container}>{DAYS_OF_WEEK.map(renderDay)}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
  },
  dayButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 2,
    width: 40,
    alignItems: 'center',
  },
  selectedDayButton: {
    backgroundColor: '#ccc',
  },
  selectedDayText: {
    fontWeight: 'bold',
  },
});

export default WeekDays;
