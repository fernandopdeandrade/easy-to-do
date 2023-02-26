import { Audio } from 'react-loader-spinner';
import { LoadingContainer } from '../styles/LoadingStyledComponents';
export default function Loading() {

  return (
    <LoadingContainer>
      <Audio
        height="80"
        width="80"
        radius="9"
        color='green'
        ariaLabel='three-dots-loading'
        wrapperStyle
        wrapperClass
      />
      Carregando...
    </LoadingContainer>
  );
}
