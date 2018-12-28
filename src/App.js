import React, { Component } from 'react';
import './App.css';
import firebase from 'firebase';
import Auth from './Auth/Auth';
import BlocksPanel from "./Blocks/BlocksPanel";

const styledBlock = {
  width: 80,
  height: 80,
  border: '1px solid black',
  display: 'inline-block',
  cursor: 'pointer',
};

class App extends Component {
  state = {
    isConnected: false,
    blocks: {},
    error: '',
  };

  componentDidMount() {
    firebase
      .database()
      .ref('/blocks')
      .on('value', snapshot => {
        this.setState(state => ({
          ...state,
          blocks: snapshot.val(),
        }));
      });
  }

  signIn = ({ email, password }) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        firebase
          .database()
          .ref('/users/' + firebase.auth().currentUser.uid)
          .once('value')
          .then(snapshot => {
            this.setState(state => ({
              ...state,
              isConnected: true,
            }));
          });
      })
      .catch(error => {
        // Handle Errors here.
        this.triggerError(error);
      });
  };

  signUp = ({ email, password }) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(state => ({
          ...state,
          isConnected: true,
        }));
      })
      .catch(error => {
        // Handle Errors here.
        this.triggerError(error);
      });
  };

  removeBlock = key => {
    firebase
      .database()
      .ref('/blocks/' + key)
      .remove()
      .catch(e => {
        this.triggerError(e);
      });
  };

  triggerError = error => {
    this.setState(
      state => ({
        ...state,
        error: error.message,
      }),
      () => {
        setTimeout(() => {
          this.setState(state => ({
            ...state,
            error: '',
          }));
        }, 5000);
      }
    );
  };

  addBlock = () => {
    firebase
      .database()
      .ref('/blocks')
      .push({ value: 'Nouveau block !' });
  };

  render() {
    const { isConnected, error, blocks } = this.state;
    return (
      <div className="App">
        <Auth signIn={this.signIn} signUp={this.signUp} />
        {isConnected && <div>Vous êtes connectés !</div>}
        {isConnected && (
          <BlocksPanel triggerError={this.triggerError}/>
        )}
        {error && <div>{error}</div>}
      </div>
    );
  }
}

export default App;
