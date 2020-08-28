import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('App', () => {
  let container;

  beforeEach(() => {
    container = render(<App />);
  })

  it('renders headline "ToDos"', () => {
    const headline = container.getByText(/ToDos/i);
    expect(headline).toBeInTheDocument();
  });

  it('includes live feedback for screen readers', () => {
    const liveFeedback = container.getByRole('status');
    expect(liveFeedback).toBeInTheDocument();
  });
});
