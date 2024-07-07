import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import TransactionRewards from './components/TransactionRewards';
import MonthlyRewards from './components/MonthlyRewards';
import TotalRewards from './components/TotalRewards';
import './App.css';
import Configuration from './components/Configuration';
import { useState } from 'react';

function App() {
  const [rewardCriteria, setRewardCriteria] = useState({
    onePointReward: 50,
    twoPointReward: 100
  })
  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path='/' element={<TransactionRewards rewardCriteria={rewardCriteria} />}/>
        <Route path='/monthly' element={<MonthlyRewards rewardCriteria={rewardCriteria} />} />
        <Route path='/total' element={<TotalRewards rewardCriteria={rewardCriteria} />} />
        <Route path='/configuration' element={<Configuration 
          rewardCriteria={rewardCriteria}
          setRewardCriteria={setRewardCriteria} />} />
      </Routes>
    </div>
  );
}

export default App;
