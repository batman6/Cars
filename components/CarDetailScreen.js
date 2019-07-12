import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, Text, Card, Button } from 'react-native';
import firebase from '../Firebase';

class CarDetailScreen extends Component {
  static navigationOptions = {
    title: 'Car Details',
  };
  constructor() {
    super();
    this.state = {
      isLoading: true,
      car: {},
      key: ''
    };
  }
  componentDidMount() {
    const { navigation } = this.props;
    const ref = firebase.firestore().collection('cars').doc(JSON.parse(navigation.getParam('carkey')));
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          car: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log("No such document!");
      }
    });
  }
  deleteCar(key) {
    const { navigation } = this.props;
    this.setState({
      isLoading: true
    });
    firebase.firestore().collection('cars').doc(key).delete().then(() => {
      console.log("Document successfully deleted!");
      this.setState({
        isLoading: false
      });
      navigation.navigate('Car');
    }).catch((error) => {
      console.error("Error removing document: ", error);
      this.setState({
        isLoading: false
      });
    });
  }
  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    }
    return (
        <Card style={styles.container}>
          <View style={styles.subContainer}>
            <View>
              <Text h3>{this.state.car.name}</Text>
            </View>
            <View>
              <Text h5>{this.state.car.color}</Text>
            </View>
            <View>
              <Text h4>{this.state.car.model}</Text>
            </View>
          </View>
          <View style={styles.detailButton}>
            <Button
              large
              backgroundColor={'#CCCCCC'}
              leftIcon={{name: 'edit'}}
              title='Edit'
              onPress={() => {
                this.props.navigation.navigate('EditCar', {
                  carkey: `${JSON.stringify(this.state.key)}`,
                });
              }} />
          </View>
          <View style={styles.detailButton}>
            <Button
              large
              backgroundColor={'#999999'}
              color={'#FFFFFF'}
              leftIcon={{name: 'delete'}}
              title='Delete'
              onPress={() => this.deleteCar(this.state.key)} />
          </View>
        </Card>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  subContainer: {
    flex: 1,
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#CCCCCC',
  },
  activity: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  detailButton: {
    marginTop: 10
  }
})

export default CarDetailScreen;
