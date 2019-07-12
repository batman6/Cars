import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, TextInput, Button } from 'react-native';
import firebase from '../Firebase';

class AddCarScreen extends Component {
  static navigationOptions = {
    title: 'Add Car',
  };
  constructor() {
    super();
    this.ref = firebase.firestore().collection('cars');
    this.state = {
      name: '',
      color: '',
      model: '',
      isLoading: false,
    };
  }
  updateTextInput = (text, field) => {
    const state = this.state
    state[field] = text;
    this.setState(state);
  }

  saveCar() {
    this.setState({
      isLoading: true,
    });
    this.ref.add({
      name: this.state.name,
      color: this.state.color,
      model: this.state.model,
    }).then((docRef) => {
      this.setState({
        name: '',
        color: '',
        model: '',
        isLoading: false,
      });
      this.props.navigation.goBack();
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
      this.setState({
        isLoading: false,
      });
    });
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff"/>
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <View style={styles.subContainer}>
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
            leftIcon={{name: 'save'}}
            title='Save'
            onPress={() => this.saveCar()} />
        </View>
      </View>
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

export default AddCarScreen;
