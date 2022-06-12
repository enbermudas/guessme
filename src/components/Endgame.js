import { useRef } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  Divider,
  Input,
  Text,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import Scoreboard from './Scoreboard';

const Endgame = ({
  isOpen,
  onClose,
  guesses,
  total,
  restartGame,
  scores,
  category,
  username,
  setUsername,
}) => {
  const cancelRef = useRef();

  const handleRestart = () => {
    onClose();
    restartGame();
  }

  const handleUsernameChange = (e) => {
    setUsername(e.target.value.trim().substring(0, 20));
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

              <Divider style={{ margin: "15px 0" }} />

              <Scoreboard scores={scores} category={category} />

              <Divider style={{ margin: "15px 0" }} />

              <Input
                placeholder="Escribe tu nombre acá para añadirte a la lista."
                value={username}
                onChange={handleUsernameChange}
              />

              <Text
                fontSize='xs'
                color="gray"
                style={{ marginTop: "5px" }}
              >
                Solo aparecerás si superas algún récord.
              </Text>

            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                colorScheme="blue"
                ref={cancelRef}
                onClick={handleRestart}
                disabled={!username}
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
  scores: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    score: PropTypes.number,
  })).isRequired,
  category: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
}

export default Endgame;
