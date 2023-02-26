import PropTypes from 'prop-types';
import arrowLeft from '../images/arrowLeft.png';
import '../styles/ReturnButton.css';

const { Link } = require('react-router-dom');

function ReturnButton({ location }) {
  return (
    <Link to={ location }>
      <img src={ arrowLeft } alt="return" height="20px" className="return_button" />
    </Link>
  );
}

ReturnButton.propTypes = {
  location: PropTypes.shape({ location: PropTypes.string }).isRequired,
};

export default ReturnButton;
