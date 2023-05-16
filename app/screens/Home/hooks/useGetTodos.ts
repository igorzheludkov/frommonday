import {useState} from 'react';
import IHabbit from '../../../models/IHabbit';

//create custom hook for managing state
export default function useGetTodos(habbits: IHabbit[]) {
  const today = new Date().getDay();

  const [selectedDay, setSelectedDay] = useState<number>(today);

  const filterItemsHasOnlyTime = habbits.filter(
    item => item.hasOwnProperty('time') && item.days?.length === 0,
  );

  const filterItemsHasOnlyDay = habbits.filter(
    item => item.time?.length === 0 && item.days?.includes(selectedDay),
  );

  const filterItemsWithoutDaysAndTimeField = habbits.filter(
    item => item.days?.length === 0 && item.time?.length === 0,
  );

  const filterItemsHasDayAndTimeFields = habbits.filter(
    item =>
      item.hasOwnProperty('days') &&
      item.hasOwnProperty('time') &&
      item.days?.includes(selectedDay),
  );

  const scheduleDay = [
    ...filterItemsHasDayAndTimeFields,
    ...filterItemsHasOnlyTime,
  ];

  return {
    schedule: {
      day: scheduleDay,
      withoutTime: filterItemsHasOnlyDay,
      withoutDaysAndTime: filterItemsWithoutDaysAndTimeField,
    },
    selectedDay,
    setSelectedDay,
  };
}
