import { useEffect, useState } from 'react';
import PurchaseDataService from '../services/PurchaseDataService';
import './Rewards.css';
import { generateRewardsData } from './RewardUtils';
import logger from '../logger';

function Rewards() {
  const [rewardsData, setRewardsData] = useState({});
  const [error, setError] = useState(null);

  const getPurchaseData = async () => {
    try {
      const purchaseDataResponse = await PurchaseDataService('mock');
      const rewardsInfo = generateRewardsData(purchaseDataResponse.result.data);
      setRewardsData(rewardsInfo);
    } catch (error) {
      logger.error(error);
      setError(error);
    }
  };

  const sortByName = (a, b) => {
    if (a.customer_name < b.customer_name) {
      return -1;
    }
    if (a.customer_name > b.customer_name) {
      return 1;
    }
    return 0;
  };

  useEffect(() => {
    getPurchaseData();
  }, []);

  const showMonthlyRewards = (monthlyRewards) => {
    if(!monthlyRewards) return <></>;
    return [...monthlyRewards]?.sort(sortByName).map((row, key) => {
      return (
        <tr key={key}>
          <td>{row.customer_id}</td>
          <td>{row.customer_name}</td>
          <td>{row.month}</td>
          <td>{row.txnAmount}</td>
          <td>{row.reward}</td>
        </tr>
      );
    })
  }

  const showTotalUserRewards = (totalUserRewards) => {
    if(!totalUserRewards) return <></>;
    return totalUserRewards?.map((row, key) => {
      return (
        <tr key={key}>
          <td>{row.customer_id}</td>
          <td>{row.customer_name}</td>
          <td>{row.txnAmount}</td>
          <td>{row.eligibleTxns}</td>
          <td>{row.reward}</td>
        </tr>
      );
    })
  }

  if (error) {
    return <p>{error.message}</p>
  }

  return (
    <>
      <div className='floatLeft'>
        <div className='table-header monthly-rewards'>User Monthly rewards data</div>
        <table>
          <thead>
            <tr>
              <th>Customer ID</th>
              <th>Name</th>
              <th>Month</th>
              <th>Purchase amount($)</th>
              <th>Reward Points</th>
            </tr>
          </thead>
          <tbody>
            {showMonthlyRewards(rewardsData.monthlyUserRewards)}
          </tbody>
        </table>
      </div>
      <div className='floatRight'>
        <div className='table-header total-rewards'>User total purchase rewards data</div>
        <table>
          <thead>
            <tr>
              <th>Customer ID</th>
              <th>Name</th>
              <th>Purchase amount($)</th>
              <th>Transactions</th>
              <th>Reward Points</th>
            </tr>
          </thead>
          <tbody>
            {showTotalUserRewards(rewardsData.totalUserRewards)}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Rewards;
