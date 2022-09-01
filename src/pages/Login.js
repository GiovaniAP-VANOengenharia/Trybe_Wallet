import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addUser } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      senha: '',
      isDisabled: true,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    const SEIS = 6;
    this.setState({ [name]: value }, () => {
      const { email, senha } = this.state;
      if (email.includes('@') && email.includes('.com') && senha.length >= SEIS) {
        this.setState({ isDisabled: false });
      } else {
        this.setState({ isDisabled: true });
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
    const { email, senha, isDisabled } = this.state;
    return (
      <form
        onSubmit={ this.handleSubmit }
      >
        <h2>Login</h2>
        <input
          type="email"
          name="email"
          value={ email }
          data-testid="email-input"
          onChange={ this.handleChange }
        />
        <h2>Senha</h2>
        <input
          type="password"
          name="senha"
          value={ senha }
          data-testid="password-input"
          onChange={ this.handleChange }
        />
        <button
          type="submit"
          disabled={ isDisabled }
        >
          Entrar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default connect()(Login);
