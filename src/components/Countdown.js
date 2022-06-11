import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const Countdown = ({
  totalPercentage,
  timeLeft,
}) => {
  return (
    <CircularProgress value={totalPercentage} size="120px">
      <CircularProgressLabel>{timeLeft / 1000}</CircularProgressLabel>
    </CircularProgress>
  );
};

Countdown.propTypes = {
  totalPercentage: PropTypes.number.isRequired,
  timeLeft: PropTypes.number.isRequired,
}

export default Countdown;
