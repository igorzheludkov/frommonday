import React from 'react';
import {RootNavigationStack} from '../models/INavigationStack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home/Home';
import AddHabbit from '../screens/AddHabbit/AddHabbit';

const Stack = createNativeStackNavigator<RootNavigationStack>();

export default function RootNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="AdminPanelScreen">
      <Stack.Screen name="HomeScreen" component={Home} />
      <Stack.Screen name="AddHabbitScreen" component={AddHabbit} />
    </Stack.Navigator>
  );
}
