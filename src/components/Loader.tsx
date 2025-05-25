import React from 'react';
import styled from 'styled-components';

interface loaderProps {
  word: string
}
const Loader = ({ word }: loaderProps) => {
  return (
    <StyledWrapper className='flex justify-center items-center gap-3'>
      <div className="loader">
        <span className="bar" />
        <span className="bar" />
        <span className="bar" />
      </div>
      <span>{ word }</span>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .loader {
    display: flex;
    align-items: center;
  }

  .bar {
    display: inline-block;
    width: 6px;
    height: 10px;
    background-color: rgba(255, 255, 255, .5);
    border-radius: 10px;
    animation: scale-up4 1s linear infinite;
  }

  .bar:nth-child(2) {
    height: 20px;
    margin: 0 5px;
    animation-delay: .25s;
  }

  .bar:nth-child(3) {
    animation-delay: .5s;
  }

  @keyframes scale-up4 {
    20% {
      background-color: #ffff;
      transform: scaleY(1.5);
    }

    40% {
      transform: scaleY(1);
    }
  }`;

export default Loader;
