import moment from 'moment';
import logger from '../logger';

export const getUserRewardsData = (purchaseData) => {
  const rewardsData = purchaseData.reduce((acm, txn) => {
    // txn should be over 50$ to receive reward
    if (txn.price <= 50) {
      return acm;
    }
    // if txn is above 100$ user receives 2 reward points above 50  + 1 reward point between 50 to 100$
    const reward = txn.price > 100 ? (txn.price - 100) * 2 + 50 : txn.price - 50;

    const validTransaction = {
      customer_id: txn.customer_id,
      customer_name: txn.customer_name,
      date: moment(txn.purchased_date).format('MMM Do'),
      txnAmount: txn.price,
      reward: reward,
      txnId: txn.transaction_id
    };
    acm.push(validTransaction);

    return acm;
  }, []);
  logger.log('Generated rewards data: ', rewardsData);
  return rewardsData;
};

export const getMonthlyRewardsData = (purchaseData) => {
  const rewardsData = purchaseData.reduce((acm, txn) => {
    // txn should be over 50$ to receive reward
    if (txn.price <= 50) {
      return acm;
    }
    // if txn is above 100$ user receives 2 reward points above 50  + 1 reward point between 50 to 100$
    const reward = txn.price > 100 ? (txn.price - 100) * 2 + 50 : txn.price - 50;

    const purchaseMonth = moment(txn.purchased_date).format('MMMM');

    const monthlyRewardIndex = acm.findIndex((data) => data.customer_name === txn.customer_name && data.month === purchaseMonth);

    // if reward details already exist for a given month
    if (monthlyRewardIndex !== -1) {
      acm[monthlyRewardIndex].reward += reward;
      acm[monthlyRewardIndex].txnAmount += txn.price;
      acm[monthlyRewardIndex].eligibleTxns += 1;
    } else {
      const userMonthlyReward = {
        customer_id: txn.customer_id,
        customer_name: txn.customer_name,
        month: purchaseMonth,
        txnAmount: txn.price,
        reward: reward,
        eligibleTxns: 1
      };
      acm.push(userMonthlyReward);
    }

    return acm;
  }, []);
  logger.log('Generated rewards data: ', rewardsData);
  return rewardsData;
};

export const getTotalRewardsData = (purchaseData) => {
  const rewardsData = purchaseData.reduce((acm, txn) => {
    // txn should be over 50$ to receive reward
    if (txn.price <= 50) {
      return acm;
    }
    // if txn is above 100$ user receives 2 reward points above 50  + 1 reward point between 50 to 100$
    const reward = txn.price > 100 ? (txn.price - 100) * 2 + 50 : txn.price - 50;

    const totalRewardsIndex = acm.findIndex((data) => data.customer_name === txn.customer_name);

    // if reward details already exist for current user
    if (totalRewardsIndex !== -1) {
      acm[totalRewardsIndex].reward += reward;
      acm[totalRewardsIndex].txnAmount += txn.price;
      acm[totalRewardsIndex].eligibleTxns += 1;
    } else {
      const userTotalReward = {
        customer_id: txn.customer_id,
        customer_name: txn.customer_name,
        txnAmount: txn.price,
        reward: reward,
        eligibleTxns: 1
      };
      acm.push(userTotalReward);
    }

    return acm;
  }, []);
  logger.log('Generated rewards data: ', rewardsData);
  return rewardsData;
};

export const sortByName = (a, b) => {
  if (a.customer_name < b.customer_name) {
    return -1;
  }
  if (a.customer_name > b.customer_name) {
    return 1;
  }
  return 0;
};
