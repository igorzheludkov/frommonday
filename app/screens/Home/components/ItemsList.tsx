import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import IHabbit from '../../../models/IHabbit';

interface Props {
  items: IHabbit[];
  editHandler: (item: IHabbit) => void;
}

const ItemList: React.FC<Props> = ({items, editHandler}) => {
  const groupedItems = groupItemsByTime(items);

  function editHabbitHandler(id: string) {
    const findPressedHabbit = items.find(item => item.id === id);
    findPressedHabbit && editHandler(findPressedHabbit);
  }

  const renderGroup = (time: number, groupItems: IHabbit[]) => {
    const timeString = minutesToTimeString(time);
    return (
      <View style={styles.groupWrapper} key={timeString}>
        <View style={styles.groupTitleWrapper}>
          <Text style={styles.groupTitle}>{timeString}</Text>
          <View style={styles.groupTitleDivider} />
        </View>
        {groupItems.map(item => (
          <View key={item.id}>
            {item.time?.map((_, index) => (
              <Pressable
                onPress={() => editHabbitHandler(item.id)}
                style={styles.itemWrapper}
                key={`${item.id}-${index}`}>
                <Text style={styles.item}>{item.title}</Text>
              </Pressable>
            ))}
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {groupedItems.map(group => renderGroup(group.time, group.items))}
    </View>
  );
};

const groupItemsByTime = (
  items: IHabbit[],
): {time: number; items: IHabbit[]}[] => {
  const groupedItems: {[key: number]: IHabbit[]} = {};

  items.forEach(item => {
    item.time?.forEach(time => {
      if (!groupedItems[time]) {
        groupedItems[time] = [];
      }
      // create a new object for each time value
      const newItem = {...item, time: [time]};
      groupedItems[time].push(newItem);
    });
  });

  return Object.keys(groupedItems).map(timeString => ({
    time: parseInt(timeString, 10),
    items: groupedItems[parseInt(timeString, 10)],
  }));
};

const minutesToTimeString = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const minutesPart = (minutes % 60).toString().padStart(2, '0');
  return `${hours}.${minutesPart}`;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  groupWrapper: {
    marginBottom: 16,
  },
  groupTitleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  groupTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  groupTitleDivider: {
    height: 1,
    flex: 1,
    backgroundColor: '#ccc',
    marginLeft: 8,
  },
  itemWrapper: {},
  item: {
    backgroundColor: '#BDC4FF',
    padding: 5,
    marginVertical: 2,
    borderRadius: 5,
  },
});

export default ItemList;
