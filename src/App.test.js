import { render, screen } from '@testing-library/react';
import App from './App';

test('renders demo app', () => {
  render(<App />);
  const linkElement = screen.getByText(/Loading/i);
  expect(linkElement).toBeInTheDocument();
});
