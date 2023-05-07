import React, {useState} from 'react';
import {ScrollView, Text, StyleSheet, View} from 'react-native';
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

type Props = NativeStackScreenProps<RootNavigationStack, 'HomeScreen'>;

export default function Home() {
  const navigation = useNavigation<Props['navigation']>();
  const habbits = useAppSelector(state => state.appSlice.habbits);
  const banner = useAppSelector(state => state.appSlice.banner);
  const dispatch = useAppDispatch();

  const today = new Date().getDay();

  const [selectedDay, setSelectedDay] = useState<number>(today);

  const filterItemsHasOnlyTimeField = habbits.filter(
    item => item.hasOwnProperty('time') && !item.hasOwnProperty('days'),
  );

  const filterItemsWithoutTimeField = habbits.filter(
    item => !item.hasOwnProperty('time') && item.days?.includes(selectedDay),
  );

  const filterItemsWithoutDaysAndTimeField = habbits.filter(
    item => !item.hasOwnProperty('days') && !item.hasOwnProperty('time'),
  );

  const filterItemsHasDayAndTimeFields = habbits.filter(
    item =>
      item.hasOwnProperty('days') &&
      item.hasOwnProperty('time') &&
      item.days?.includes(selectedDay),
  );

  const shedule = [
    ...filterItemsHasDayAndTimeFields,
    ...filterItemsHasOnlyTimeField,
  ];

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
          <View style={styles.uncatetegorisedContainer}>
            <Text style={styles.uncatetegorizedTitle}>Ungategorised</Text>
            <View style={styles.uncatetegorisedItems}>
              {filterItemsWithoutDaysAndTimeField.map((habbit: IHabbit) => (
                <HabbitItem
                  item={habbit}
                  key={habbit.id}
                  editHandler={editHabbitHandler}
                />
              ))}
            </View>
          </View>

          <View style={styles.uncatetegorisedContainer}>
            <Text style={styles.uncatetegorizedTitle}>All Day</Text>
            <View style={styles.uncatetegorisedItems}>
              {filterItemsWithoutTimeField.map((habbit: IHabbit) => (
                <HabbitItem
                  item={habbit}
                  key={habbit.id}
                  editHandler={editHabbitHandler}
                />
              ))}
            </View>
          </View>

          <View style={styles.scheduledContainer}>
            <Text style={styles.scheduledTitle}>Scheduled</Text>
            <ItemsList items={shedule} editHandler={editHabbitHandler} />
          </View>
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
