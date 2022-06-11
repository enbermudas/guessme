import { useState, useEffect } from 'react';
import { PinInput, PinInputField, HStack } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const Keyboard = ({
  keyLength,
  guessElement,
  gameOver,
  started,
}) => {
  const [pinValue, setPintValue]  = useState('');
  const [rerender, setRerender] = useState(false);
  const [typedOnce, setTypedOnce] = useState(false);

  const handleChange = (value) => {
    if (!typedOnce) setTypedOnce(true);

    setPintValue(value);
    const mustBeCleaned = guessElement(value);
    if (mustBeCleaned) {
      setPintValue('');
      setRerender(true);
    }
  };

  useEffect(() => {
    if (rerender) setRerender(false);
  }, [rerender]);

  return (
    <HStack>
      {
        !rerender && (
          <PinInput
            autoFocus
            type="alphanumeric"
            size="lg"
            value={pinValue}
            onChange={handleChange}
            isDisabled={!started || gameOver}
          >
            {
              new Array(keyLength).fill(0).map((_, idx) => {
                return (
                  <PinInputField key={idx} />
                )
              })
            }
          </PinInput>
        )
      }
    </HStack>
  );
}

Keyboard.propTypes = {
  keyLength: PropTypes.number.isRequired,
  guessElement: PropTypes.func.isRequired,
  gameOver: PropTypes.bool.isRequired,
  started: PropTypes.bool.isRequired,
}

export default Keyboard;
