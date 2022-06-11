import PropTypes from 'prop-types';
import { Button, Stack, Heading, Center } from '@chakra-ui/react';

const translatedKeys = {
  pokemon: "Pokémon",
  naruto: "Naruto"
}

const Topics = ({
  data,
  startGame
}) => {
  return (
    <>
      <Center style={{ margin: "25px" }}>
        <Heading size="md">Elige un tema para empezar a jugar.</Heading>
      </Center>

      <Stack direction="row" spacing={4} align='center'>
        {
          Object.keys(data).map((key) => {
            return (
              <Button key={key} onClick={() => startGame(key)}>{translatedKeys[key]}</Button>
            )
          })
        }
      </Stack>
    </>
  );
};

Topics.propTypes = {
  data: PropTypes.shape({
    countries: PropTypes.arrayOf(PropTypes.string),
    pokemon: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  startGame: PropTypes.func.isRequired
}

export default Topics;
