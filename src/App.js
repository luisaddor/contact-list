import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ContactList from './ContactList';
import * as ContactAPI from './utils/ContactsAPI';
import CreateContact from './CreateContact';

class App extends Component {
  state = {
    contacts: []
  }

  componentDidMount() {
    ContactAPI.getAll().then(contacts => {
      this.setState({contacts: contacts})
    })
  }

  onRemoveContact = (contact) => {
    this.setState((state) => ({
      contacts: state.contacts.filter((c) => c.id !== contact.id)
    }))

    ContactAPI.remove(contact)
  }

  createContact = (contact) => {
    ContactAPI.create(contact).then(contact => {
      this.setState(state => ({
        contacts: state.contacts.concat([ contact ])
      }))
    })
  }

  render() {
    return (
      <div className="App">
        <Route exact path='/' render={() => (
          <ContactList
            onDeleteContact={this.onRemoveContact}
            contacts={this.state.contacts}
          />
        )}/>

        <Route path='/create' render={({ history }) => (
          <CreateContact onCreateContact={(contact) => {
            this.createContact(contact)
            history.push('/')
          }} />
        )}/>
      </div>
    );
  }
}
export default App;
