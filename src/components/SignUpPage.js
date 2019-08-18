import React from 'react';
import axios from 'axios';

class SignUpPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    }
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnSubmit (e) {
    e.preventDefault();
    console.log(e.target);
    axios.post('/signup', this.state).then(response => {
      console.log('response from signup: ', response);
    })
  }

  handleOnChange (e) {
    let state = {};
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  render() {

    return (
      <div>
        <form onSubmit={this.handleOnSubmit}>
          <div>
            <label >Username: </label>
            <input 
              type='text' 
              name='username' 
              value={this.state.username}
              onChange={this.handleOnChange}/>
          </div>
          <div>
            <label>Password: </label>
            <input 
              type='password' 
              name='password' 
              value={this.state.password}
              onChange={this.handleOnChange}/>
          </div>
          <div>
            <input type='submit' />
          </div>
        </form>
      </div>
    )
  }
}

export default SignUpPage;