import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';

class ContactList extends Component {
  static = {
      contacts: PropTypes.array.isRequired,
      onDeleteContact: PropTypes.func.isRequired
  }

  state = {
    query: ''
  }

  updateQuery = (query) => {
    this.setState({
      query: query.trim()
    })
  }

  clearQuery = () => {
    this.setState({ query: '' })
  }

  render() {
    let showingContacts

    if(this.state.query) {
      const match = new RegExp(escapeRegExp(this.state.query), 'i')

      showingContacts = this.props.contacts.filter((contact) =>
        match.test(contact.name)
      )
    } else {
      showingContacts = this.props.contacts
    }

    showingContacts.sort(sortBy('name'))

    return (
      <div className="list-contacts">
        <div className="list-contacts-top">
          <input
            className="search-contacts"
            type="text"
            placeholder="Search contacts"
            value={this.state.query}
            onChange={(event) => this.updateQuery(event.target.value)}
          />

          <Link to='/create' className='add-contact'> Add contact </Link>
        </div>
        {showingContacts.length !== this.props.contacts.length && (
          <div className="showing-contacts">
            <span>now showing {showingContacts.length} of {this.props.contacts.length}</span>
            <button onClick={this.clearQuery}>Show All </button>
          </div>
        )}
        <ol className="contact-list">
          {showingContacts.map( (contact) =>
            <li key={contact.id} className="contact-list-item">
              <div className="contact-avatar" style={{
                backgroundImage: `url(${contact.avatarURL})`
              }}/>

              <div className="contact-details">
                <p>{contact.name}</p>
                <p>{contact.email}</p>
              </div>

              <button onClick={() => this.props.onDeleteContact(contact)} className='contact-remove'>Remove</button>
            </li>
          )}
        </ol>
      </div>
    )
  }
}

export default ContactList;
