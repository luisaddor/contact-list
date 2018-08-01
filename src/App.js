import React, { Component } from 'react';
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

  render() {
    return (
      <div className="App">
        <ContactList
          onDeleteContact={this.onRemoveContact}
          contacts={this.state.contacts}
        />
        <CreateContact />
      </div>
    );
  }
}

export default App;
