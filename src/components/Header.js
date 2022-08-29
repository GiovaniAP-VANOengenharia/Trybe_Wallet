import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      total: 0,
    };
  }

  render() {
    const { total } = this.state;
    const { email } = this.props;
    return (
      <div>
        <Link to="/">Login</Link>
        <p data-testid="email-field">{ email }</p>
        <p data-testid="total-field">{ total }</p>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    email: state.userReducer.email,
  };
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
