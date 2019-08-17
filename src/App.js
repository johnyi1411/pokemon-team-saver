import React from 'react';
import './App.css';
import Search from './components/Search'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: ''
    }
    this.searchOnChange = this.searchOnChange.bind(this);
  }

  searchOnChange(value) {
    this.setState({ searchValue : value });
  }

  render () {
    return (
      <div className="App">
        <Search searchOnChange={this.searchOnChange}/>
      </div>
    );
  }
};

export default App;
