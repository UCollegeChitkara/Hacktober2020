import React from 'react';
import './App.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      // <ThemeContext.Provider value={{}}>
        <div className="App">
          Hello World!
        </div>
      // </ThemeContext.Provider>
    );
  }
}

export default App;
