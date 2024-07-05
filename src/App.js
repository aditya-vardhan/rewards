import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import RewardsContainer from './containers/RewardsContainer';
import Configuration from './components/Configuration';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<RewardsContainer />} />
        <Route path='/configure' element={<Configuration />} />
      </Routes>
    </div>
  );
}

export default App;
