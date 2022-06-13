import PropTypes from 'prop-types';
import { Heading, Center, Tag} from '@chakra-ui/react';
import { messages } from '../data';

const Topics = ({
  data,
  startGame
}) => {
  return (
    <>
      <Center my={25}>
        <Heading size="md">Elige un tema para empezar a jugar.</Heading>
      </Center>

      {
        Object.keys(data).map((key) => {
          return (
            <Tag mt={5} mr={5} style={{ cursor: "pointer" }} key={key} onClick={() => startGame(key)}>{messages[key].title}</Tag>
          )
        })
      }
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
