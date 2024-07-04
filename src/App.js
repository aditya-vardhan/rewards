import { Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import RewardsContainer from './containers/RewardsContainer';
import Configuration from './components/Configuration';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path='/' element={<RewardsContainer />} />
        <Route path='configure' element={<Configuration />} />
      </Switch>
    </div>
  );
}

export default App;
