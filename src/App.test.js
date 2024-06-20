import { render } from '@testing-library/react';
import App from './App';

test('loads rewards container', () => {
  const { container } = render(<App />);
  expect(container.querySelector('.App')).not.toBeNull();
});
