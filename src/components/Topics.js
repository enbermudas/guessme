import PropTypes from 'prop-types';
import { Heading, Center, Tag} from '@chakra-ui/react';
import { messages } from '../data';

const Topics = ({
  data,
  startGame
}) => {
  return (
    <>
      <Center style={{ margin: "25px" }}>
        <Heading size="md">Elige un tema para empezar a jugar.</Heading>
      </Center>

      {
        Object.keys(data).map((key) => {
          return (
            <Tag style={{ margin: "0 5px 5px 0", cursor: "pointer" }} key={key} onClick={() => startGame(key)}>{messages[key].title}</Tag>
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
