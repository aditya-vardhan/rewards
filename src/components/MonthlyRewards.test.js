import { render } from '@testing-library/react';
import MonthlyRewards from './MonthlyRewards';

test('loads total rewards container', () => {
  const { container } = render(<MonthlyRewards />);
  expect(container.querySelector('.monthly-rewards')).not.toBeNull();
});
