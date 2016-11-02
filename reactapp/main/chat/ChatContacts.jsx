import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getContacts } from './chatContactsActionGenerators.jsx'
import { selectContact } from './chatContactsActionGenerators.jsx'


class ChatContacts extends Component {

    componentWillMount() {
        this.props.getContacts();
    }

    renderList() {
        return this.props.contacts.contacts.filter(contact => contact !== this.props.username).map((contact) => {
           const activeContact = this.props.contacts.activeContact === contact ? "activeContact" : "";
           return (
             <li
                 key={contact}
                 onClick={() => this.props.selectContact(contact) }
                 className={`list-group-item ${activeContact}`}>{contact}
             </li>
           );
        });
    }

    render() {
        return (
            <ul className="list-group">
                { this.renderList() }
            </ul>
        );
    }

}

function mapStateToProps(state) {
    return {
        contacts: state.contacts,
        username: state.auth.username
    };
}

// Anything returned from this function will end up as props on the ChatContacts container.
function mapDispatchToProps(dispatch) {
    // Whenever getContacts is called, the result should be passed to all of our reducers
    return bindActionCreators({ getContacts, selectContact }, dispatch)
}

// promote booklist from a component to a container
export default connect(mapStateToProps, mapDispatchToProps)(ChatContacts);