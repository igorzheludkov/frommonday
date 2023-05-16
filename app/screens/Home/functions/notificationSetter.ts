import notifee from '@notifee/react-native';
import IHabbit from '../../../models/IHabbit';
import generateID from '../../../utils/generateID';

export function showTodos(items: IHabbit[]) {
  const currentTodos = actualTodos(items);
  if (currentTodos) {
    currentTodos.forEach(todo => {
      onDisplayNotification(todo.title, todo.description);
    });
  }
}

export function actualTodos(data: IHabbit[]) {
  const currentTimeInMinutes =
    new Date().getHours() * 60 + new Date().getMinutes();
  const currentDay = new Date().getDay();

  let plannedTodos: PlannedTodosType[] = [];

  const todayTodos = data.filter(
    habbit =>
      (habbit.days?.includes(currentDay) && habbit.hasOwnProperty('time')) ||
      (habbit.hasOwnProperty('time') && !habbit.hasOwnProperty('days')),
  );

  todayTodos.forEach(habbit => {
    habbit.time?.forEach(time => {
      if (time >= currentTimeInMinutes) {
        plannedTodos.push({
          id: generateID(),
          title: habbit.title || '',
          description: habbit.description || '',
          minutes: time,
        });
      }
    });
  });

  const findCurrentTodos = plannedTodos.filter(
    todo =>
      todo.minutes + 2 >= currentTimeInMinutes &&
      currentTimeInMinutes >= todo.minutes,
  );

  return findCurrentTodos;
}

export async function onDisplayNotification(title: string, body: string) {
  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  // Display a notification
  await notifee.displayNotification({
    title,
    body,
    android: {
      channelId,
      // pressAction is needed if you want the notification to open the app when pressed
      pressAction: {
        id: 'default',
      },
    },
  });
}

type PlannedTodosType = {
  id: string;
  title: string;
  description: string;
  minutes: number;
};
