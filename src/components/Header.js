import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    const { email, total } = this.props;
    return (
      <div>
        <Link to="/">Login</Link>
        <p data-testid="email-field">{ email }</p>
        <p data-testid="total-field">{ total.toFixed(2) }</p>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    email: state.user.email,
    total: state.wallet.total,
  };
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
