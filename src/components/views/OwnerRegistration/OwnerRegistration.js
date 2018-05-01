import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createOwner} from '../../../redux/ducks/userReducer';
import './OwnerRegistration.css';

class OwnerRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      companyName: '',
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
      firstName, lastName, companyName, email, password, confirmPassword,
    } = this.state;

    if (this.props.authenticated) {
      this.props.history.push('/owner/dashboard');
    }

    return (
      <div className="OwnerRegistration">
        <div className="OwnerRegistration__form">
          <form onSubmit={this.onSubmitHandler}>
            <input
              className="OwnerRegistration__input OwnerRegistration__input--firstname"
              onChange={this.onChangeHandler}
              required
              placeholder="firstName"
              name="firstName"
              maxLength="35"
              value={firstName}
              type="text"
            />
            <input
              className="OwnerRegistration__input OwnerRegistration__input--lastname"
              onChange={this.onChangeHandler}
              required
              placeholder="lastName"
              name="lastName"
              maxLength="35"
              value={lastName}
              type="text"
            />
            <input
              className="OwnerRegistration__input OwnerRegistration__input--companyname"
              onChange={this.onChangeHandler}
              placeholder="companyName"
              name="companyName"
              value={companyName}
              type="text"
            />
            <input
              className="OwnerRegistration__input OwnerRegistration__input--email"
              onChange={this.onChangeHandler}
              required
              placeholder="email"
              name="email"
              value={email}
              type="email"
            />
            <input
              className="OwnerRegistration__input OwnerRegistration__input--password"
              onChange={this.onChangeHandler}
              required
              placeholder="password"
              name="password"
              value={password}
              type="password"
            />
            <input
              className="OwnerRegistration__input OwnerRegistration__input--confirmpassword"
              onChange={this.onChangeHandler}
              required
              placeholder="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              type="password"
            />
            <button
              onClick={() =>
                this.props.createOwner(
                  this.state.email,
                  this.state.password,
                  this.state.firstName,
                  this.state.lastName,
                  this.state.companyName,
                )
              }
            >
              Register
            </button>
          </form>
          <div className="OwnerRegistration__sign-in">
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

OwnerRegistration.propTypes = {
  createOwner: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  ...state.userReducer,
});

// export default connect(null, {createOwner})(OwnerRegistration);
export default connect(mapStateToProps, {createOwner})(OwnerRegistration);