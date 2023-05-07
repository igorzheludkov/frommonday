import React from 'react';
import {View} from 'react-native';

interface IProps {
  height?: number;
}

export default function Divider(props: IProps) {
  return <View style={[{height: props.height ?? 5}]} />;
}
