import React from 'react';
import { render } from '@testing-library/react';
import ErrorMessage from './ErrorMessage';

describe('App', () => {
  it('renders message"', () => {
    const { getByText } = render(
      <ErrorMessage message="error" hasError={true} />
    );
    const message = getByText(/error/i);
    expect(message).toBeInTheDocument();
  });
});
