import React, {useState} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import FloatingActionsBar from '../../components/FloatingActionsBar';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootNavigationStack} from '../../models/INavigationStack';
import {useNavigation} from '@react-navigation/native';
import generateID from '../../utils/generateID';
import WeekDays from '../../components/WeekDays';
import TimePicker from '../../components/TimePicker';
import IHabbit from '../../models/IHabbit';
import {addHabbit, removeHabbit} from '../../store/modules/appSlice/slice';
import {useAppDispatch} from '../../store/hooks';
import Divider from '../../components/Layout/Divider';

type Props = NativeStackScreenProps<RootNavigationStack, 'AddHabbitScreen'>;

export default function AddHabbit(props: Props) {
  const editableItem = props.route.params?.item;
  const navigation = useNavigation<Props['navigation']>();
  const id = generateID();
  const dispatch = useAppDispatch();
  const currentDayOfTheWeek = new Date().getDay();

  const [habbit, setHabbit] = useState<IHabbit>(
    editableItem ?? {id, status: 0, days: [currentDayOfTheWeek], time: []},
  );

  function addHabbitHandler() {
    dispatch(addHabbit(habbit));
    navigation.goBack();
  }

  function removeHabbitHandler() {
    dispatch(removeHabbit(habbit.id));
    navigation.goBack();
  }

  return (
    <View style={styles.wrapper}>
      <TextInput
        placeholder="Title"
        onChangeText={title => setHabbit({...habbit, title})}
        value={habbit.title}
      />
      <TextInput
        placeholder="Description / Link"
        onChangeText={description => setHabbit({...habbit, description})}
        value={habbit.description}
      />
      <WeekDays
        onSelectionChange={days => setHabbit({...habbit, days})}
        selectedDays={habbit.days}
      />
      <Divider />
      <TimePicker
        onTimesSelect={time => setHabbit({...habbit, time})}
        interval={2}
        beginTime={720}
        endTime={780}
        selectedTimes={habbit.time}
        numColumns={4}
      />
      <FloatingActionsBar
        firstButtonText="Cancel"
        firstButtonHandler={() => navigation.goBack()}
        secondButtonText={editableItem ? 'Remove' : undefined}
        secondButtonHandler={
          editableItem ? () => removeHabbitHandler() : undefined
        }
        thirdButtonText="Save"
        thirdButtonHandler={() => addHabbitHandler()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
});
