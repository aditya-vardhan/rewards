import { useEffect, useState } from 'react';
import PurchaseDataService from '../services/PurchaseDataService';
import { getTotalRewardsData, sortByName } from './RewardUtils';
import logger from '../logger';

function TotalRewards() {
  const [rewardsData, setRewardsData] = useState([]);
  const [error, setError] = useState(null);

  const getPurchaseData = async () => {
    try {
      const purchaseDataResponse = await PurchaseDataService('mock');
      const rewardsInfo = getTotalRewardsData(purchaseDataResponse.result.data);
      setRewardsData(rewardsInfo);
    } catch (error) {
      logger.error(error);
      setError(error);
    }
  };

  useEffect(() => {
    getPurchaseData();
  }, []);

  const showTotalUserRewards = (totalUserRewards) => {
    if (!totalUserRewards) return <></>;
    return [...totalUserRewards].sort(sortByName).map((row, key) => {
      return (
        <tr key={key}>
          <td>{row.customer_id}</td>
          <td>{row.customer_name}</td>
          <td>{row.txnAmount}</td>
          <td>{row.reward}</td>
        </tr>
      );
    });
  };

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <div className='container'>
      <h3 className='table-header total-rewards'>User total purchase rewards data</h3>
      <table>
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>Name</th>
            <th>Purchase amount($)</th>
            <th>Reward Points</th>
          </tr>
        </thead>
        <tbody>{showTotalUserRewards(rewardsData)}</tbody>
      </table>
    </div>
  );
}

export default TotalRewards;
