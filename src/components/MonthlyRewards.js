import { useEffect, useState } from 'react';
import PurchaseDataService from '../services/PurchaseDataService';
import { getMonthlyRewardsData, sortByName } from './RewardUtils';
import logger from '../logger';

function MonthlyRewards({ rewardCriteria }) {
  const { onePointReward, twoPointReward } = rewardCriteria;
  const [rewardsData, setRewardsData] = useState([]);
  const [error, setError] = useState(null);

  const getPurchaseData = async () => {
    try {
      const purchaseDataResponse = await PurchaseDataService('mock');
      const rewardsInfo = getMonthlyRewardsData(purchaseDataResponse.result.data, onePointReward, twoPointReward);
      setRewardsData(rewardsInfo);
    } catch (error) {
      logger.error(error);
      setError(error);
    }
  };

  useEffect(() => {
    getPurchaseData();
  }, []);

  const showMonthlyRewards = (monthlyRewards) => {
    if (!monthlyRewards) return <></>;
    return [...monthlyRewards]?.sort(sortByName).map((row, key) => {
      return (
        <tr key={key}>
          <td>{row.customer_id}</td>
          <td>{row.customer_name}</td>
          <td>{row.month}</td>
          <td>{row.txnAmount}</td>
          <td>{Math.round(row.reward)}</td>
        </tr>
      );
    });
  };

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <div className='container'>
      <h3 className='table-header monthly-rewards'>User Monthly rewards data</h3>
      <span className='note'>
        (Note: One point reward: {'>'}
        {onePointReward}$ purchase, Two point reward: {'>'}
        {twoPointReward}$ purchase)
      </span>
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
        <tbody>{showMonthlyRewards(rewardsData)}</tbody>
      </table>
    </div>
  );
}

export default MonthlyRewards;
