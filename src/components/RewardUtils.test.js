import moment from 'moment';
import { getMonthlyRewardsData, getTotalRewardsData, getUserRewardsData } from './RewardUtils';

test('getTotalRewardsData: Adds reward if txn amount is more than 100', () => {
  const purchaseData = [
    {
      transaction_id: 'TXN085',
      customer_name: 'Michael Brown',
      purchased_product: 'Slippers',
      price: 120,
      purchased_date: moment().format('YYYYMMDD')
    }
  ];
  const totalRewardsData = getTotalRewardsData(purchaseData);
  // as txn amount is 120
  // amount above hundred dollars is applicable for 2 reward points, which is 2*20 = 40 points
  // amount between 50 to 100 is applicable for 1 reward point, which is 50 points
  // total reward points is 40 + 50 = 90 points
  expect(totalRewardsData[0].reward).toBe(90);
});


test('getUserRewardsData: Adds reward if txn amount is more than 100', () => {
  const purchaseData = [
    {
      transaction_id: 'TXN085',
      customer_name: 'Michael Brown',
      purchased_product: 'Slippers',
      price: 120,
      purchased_date: moment().format('YYYYMMDD')
    }
  ];
  const txnRewardsData = getUserRewardsData(purchaseData);
  // as txn amount is 120
  // amount above hundred dollars is applicable for 2 reward points, which is 2*20 = 40 points
  // amount between 50 to 100 is applicable for 1 reward point, which is 50 points
  // total reward points is 40 + 50 = 90 points
  expect(txnRewardsData[0].reward).toBe(90);
});


test('getMonthlyRewardsData: Adds reward if txn amount is more than 100', () => {
  const purchaseData = [
    {
      transaction_id: 'TXN085',
      customer_name: 'Michael Brown',
      purchased_product: 'Slippers',
      price: 120,
      purchased_date: moment().format('YYYYMMDD')
    }
  ];
  const monthlyRewardsData = getMonthlyRewardsData(purchaseData);
  // as txn amount is 120
  // amount above hundred dollars is applicable for 2 reward points, which is 2*20 = 40 points
  // amount between 50 to 100 is applicable for 1 reward point, which is 50 points
  // total reward points is 40 + 50 = 90 points
  expect(monthlyRewardsData[0].reward).toBe(90);
});

test('getUserRewardsData: Reward is not generated if txn amount not above 50', () => {
  const purchaseData = [
    {
      transaction_id: 'TXN085',
      customer_name: 'Michael Brown',
      purchased_product: 'Slippers',
      price: 50,
      purchased_date: moment().format('YYYYMMDD')
    }
  ];
  const txnRewardsData = getUserRewardsData(purchaseData);
  expect(txnRewardsData.length).toBe(0);
});
test('getMonthlyRewardsData: Reward is not generated if txn amount not above 50', () => {
  const purchaseData = [
    {
      transaction_id: 'TXN085',
      customer_name: 'Michael Brown',
      purchased_product: 'Slippers',
      price: 50,
      purchased_date: moment().format('YYYYMMDD')
    }
  ];
  const monthlyRewardsData = getMonthlyRewardsData(purchaseData);
  expect(monthlyRewardsData.length).toBe(0);
});

test('getTotalRewardsData: Reward is not generated if txn amount not above 50', () => {
  const purchaseData = [
    {
      transaction_id: 'TXN085',
      customer_name: 'Michael Brown',
      purchased_product: 'Slippers',
      price: 50,
      purchased_date: moment().format('YYYYMMDD')
    }
  ];
  const totalRewardsData = getTotalRewardsData(purchaseData);
  expect(totalRewardsData.length).toBe(0);
});

test('getUserRewardsData: One point reward is generated for each dollar between 50 and 100 transactions', () => {
  const purchaseData = [
    {
      transaction_id: 'TXN085',
      customer_name: 'Michael Brown',
      purchased_product: 'Slippers',
      price: 98,
      purchased_date: moment().format('YYYYMMDD')
    }
  ];
  const txnRewardsData = getUserRewardsData(purchaseData);
  expect(txnRewardsData[0].reward).toBe(48);
});

test('getMonthlyRewardsData: One point reward is generated for each dollar between 50 and 100 transactions', () => {
  const purchaseData = [
    {
      transaction_id: 'TXN085',
      customer_name: 'Michael Brown',
      purchased_product: 'Slippers',
      price: 98,
      purchased_date: moment().format('YYYYMMDD')
    }
  ];
  const monthlyRewardsData = getMonthlyRewardsData(purchaseData);
  expect(monthlyRewardsData[0].reward).toBe(48);
});

test('getTotalRewardsData: One point reward is generated for each dollar between 50 and 100 transactions', () => {
  const purchaseData = [
    {
      transaction_id: 'TXN085',
      customer_name: 'Michael Brown',
      purchased_product: 'Slippers',
      price: 98,
      purchased_date: moment().format('YYYYMMDD')
    }
  ];
  const totalRewardsData = getTotalRewardsData(purchaseData);
  expect(totalRewardsData[0].reward).toBe(48);
});

test('getUserRewardsData: Reward generated is 50 if txn amount is equals 100', () => {
  const purchaseData = [
    {
      transaction_id: 'TXN085',
      customer_name: 'Michael Brown',
      purchased_product: 'Slippers',
      price: 100,
      purchased_date: moment().format('YYYYMMDD')
    }
  ];
  const txnRewardsData = getUserRewardsData(purchaseData);
  expect(txnRewardsData[0].reward).toBe(50);
});

test('getMonthlyRewardsData: Reward generated is 50 if txn amount is equals 100', () => {
  const purchaseData = [
    {
      transaction_id: 'TXN085',
      customer_name: 'Michael Brown',
      purchased_product: 'Slippers',
      price: 100,
      purchased_date: moment().format('YYYYMMDD')
    }
  ];
  const monthlyRewardsData = getMonthlyRewardsData(purchaseData);
  expect(monthlyRewardsData[0].reward).toBe(50);
});

test('getTotalRewardsData: Reward generated is 50 if txn amount is equals 100', () => {
  const purchaseData = [
    {
      transaction_id: 'TXN085',
      customer_name: 'Michael Brown',
      purchased_product: 'Slippers',
      price: 100,
      purchased_date: moment().format('YYYYMMDD')
    }
  ];
  const totalRewardsData = getTotalRewardsData(purchaseData);
  expect(totalRewardsData[0].reward).toBe(50);
});

test('getMonthlyRewardsData: Seperate reward records are created for a user for txns done in different months', () => {
  const purchaseData = [
    {
      transaction_id: 'TXN085',
      customer_name: 'Michael Brown',
      purchased_product: 'Slippers',
      price: 100,
      purchased_date: moment().format('YYYYMMDD')
    },
    {
      transaction_id: 'TXN086',
      customer_name: 'Michael Brown',
      purchased_product: 'Slippers',
      price: 100,
      purchased_date: moment().subtract(1, 'months').format('YYYYMMDD')
    }
  ];
  const monthlyRewardsData = getMonthlyRewardsData(purchaseData);
  expect(monthlyRewardsData[0].reward).toBe(50);
  expect(monthlyRewardsData[1].reward).toBe(50);
});

test('getTotalRewardsData: Different month records are added', () => {
  const purchaseData = [
    {
      transaction_id: 'TXN085',
      customer_name: 'Michael Brown',
      purchased_product: 'Slippers',
      price: 100,
      purchased_date: moment().format('YYYYMMDD')
    },
    {
      transaction_id: 'TXN086',
      customer_name: 'Michael Brown',
      purchased_product: 'Slippers',
      price: 100,
      purchased_date: moment().subtract(1, 'months').format('YYYYMMDD')
    }
  ];
  const totalRewardsData = getTotalRewardsData(purchaseData);
  expect(totalRewardsData[0].reward).toBe(100);
  expect(totalRewardsData.length).toBe(1);
});

test('getUserRewardsData: Seperate reward records are created for every user', () => {
  const purchaseData = [
    {
      transaction_id: 'TXN085',
      customer_name: 'Michael Brown',
      purchased_product: 'Slippers',
      price: 100,
      purchased_date: moment().format('YYYYMMDD')
    },
    {
      transaction_id: 'TXN086',
      customer_name: 'Jade Smith',
      purchased_product: 'Slippers',
      price: 100,
      purchased_date: moment().format('YYYYMMDD')
    },
    {
      transaction_id: 'TXN087',
      customer_name: 'John de Brayn',
      purchased_product: 'Slippers',
      price: 100,
      purchased_date: moment().format('YYYYMMDD')
    }
  ];
  const txnRewardsData = getUserRewardsData(purchaseData);
  expect(txnRewardsData.length).toBe(3);
  expect(txnRewardsData[0].reward).toBe(50);
  expect(txnRewardsData[1].reward).toBe(50);
  expect(txnRewardsData[2].reward).toBe(50);
});

test('getMonthlyRewardsData: Seperate reward records are created for every user', () => {
  const purchaseData = [
    {
      transaction_id: 'TXN085',
      customer_name: 'Michael Brown',
      purchased_product: 'Slippers',
      price: 100,
      purchased_date: moment().format('YYYYMMDD')
    },
    {
      transaction_id: 'TXN086',
      customer_name: 'Jade Smith',
      purchased_product: 'Slippers',
      price: 100,
      purchased_date: moment().format('YYYYMMDD')
    },
    {
      transaction_id: 'TXN087',
      customer_name: 'John de Brayn',
      purchased_product: 'Slippers',
      price: 100,
      purchased_date: moment().format('YYYYMMDD')
    }
  ];
  const monthlyRewardsData = getMonthlyRewardsData(purchaseData);
  expect(monthlyRewardsData.length).toBe(3);
  expect(monthlyRewardsData[0].reward).toBe(50);
  expect(monthlyRewardsData[1].reward).toBe(50);
  expect(monthlyRewardsData[2].reward).toBe(50);
});

test('getTotalRewardsData: Seperate reward records are created for every user', () => {
  const purchaseData = [
    {
      transaction_id: 'TXN085',
      customer_name: 'Michael Brown',
      purchased_product: 'Slippers',
      price: 100,
      purchased_date: moment().format('YYYYMMDD')
    },
    {
      transaction_id: 'TXN086',
      customer_name: 'Jade Smith',
      purchased_product: 'Slippers',
      price: 100,
      purchased_date: moment().format('YYYYMMDD')
    },
    {
      transaction_id: 'TXN087',
      customer_name: 'John de Brayn',
      purchased_product: 'Slippers',
      price: 100,
      purchased_date: moment().format('YYYYMMDD')
    }
  ];
  const totalRewardsData = getTotalRewardsData(purchaseData);
  expect(totalRewardsData.length).toBe(3);
  expect(totalRewardsData[0].reward).toBe(50);
  expect(totalRewardsData[1].reward).toBe(50);
  expect(totalRewardsData[2].reward).toBe(50);
});
