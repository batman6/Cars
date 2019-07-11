import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, List, ListItem, Button } from 'react-native';
import firebase from '../Firebase';

export default class CarScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Car List',
      headerRight: (
        <Button
          title='+'
          buttonStyle={{ padding: 0, backgroundColor: 'transparent' }}
          icon={{ name: 'add-circle', style: { marginRight: 0, fontSize: 28 } }}
          onPress={() => { navigation.push('AddCar') }}
        />
      ),
    };
  };
  constructor() {
    super();
    this.ref = firebase.firestore().collection('cars');
    this.unsubscribe = null;
    this.state = {
      isLoading: true,
      cars: []
    };
  }
  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }
  onCollectionUpdate = (querySnapshot) => {
    const cars = [];
    querySnapshot.forEach((doc) => {
      const { name, color, model } = doc.data();
      cars.push({
        key: doc.id,
        doc,
        name,
        color,
        model,
      });
    });
    this.setState({
      cars,
      isLoading: false,
   });
  }
  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff"/>
        </View>
      );
    }
    return (
      <ScrollView style={styles.container}>
        <List>
          {
            this.state.cars.map((item, i) => (
              <ListItem
                key={i}
                name={item.name}
                leftIcon={{name: 'book', type: 'font-awesome'}}
                onPress={() => {
                  this.props.navigation.navigate('CarDetails', {
                    carkey: `${JSON.stringify(item.key)}`,
                  });
                }}
              />
            ))
          }
        </List>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingBottom: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  activity: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})