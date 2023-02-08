import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../styles/App.css';
import '../styles/Header.css';

class Header extends Component {
  render() {
    const { email, total } = this.props;
    return (
      <div className="header">
        <div className="userDiv">
          <p data-testid="email-field" className="user">{ email }</p>
          <Link to="/">
            <button
              className="exitButton"
              type="button"
            >
              SAIR
            </button>
          </Link>
        </div>
        <div className="currencyDiv">
          <p id="qtd" data-testid="total-field">{ Number(total).toFixed(2) }</p>
          <p id="currency" data-testid="header-currency-field">BRL</p>
        </div>
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
