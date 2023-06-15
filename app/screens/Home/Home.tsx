import React, {useEffect} from 'react';
import {ScrollView, Text, StyleSheet, View} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import FloatingActionsBar from '../../components/FloatingActionsBar';
import {useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootNavigationStack} from '../../models/INavigationStack';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import WeekDays from '../../components/WeekDays';
import IHabbit from '../../models/IHabbit';
import HabbitItem from './components/HabbitItem';
import ItemsList from './components/ItemsList';
import Banner from './components/Banner';
import {changeBanner} from '../../store/modules/appSlice/slice';
import {launchImageLibrary} from 'react-native-image-picker';
import Divider from '../../components/Layout/Divider';
import {showTodos} from './functions/notificationSetter';
import useGetTodos from './hooks/useGetTodos';

import {useOrientation} from 'react-native-use-hooks';

type Props = NativeStackScreenProps<RootNavigationStack, 'HomeScreen'>;

export default function Home() {
  const orientation = useOrientation();
  console.log('~~~~~~~~~~~~~~ orientation', orientation);
  const dispatch = useAppDispatch();
  const navigation = useNavigation<Props['navigation']>();
  const banner = useAppSelector(state => state.appSlice.banner);
  const habbits = useAppSelector(state => state.appSlice.habbits);
  const {schedule, selectedDay, setSelectedDay} = useGetTodos(habbits);

  function editHabbitHandler(item: IHabbit) {
    navigation.navigate('AddHabbitScreen', {item});
  }

  function changeBannerHandler() {
    launchImageLibrary({mediaType: 'photo', selectionLimit: 1}, response => {
      if (response.didCancel) {
        return;
      } else if (response.assets?.length) {
        dispatch(changeBanner(response.assets[0]?.uri));
      }
    });
  }
  // useEffect(() => {
  //   let interval = 1;

  //   if (schedule.day.length) {
  //     interval = BackgroundTimer.setInterval(() => {
  //       showTodos(schedule.day);
  //     }, 60000);
  //   }
  //   return () => {
  //     BackgroundTimer.clearInterval(interval);
  //   };
  // }, [schedule.day]);

  useEffect(() => {
    if (schedule.day.length) {
      BackgroundTimer.runBackgroundTimer(() => {
        showTodos(schedule.day);
      }, 60000);
    }

    return () => {
      BackgroundTimer.stopBackgroundTimer();
    };
  }, [schedule.day]);

  return (
    <>
      <ScrollView style={styles.wrapper}>
        <Banner imageSource={banner} onPressButton={changeBannerHandler} />
        <View style={styles.container}>
          <Divider height={10} />
          <WeekDays
            multiple={false}
            onSelectionChange={item => setSelectedDay(item[0])}
            selectedDays={[selectedDay]}
          />
          <Divider />
          {Boolean(schedule.withoutDaysAndTime.length) && (
            <View style={styles.uncatetegorisedContainer}>
              <Text style={styles.uncatetegorizedTitle}>Ungategorised</Text>
              <View style={styles.uncatetegorisedItems}>
                {schedule.withoutDaysAndTime.map((habbit: IHabbit) => (
                  <HabbitItem
                    item={habbit}
                    key={habbit.id}
                    editHandler={editHabbitHandler}
                  />
                ))}
              </View>
            </View>
          )}

          {Boolean(schedule.withoutTime.length) && (
            <View style={styles.uncatetegorisedContainer}>
              <Text style={styles.uncatetegorizedTitle}>All Day</Text>
              <View style={styles.uncatetegorisedItems}>
                {schedule.withoutTime.map((habbit: IHabbit) => (
                  <HabbitItem
                    item={habbit}
                    key={habbit.id}
                    editHandler={editHabbitHandler}
                  />
                ))}
              </View>
            </View>
          )}

          {Boolean(schedule.day.length) && (
            <View style={styles.scheduledContainer}>
              <Text style={styles.scheduledTitle}>Scheduled</Text>
              <ItemsList items={schedule.day} editHandler={editHabbitHandler} />
            </View>
          )}
        </View>
      </ScrollView>
      <FloatingActionsBar
        firstButtonHandler={() => console.log('first')}
        firstButtonText="Settings"
        secondButtonHandler={() => navigation.navigate('AddHabbitScreen')}
        secondButtonText="Add"
      />
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    paddingHorizontal: 10,
    paddingBottom: 100, // for the floating action bar
  },
  uncatetegorisedContainer: {
    marginVertical: 10,
  },
  uncatetegorizedTitle: {
    marginBottom: 10,
  },
  uncatetegorisedItems: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: 8,
    rowGap: 5,
  },
  scheduledContainer: {},
  scheduledTitle: {
    marginBottom: 10,
  },
});
