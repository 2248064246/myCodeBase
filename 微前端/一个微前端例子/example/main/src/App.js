/*
 * @Author: ys4225/黄迎李
 * @Date: 2021-09-07 14:56:33
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-09-07 16:01:38
 * @Description:
 */
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p> */}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Router>
          <Link to="/">Home</Link>
          <br></br>
          <Link to="/vue">vue</Link>
        </Router>
      </header>
      <div id="micro-container" />
    </div>
  );
}

export default App;
