import { useRef } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';

const Endgame = ({
  isOpen,
  onClose,
  guesses,
  total,
  restartGame
}) => {
  const cancelRef = useRef();

  const handleRestart = () => {
    onClose();
    restartGame();
  }

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              ¡Fin del juego!
            </AlertDialogHeader>

            <AlertDialogBody>
              Adiviniste {guesses} de {total}.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                colorScheme="blue"
                ref={cancelRef}
                onClick={handleRestart}
              >
                Jugar otra vez
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
};

Endgame.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  guesses: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  restartGame: PropTypes.func.isRequired,
}

export default Endgame;
