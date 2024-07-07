import { render } from '@testing-library/react';
import TransactionRewards from './TransactionRewards';

test('loads transaction rewards component', () => {
  const rewardCriteria = { onePointReward: 50, twoPointReward: 100 };
  const { container } = render(<TransactionRewards rewardCriteria={rewardCriteria} />);
  expect(container.querySelector('.transaction-rewards')).not.toBeNull();
});
