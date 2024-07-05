import { useEffect, useState } from 'react';
import PurchaseDataService from '../services/PurchaseDataService';
import { getUserRewardsData, sortByName } from './RewardUtils';
import logger from '../logger';

function TransactionRewards() {
  const [rewardsData, setRewardsData] = useState([]);
  const [error, setError] = useState(null);

  const getPurchaseData = async () => {
    try {
      const purchaseDataResponse = await PurchaseDataService('mock');
      const rewardsInfo = getUserRewardsData(purchaseDataResponse.result.data);
      setRewardsData(rewardsInfo);
    } catch (error) {
      logger.error(error);
      setError(error);
    }
  };


  useEffect(() => {
    getPurchaseData();
  }, []);

  
  const showTransactions = (userTransactions) => {
    if(!userTransactions) return <></>;
    return [...userTransactions]?.sort(sortByName).map((row, key) => {
      return (
        <tr key={key}>
          <td>{row.customer_name}</td>
          <td>{row.date}</td>
          <td>{row.txnId}</td>
          <td>{row.txnAmount}</td>
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
      <div className=''>
        <div className='table-header monthly-rewards'>User individual rewards data</div>
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
            {showTransactions(rewardsData)}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TransactionRewards;