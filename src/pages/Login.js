import PropTypes from 'prop-types';
import React from 'react';
// import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { addUser } from '../redux/actions';
import '../styles/App.css';
import '../styles/Login.css';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      senha: '',
      isDisabled: true,
      className: 'loginButton disabled',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    const SEIS = 6;
    this.setState({ [name]: value }, () => {
      const { email, senha } = this.state;
      if (email.includes('@') && email.includes('.com') && senha.length >= SEIS) {
        this.setState({ isDisabled: false, className: 'loginButton' });
      } else {
        this.setState({ isDisabled: true, className: 'loginButton disabled' });
      }
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { email } = this.state;
    const { dispatch, history } = this.props;
    dispatch(addUser({ email }));
    history.push('/carteira');
  };

  render() {
    const { email, senha, isDisabled, className } = this.state;
    return (
      <form
        className="login"
        onSubmit={ this.handleSubmit }
      >
        <div
          className="loginForm"
        >
          <h1>TRYBEWALLET</h1>
          <label htmlFor="email" className="loginLabel">
            Login
            <input
              id="email"
              type="text"
              className="loginInputs"
              placeholder="Email"
              name="email"
              value={ email }
              data-testid="email-input"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="senha" className="loginLabel">
            Senha
            <input
              id="senha"
              type="password"
              className="loginInputs"
              name="senha"
              placeholder="Senha"
              value={ senha }
              data-testid="password-input"
              onChange={ this.handleChange }
            />
          </label>
          <br />
          <button
            className={ className }
            type="submit"
            disabled={ isDisabled }
          >
            ENTRAR
          </button>
        </div>
      </form>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default connect()(Login);
