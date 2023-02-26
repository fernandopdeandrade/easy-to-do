import styled from 'styled-components';

export const LoadingContainer = styled.div` 
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  margin: 0 auto;
  width: 100%;
  max-width: 600px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  margin-top: 20px;
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 20px; 
  @import url('https://fonts.googleapis.com/css2?family=Moon+Dance&display=swap');
  font-family: 'Moon Dance', cursiva;
`;
