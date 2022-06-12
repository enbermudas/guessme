import React, { useState, useEffect } from 'react';
import { ChakraProvider, Container, Divider, Center, useDisclosure } from '@chakra-ui/react';
import useCountDown from 'react-countdown-hook';
import Countdown from './components/Countdown';
import Endgame from './components/Endgame';
import Keyboard from './components/Keyboard';
import List from './components/List';
import Topics from './components/Topics';
import data from './data';
import theme from './theme';

import { db } from './firebase/firebase';
import { uid } from 'uid';

import { getDocs, collection, setDoc, doc, query, where } from 'firebase/firestore';

const App = () => {
  const [category, setCategory] = useState('');
  const [topic, setTopic] = useState([]);
  const [total, setTotal] = useState(0);
  const [guesses, setGuesses] = useState([]);
  const [started, setStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
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
  //MEtodo para obtener los datos de la base de datos y filtrarlos por categoria
  const getByCategory = async (category) => {
    const scoresRef = collection(db, 'puntuacion','scores','personas');
    const scoresSnapshot = await getDocs(scoresRef);
    const scoresList = scoresSnapshot.docs.map((doc) => doc.data()).filter(doc => doc.category === category);
    return scoresList;
  }
  //metodo para guardar los datos en la base de datos
  const create = async (name, category, score) => {
    let id = uid(20);
    const newScore = {
      name,
      category,
      score
    }
    //se esturctura como la DB (referencia) - nombre de la bd como tal (o coleccion) - documento - otra coleccion que va dentro del doccumento y ya luego separo a las personas por id unicos para poder repetir data...
    // puntuacion(db) -> scores (coleccion) -> personas (doc) -> personas (collection dentro del doc) -> id unicos para poder
    //De todas maneras la funcion si no existe las estructura de la data la crea el mismo por ende con solo guardar se guarda todo :)
    await setDoc(doc(db, 'puntuacion','scores','personas', id), newScore);
  }

  // Start counter
  useEffect(() => {
    //create recibe los parametros pero se puede mejorar
    // create('macoix', 'pokemon', 28);
    getByCategory('pokemon').then(results => console.log(results));
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



  return (
    <ChakraProvider theme={theme}>
      <Endgame
        isOpen={isOpen}
        onClose={onClose}
        guesses={guesses.length}
        total={total}
        restartGame={restartGame}
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
      </Container>
    </ChakraProvider>
  );
}

export default App;
