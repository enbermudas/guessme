import { Tag, Heading, Center } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const List = ({
  data
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
                ¡Rápido, escribe tantos como puedas!
              </Heading>
            </Center>
          )
      }
    </>
  );
};

List.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default List;
