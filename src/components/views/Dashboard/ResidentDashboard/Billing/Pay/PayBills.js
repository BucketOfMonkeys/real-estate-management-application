import React, {Component} from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import {connect} from 'react-redux';
import {getBills} from '../../../../../../redux/ducks/residentReducer';

import './PayBills.css';

class PayBills extends Component {
  constructor() {
    super();

    this.state = {
      amount: 0,
      billid: 0,
    };
  }

  componentDidMount() {
    this.props.getBills();
  }

  onToken = token => {
    axios
      .post('/bills/pay', {
        amount: this.state.amount,
        stripeToken: token,
        billid: this.state.billid,
      })
      .then(res => this.props.getBills())
      .catch(err => err);
  };

  selectBill(value) {
    const {bills} = this.props.bills;
    const bucketOfMonkeys = bills.findIndex(element => element.amount == value);

    this.setState({
      amount: +bills[bucketOfMonkeys].amount,
      billid: +bills[bucketOfMonkeys].billid,
    });
  }

  render() {
    let mappedItems = [];

    const re = /\b(\d+)(\d{2})\b/;
    const subst = '$1.$2';

    const {bills} = this.props.bills;

    if (bills && bills[0]) {
      mappedItems = bills.map(bill => (
        <option
          className="PayBills-select-option"
          key={bill.billid}
          billid={bill.billid}
          value={bill.amount}
        >
          Amount: ${Number(JSON.stringify(bill.amount).replace(re, subst))}
        </option>
      ));
    }

    const showPayButton = this.state.amount ? 'visible' : 'hidden';

    return (
      <div>
        <div className="PayBills-title">Pay My Bill</div>
        <div>
          <form className="PayBills-form">
            <label className="PayBills__label">Please select the bill you would like to pay</label>
            <select
              className="PayBills-select"
              required
              onChange={e => this.selectBill(e.target.value)}
              defaultValue="Please select the bill you would like to pay."
            >
              <option selected disabled>
                {mappedItems && mappedItems.length > 0
                  ? 'Please select a bill to pay.'
                  : "You're all paid up, good sir!"}
              </option>
              {mappedItems}
            </select>
          </form>
          <StripeCheckout
            token={this.onToken}
            stripeKey="pk_test_iueyBCm4l0DmYEeCjwFL51iY"
            amount={this.state.amount}
          >
            <button className="PayBills-button" style={{visibility: showPayButton}}>
              Pay Now
            </button>
          </StripeCheckout>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.residentReducer,
});

export default connect(mapStateToProps, {getBills})(PayBills);
