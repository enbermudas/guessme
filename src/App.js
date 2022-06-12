import React, { useState, useEffect } from 'react';
import { ChakraProvider, Container, Divider, Center, useDisclosure, Text, Heading } from '@chakra-ui/react';
import useCountDown from 'react-countdown-hook';
import Countdown from './components/Countdown';
import Endgame from './components/Endgame';
import Footer from './components/Footer';
import Keyboard from './components/Keyboard';
import List from './components/List';
import Topics from './components/Topics';
import data from './data';
import theme from './theme';

import { db } from './firebase/firebase';
import { uid } from 'uid';

import { getDocs, collection, setDoc, doc } from 'firebase/firestore';

const App = () => {
  const [category, setCategory] = useState('');
  const [topic, setTopic] = useState([]);
  const [scores, setScores] = useState([]);
  const [total, setTotal] = useState(0);
  const [guesses, setGuesses] = useState([]);
  const [started, setStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [username, setUsername] = useState('');
  const [delayedStarted, setDelayedStarted] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const counterInitialTime = 60 * 1000;
  const [timeLeft, { start, pause, reset }] = useCountDown(counterInitialTime, 1000);
  const totalPercentage = (timeLeft / counterInitialTime) * 100;

  const guessElement = (word) => {
    const idx = topic.findIndex((element) => element.replace(/\s/g, '').toLowerCase() === word.trim().toLowerCase());

    if (idx >= 0) {
      const newGuesses = [...guesses, topic[idx]];
      setGuesses(newGuesses);

      const newTopic = topic.filter((_, i) => i !== idx);
      setTopic(newTopic);

      return true;
    }

    return false;
  };

  const restartGame = () => {
    addScoreToDB(username, category, guesses.length);
    setScores([]);
    setUsername('');
    setCategory('');
    setTopic([]);
    setTotal(0);
    setGuesses([]);
    setStarted(false);
    setDelayedStarted(false);
    setGameOver(false);
    reset();
  };

  const startGame = (key) => {
    setCategory(key);
    setTopic(data[key]);
    setTotal(data[key].length);
    setStarted(true);
  };

  // Create element
  const addScoreToDB = async (name, category, score) => {
    let id = uid(20);

    const newScore = {
      name,
      category,
      score
    }

    await setDoc(doc(db, 'scores', id), newScore);
  }

  // Start counter
  useEffect(() => {
    if (started) {
      start();
      setTimeout(() => {
        setDelayedStarted(true);
      }, 1000);
    }
  }, [started, start]);

  // Pause counter
  useEffect(() => {
    if (gameOver) pause();
  }, [gameOver, pause]);

  // Tópicos finalizados
  useEffect(() => {
    if (topic.length === 0 && started) {
      setGameOver(true);
      onOpen();
    }
  }, [topic, started, onClose, onOpen]);

  // Tiempo finalizado
  useEffect(() => {
    if (timeLeft === 0 && started && delayedStarted) {
      setGameOver(true);
      onOpen();
    }
  }, [timeLeft, started, onOpen, delayedStarted]);

  useEffect(() => {
    const getScores = async () => {
      const scoresRef = collection(db, 'scores');
      const scoresSnapshot = await getDocs(scoresRef);
      const scoresList = scoresSnapshot.docs.map((doc) => doc.data());
      setScores(scoresList);
    }

    if (!scores.length) getScores();
  }, [scores, setScores]);

  return (
    <ChakraProvider theme={theme}>
      <Endgame
        isOpen={isOpen}
        onClose={onClose}
        guesses={guesses.length}
        total={total}
        restartGame={restartGame}
        scores={scores}
        category={category}
        username={username}
        setUsername={setUsername}
      />

      <Container maxW="container.sm" style={{ marginTop: "50px" }}>
        {
          started
            ? (
              <>
                <Center>
                  <Countdown
                    totalPercentage={totalPercentage}
                    timeLeft={timeLeft}
                    started={started}
                    gameOver={gameOver}
                    start={start}
                    pause={pause}
                  />
                </Center>

                <Divider style={{ margin: "15px 0" }} />

                <List data={guesses} category={category} />

                <Divider style={{ margin: "15px 0" }} />

                <Keyboard
                  keyLength={12}
                  guessElement={guessElement}
                  gameOver={gameOver}
                  started={started}
                />
              </>
            )
            : (
              <Topics
                data={data}
                startGame={startGame}
              />
            )
        }

        <Divider style={{ margin: "15px 0" }} />

        <Center style={{ margin: "25px" }}>
          <Heading size="md">¿Cómo jugar?</Heading>
        </Center>

        <Text color="gray">
          Una vez seleccionada una categoría, tendrás 1 minuto para escribir tantos nombres como puedas.
          Sumarás 1 punto por cada nombre correcto. Cuando hayas acertado algún nombre, éste se agregará a la lista y podrás volver a escribir.
          No es necesario utilizar acentos o espacios en blanco.
        </Text>

        <Footer />
      </Container>
    </ChakraProvider>
  );
}

export default App;
