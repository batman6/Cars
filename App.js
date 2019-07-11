import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import CarScreen from './components/CarScreen';
import CarDetailScreen from './components/CarDetailScreen';
import AddCarScreen from './components/AddCarScreen';
import EditCarScreen from './components/EditCarScreen';

const RootStack = createStackNavigator(
  {
    Car: CarScreen,
    CarDetails: CarDetailScreen,
    AddCar: AddCarScreen,
    EditCar: EditCarScreen,
  },
  {
    initialRouteName: 'Car',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#777777',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerBackTitle: null,
    },
  },
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});