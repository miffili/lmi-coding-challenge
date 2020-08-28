import React from 'react';
import styled from 'styled-components';

interface ErrorMessageProps {
  hasError: boolean,
  message: string
}

const StyledErrorMessage = styled.div<{hasError?: boolean}>`
  width: 85vw;
  min-height: 28px;
  position: absolute;
  bottom: 0;
  left: 50%;
  margin-bottom: 40px;
  padding: 12px 24px;
  background: hsla(353, 40%, 25%, 0.7);
  border-radius: 5px 5px 0 0;

  color: hsla(40, 20%, 98%, 1);
  text-align: center;

  visibility: ${props => props.hasError ? 'visible' : 'hidden'};
  transform-origin: initial;
  transform: ${props => props.hasError ? 'translateY(0)' : 'translateY(100%)'} translateX(-50%);
  transition-property: transform;
  transition-duration: ${props => props.hasError ? '0.75s' : '0.35s'};
  transition-delay: ${props => props.hasError ? '0.1s' : '0s'};
  transition-timing-function: ${props => props.hasError ? 'ease' : 'ease-in'};
  z-index: 1;

  @media (min-width: 768px) {
    width: 75vw;
    text-align: left;
  };

  @media (min-width: 992px) {
    width: 45vw;
  };
`;

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, hasError }) => {
  return (
    <StyledErrorMessage hasError={hasError}>
      {message}
    </StyledErrorMessage>
  )
};

export default ErrorMessage;
