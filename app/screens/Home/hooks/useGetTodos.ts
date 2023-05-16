import {useState} from 'react';
import IHabbit from '../../../models/IHabbit';

//create custom hook for managing state
export default function useGetTodos(habbits: IHabbit[]) {
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

  const scheduleDay = [
    ...filterItemsHasDayAndTimeFields,
    ...filterItemsHasOnlyTimeField,
  ];
  return {
    schedule: {
      day: scheduleDay,
      withoutTime: filterItemsWithoutTimeField,
      withoutDaysAndTime: filterItemsWithoutDaysAndTimeField,
    },
    selectedDay,
    itemsWithoutDaysAndTime: filterItemsWithoutDaysAndTimeField,
    setSelectedDay,
  };
}
