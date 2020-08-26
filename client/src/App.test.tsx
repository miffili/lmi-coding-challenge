import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders headline "TODOs"', () => {
  const { getByText } = render(<App />);
  const headline = getByText(/TODOs/i);
  expect(headline).toBeInTheDocument();
});
