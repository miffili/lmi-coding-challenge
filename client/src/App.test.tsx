import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders headline "ToDos"', () => {
    const { getByText } = render(<App />);
    const headline = getByText(/ToDos/i);
    expect(headline).toBeInTheDocument();
  });
});
