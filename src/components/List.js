import { Tag, Heading, Center } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { messages } from '../data';

const List = ({
  data,
  category
}) => {
  return (
    <>
      {
        data.length
          ? (
            data.map((word, idx) => {
              return (
                <Tag key={idx} style={{ margin: "0 5px 5px 0" }}>{word}</Tag>
              );
            })
          )
          : (
            <Center>
              <Heading size='md'>
                {messages[category].description}
              </Heading>
            </Center>
          )
      }
    </>
  );
};

List.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
  category: PropTypes.string.isRequired,
}

export default List;
