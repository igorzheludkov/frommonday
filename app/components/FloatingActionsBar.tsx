import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';

interface Props {
  firstButtonHandler?: () => void;
  firstButtonText?: string;
  secondButtonHandler?: () => void;
  secondButtonText?: string;
  thirdButtonHandler?: () => void;
  thirdButtonText?: string;
}

export default function FloatingActionsBar(props: Props) {
  return (
    <View style={styles.wrapper}>
      {Boolean(props.firstButtonText) && (
        <TouchableOpacity
          style={styles.button}
          onPress={props.firstButtonHandler}>
          <Text>{props.firstButtonText}</Text>
        </TouchableOpacity>
      )}
      {Boolean(props.secondButtonText) && (
        <TouchableOpacity
          style={styles.button}
          onPress={props.secondButtonHandler}>
          <Text>{props.secondButtonText}</Text>
        </TouchableOpacity>
      )}
      {Boolean(props.thirdButtonText) && (
        <TouchableOpacity
          style={styles.button}
          onPress={props.thirdButtonHandler}>
          <Text>{props.thirdButtonText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    borderRadius: 25,
    backgroundColor: '#D9D9D9',
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
});
