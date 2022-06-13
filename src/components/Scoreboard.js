import { useState, useEffect } from 'react';
import {
  List,
  ListItem,
  ListIcon,
  CircularProgress,
  Heading,
  Center,
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import PropTypes from 'prop-types';

import "./Scoreboard.css";

const scoreColors = ['#FFC107', '#9E9E9E', '#FF5722'];

const Scoreboard = ({
  scores,
  category
}) => {
  const [filteredScores, setFiteredScores] = useState([]);

  useEffect(() => {
    if (scores.length) {
      const newFilteredScores = scores
        .filter((doc) => doc.category === category)
        .sort((a, b) => b.score - a.score)
        .slice(0, 3);

      console.log(newFilteredScores);
      setFiteredScores(newFilteredScores);
    }
  }, [scores, category]);

  return (
    <>
    <Center my={15}>
      <Heading size='md'>Estos son los mejores jugadores</Heading>
    </Center>

    <List spacing={3} id="scoreboard-list">
      {
        !!scores.length
          ? (
            filteredScores.map((doc, idx) => {
              return (
                <ListItem key={idx}>
                  <ListIcon as={StarIcon} color={scoreColors[idx]} />
                  <strong>{doc.name}</strong>: {doc.score} aciertos
                </ListItem>
              )
            })
          )
          : (
            <Center>
              <CircularProgress isIndeterminate color='green.300' />
            </Center>
          )
      }
    </List>
    </>
  )
};

Scoreboard.propTypes = {
  scores: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    score: PropTypes.number,
  })).isRequired,
  category: PropTypes.string.isRequired,
}

export default Scoreboard;
