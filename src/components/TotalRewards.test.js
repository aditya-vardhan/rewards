import { render } from '@testing-library/react';
import TotalRewards from './TotalRewards';

test('loads total rewards component', () => {
  const rewardCriteria = {onePointReward:50, twoPointReward:100};
  const { container } = render(<TotalRewards rewardCriteria={rewardCriteria} />);
  expect(container.querySelector('.total-rewards')).not.toBeNull();
});
