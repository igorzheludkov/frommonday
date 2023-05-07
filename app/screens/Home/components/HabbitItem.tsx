import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import IHabbit from '../../../models/IHabbit';

interface IProps {
  item: IHabbit;
  editHandler: (item: IHabbit) => void;
}

export default function HabbitItem(props: IProps) {
  return (
    <TouchableOpacity
      onPress={() => props.editHandler(props.item)}
      style={styles.wrapper}>
      <Text style={styles.text}>{props.item?.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'lightblue',
    borderRadius: 5,
  },
});
