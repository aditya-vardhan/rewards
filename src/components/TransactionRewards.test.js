import { render } from '@testing-library/react';
import TransactionRewards from './TransactionRewards';

test('loads total rewards container', () => {
  const { container } = render(<TransactionRewards />);
  expect(container.querySelector('.total-rewards')).not.toBeNull();
});
