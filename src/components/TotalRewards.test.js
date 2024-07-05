import { render } from '@testing-library/react';
import TotalRewards from './TotalRewards';

test('loads total rewards container', () => {
  const { container } = render(<TotalRewards />);
  expect(container.querySelector('.total-rewards')).not.toBeNull();
});
