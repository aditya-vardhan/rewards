import { render, screen } from '@testing-library/react';
import Rewards from './Rewards';

test('loads total rewards container', () => {
    const { container } = render(<Rewards />);
    expect(container.querySelector('.total-rewards')).not.toBeNull();
});


test('loads total rewards container', () => {
    const { container } = render(<Rewards />);
    expect(container.querySelector('.monthly-rewards')).not.toBeNull();
});