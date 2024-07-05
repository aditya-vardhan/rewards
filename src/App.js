import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Configuration from './components/Configuration';
import TransactionRewards from './components/TransactionRewards';
import MonthlyRewards from './components/MonthlyRewards';
import TotalRewards from './components/TotalRewards';
import './App.css'
import { createContext, useState } from 'react';

export const CriteriaContext = createContext();

function App() {
  const [rewardCriteria, setRewardCriteria] = useState({
    onePointThreshold: 50,
    twoPointThreshold: 100
  })
  return (
    <div className="App">
      <Header />
      <CriteriaContext.Provider  value={{ ...rewardCriteria, setRewardCriteria }}>
      <Routes>
        <Route path='/' element={<TransactionRewards />} />
        <Route path='/monthly' element={<MonthlyRewards />} />
        <Route path='/total' element={<TotalRewards />} />
        <Route path='/configure' element={<Configuration />} />
      </Routes>
      </CriteriaContext.Provider>
      </div>
  );
}

export default App;
