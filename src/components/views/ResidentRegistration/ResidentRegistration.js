import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {createResident} from '../../../redux/ducks/userReducer';
import {connect} from 'react-redux';
import './ResidentRegistration.css';

class ResidentRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    };

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  onChangeHandler(e) {
    return this.setState({[e.target.name]: e.target.value});
  }

  onSubmitHandler(e) {
    e.preventDefault();
    if (this.state.password === this.state.confirmPassword) {
      // this.props.register({...this.state});
    }
  }

  render() {
    const {
      firstName, lastName, email, password, confirmPassword,
    } = this.state;

    if (this.props.authenticated) {
      this.props.history.push('/');
    }

    console.log(this.props.authenticated);

    return (
      <div className="ResidentRegistration">
        <div className="ResidentRegistration__form">
          <form onSubmit={this.onSubmitHandler}>
            <input
              className="ResidentRegistration__input ResidentRegistration__input--firstname"
              onChange={this.onChangeHandler}
              required
              placeholder="firstName"
              name="firstName"
              maxLength="35"
              value={firstName}
              type="text"
            />
            <input
              className="ResidentRegistration__input ResidentRegistration__input--lastname"
              onChange={this.onChangeHandler}
              required
              placeholder="lastName"
              name="lastName"
              maxLength="35"
              value={lastName}
              type="text"
            />
            <input
              className="ResidentRegistration__input ResidentRegistration__input--email"
              onChange={this.onChangeHandler}
              required
              placeholder="email"
              name="email"
              value={email}
              type="email"
            />
            <input
              className="ResidentRegistration__input ResidentRegistration__input--password"
              onChange={this.onChangeHandler}
              required
              placeholder="password"
              name="password"
              value={password}
              type="password"
            />
            <input
              className="ResidentRegistration__input ResidentRegistration__input--confirmpassword"
              onChange={this.onChangeHandler}
              required
              placeholder="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              type="password"
            />
            <button
              onClick={() =>
                this.props.createResident(
                  this.state.email,
                  this.state.password,
                  this.state.firstName,
                  this.state.lastName,
                )
              }
            >
              Register
            </button>
          </form>
          <div className="ResidentRegistration__sign-in">
            Already have an account?{' '}
            <Link className="Link__none" to="/login/owner/returning">
              Sign In.
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

ResidentRegistration.propTypes = {
  register: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  ...state.userReducer,
});

export default connect(mapStateToProps, {createResident})(ResidentRegistration);
