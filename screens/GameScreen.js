import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { useEffect } from "react";
import React from "react";
import Title from "../components/ui/Title";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/card";
import InputText from "../components/ui/inputText";
import Ionicons from "@expo/vector-icons/Ionicons";
import GuessLogItem from "../components/game/GuessLogItem";

// fungsi menebak angka
function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

let minBoundary = 1;
let maxBoundary = 100;

const GameScreen = ({ userNumber, onGameOver }) => {
  const initialGuess = generateRandomBetween(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessRounds, setGuessRounds] = useState([initialGuess]);

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver(guessRounds.length);
    }
    // pengkondisian diatas akan terus dilakukan jika terdapat perubahan pada value tiga dibawah
  }, [currentGuess, userNumber, onGameOver]);

  // useEffect dibawah untuk mereset batas, ketika memulai game baru
  // useEffect dibawah aktif ketika component gameScreen dirender pertama kali
  // jadi setiap kali restart dan masuk kembali ke gameScreen maka batas atas dan bawah akan di set ke 1 dan 100
  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []); // menggunakan array kosong karena syaratnya hanya ketika masuk ke gameScreen

  function nextGuessHandler(direction) {
    if (
      (direction === "lower" && currentGuess < userNumber) ||
      (direction === "greater" && currentGuess > userNumber)
    ) {
      Alert.alert("Dont Lie!", "this is wrong...", [
        { text: "Sorry", style: "cancel" },
      ]);
      return;
    }
    if (direction === "lower") {
      maxBoundary = currentGuess;
      // const newRndNumber = generateRandomBetween(minBoundary, maxBoundary, currentGuess);
    } else {
      minBoundary = currentGuess + 1;
      // const newRndNumber = generateRandomBetween(minBoundary, maxBoundary, currentGuess);
    }
    // console.log(minBoundary, maxBoundary);
    const newRndNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    setCurrentGuess(newRndNumber);
    // untuk menampilkan angka tebakan
    setGuessRounds((prevGuessRounds) => [newRndNumber, ...prevGuessRounds]);
  }

  const guessRoundsListLength = guessRounds.length;

  return (
    <View style={styles.screen}>
      {/* Title merupakan component buatan sendiri */}
      <Title>Opponents Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>

      <Card>
        <InputText style={styles.inputText}>Higher or Lower</InputText>
        <View style={styles.buttonsContainer}>
          {/* button diikat dengan value 'lower' dan 'greater' */}
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
              <Ionicons name="remove" size={24} color="white" />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "greater")}>
              <Ionicons name="add" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </Card>
      <View style={styles.listContainer}>
        {/* {guessRounds.map((guessRound) => (<Text key={guessRound}>{guessRound}</Text>))} */}
        <FlatList
          data={guessRounds}
          renderItem={(itemData) => (
            <GuessLogItem
              roundNumber={guessRoundsListLength}
              guess={itemData.item}
            />
          )}
          keyExtractor={(item, index) => item}
        />
      </View>
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 32,
  },
  inputText: {
    marginBottom: 12,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
});
