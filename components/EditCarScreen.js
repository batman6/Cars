import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, TextInput, Button } from 'react-native';
import firebase from '../Firebase';

class EditCarScreen extends Component {
  static navigationOptions = {
    title: 'Edit Car',
  };
  constructor() {
    super();
    this.state = {
      key: '',
      isLoading: true,
      name: '',
      color: '',
      model: ''
    };
  }
  componentDidMount() {
    const { navigation } = this.props;
    const ref = firebase.firestore().collection('cars').doc(JSON.parse(navigation.getParam('carkey')));
    ref.get().then((doc) => {
      if (doc.exists) {
        const car = doc.data();
        this.setState({
          key: doc.id,
          name: car.name,
          color: car.color,
          model: car.model,
          isLoading: false
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  updateTextInput = (text, field) => {
    const state = this.state
    state[field] = text;
    this.setState(state);
  }

  updateCar() {
    this.setState({
      isLoading: true,
    });
    const { navigation } = this.props;
    const updateRef = firebase.firestore().collection('cars').doc(this.state.key);
    updateRef.set({
      name: this.state.name,
      color: this.state.color,
      model: this.state.model,
    }).then((docRef) => {
      this.setState({
        key: '',
        name: '',
        color: '',
        model: '',
        isLoading: false,
      });
      this.props.navigation.navigate('Car');
    })
      .catch((error) => {
        console.error("Error adding document: ", error);
        this.setState({
          isLoading: false,
        });
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    }
    return (
      <View><View style={styles.subContainer}>
        <TextInput
          placeholder={'Name'}
          value={this.state.name}
          onChangeText={(text) => this.updateTextInput(text, 'name')}
        />
      </View>
        <View style={styles.subContainer}>
          <TextInput
            multiline={true}
            numberOfLines={4}
            placeholder={'Color'}
            value={this.state.color}
            onChangeText={(text) => this.updateTextInput(text, 'color')}
          />
        </View>
        <View style={styles.subContainer}>
          <TextInput
            placeholder={'Model'}
            value={this.state.model}
            onChangeText={(text) => this.updateTextInput(text, 'model')}
          />
        </View>
        <View style={styles.button}>
          <Button
            large
            leftIcon={{ name: 'update' }}
            title='Update'
            onPress={() => this.updateCar()} />
        </View></View>
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
    marginBottom: 20,
    padding: 5,
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
  }
})

export default EditCarScreen;
