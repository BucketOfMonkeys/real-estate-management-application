import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.current_user.email,
      firstname: this.props.current_user.firstName,
      lastname: this.props.current_user.lastName,
      editing: false,
    };

    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onEditHandler = this.onEditHandler.bind(this);
  }

  componentDidMount() {
    console.log(this.props.current_user);
  }

  onSubmitHandler(e) {
    e.preventDefault();
    const {email, firstname, lastname} = this.state;
    if (email && firstname && lastname) {
      console.log('submitted');
    }
  }

  onChangeHandler(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  onEditHandler() {
    this.setState(prevState => ({editing: !prevState.editing}));
  }

  render() {
    const {
      email, firstname, lastname, editing,
    } = this.state;
    let settingsDisplay = (
      <Fragment>
        <p>email: {this.state.email}</p>
        <p>firstname: {this.state.firstname}</p>
        <p>lastname: {this.state.lastname}</p>
      </Fragment>
    );
    if (editing) {
      settingsDisplay = (
        <form onSubmit={this.onSubmitHandler}>
          <input
            onChange={this.onChangeHandler}
            className="Settings__input Settings__input--email"
            value={email}
            name="email"
            type="email"
          />
          <input
            onChange={this.onChangeHandler}
            className="Settings__input Settings__input--firstname"
            value={firstname}
            name="firstname"
            type="text"
          />
          <input
            onChange={this.onChangeHandler}
            className="Settings__input Settings__input--lastname"
            value={lastname}
            name="lastname"
            type="text"
          />
          <input type="submit" value="" />
        </form>
      );
    }
    return (
      <div className="Settings">
        <button onClick={this.onEditHandler}>{editing ? 'Save Profile' : 'Edit Profile'}</button>
        {settingsDisplay}
      </div>
    );
  }
}

const mapStateToProps = state => ({...state.userReducer});

export default connect(mapStateToProps, null)(Settings);