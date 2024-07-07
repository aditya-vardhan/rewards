import { render } from '@testing-library/react';
import MonthlyRewards from './MonthlyRewards';

test('loads monthly rewards component', () => {
  const rewardCriteria = { onePointReward: 50, twoPointReward: 100 };
  const { container } = render(<MonthlyRewards rewardCriteria={rewardCriteria} />);
  expect(container.querySelector('.monthly-rewards')).not.toBeNull();
});
