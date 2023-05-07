import {ParamListBase} from '@react-navigation/native';
import IHabbit from './IHabbit';

export interface RootNavigationStack extends ParamListBase {
  HomeScreen: undefined;
  AddHabbitScreen: {item: IHabbit} | undefined;
}
