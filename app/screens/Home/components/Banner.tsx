import React from 'react';
import {View, Image, TouchableOpacity, StyleSheet, Text} from 'react-native';

interface Props {
  imageSource: string | undefined;
  onPressButton: () => void;
}

export default function Banner({imageSource, onPressButton}: Props) {
  const defaultImage = require('./banner.png');
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={imageSource ? {uri: imageSource} : defaultImage}
      />
      <TouchableOpacity style={styles.button} onPress={onPressButton}>
        <Text style={styles.buttonText}>change</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 170,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  button: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    borderColor: 'gray',
    borderWidth: 1,
    paddingVertical: 1,
    paddingHorizontal: 5,
    borderRadius: 4,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
