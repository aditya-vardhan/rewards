import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Configuration from './components/Configuration';
import TransactionRewards from './components/TransactionRewards';
import MonthlyRewards from './components/MonthlyRewards';
import TotalRewards from './components/TotalRewards';
import './App.css'

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<TransactionRewards />} />
        <Route path='/monthly' element={<MonthlyRewards />} />
        <Route path='/total' element={<TotalRewards />} />
        <Route path='/configure' element={<Configuration />} />
      </Routes>
    </div>
  );
}

export default App;
