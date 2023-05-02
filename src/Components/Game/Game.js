import './Game.css'
import React, { useRef, useState, useEffect } from "react";
import Keyboard from 'react-simple-keyboard';
import "react-simple-keyboard/build/css/index.css";
import {gusses, answers} from "./lists"

var game_over = 0

if (localStorage.getItem("words") === null) {
    localStorage.setItem("words", "")
}
if (localStorage.getItem("time") === null) {
    localStorage.setItem("time", "")
}

const ChooseWord = () => {
    return answers[Math.floor(Math.random() * (answers.length + 1))];
}

const GenerateBoxes = (
    row_num, 
    input, 
    previous_rows, 
    correct_word, 
    setGrayLetters, 
    setYellowLetters, 
    setGreenLetters,
    gray_letters,
    yellow_letters,
    green_letters
    ) => {
    var boxes = []
    var text = ""
    var box_class = ""
    previous_rows = previous_rows.toUpperCase()
    previous_rows = previous_rows.split(" ")
    input = input.toUpperCase()
    correct_word = correct_word.toUpperCase()

    for (let row = 1; row <= 6; row++){
        for (let column = 1; column <= 5; column++) {
            text = ""
            box_class = ""

            if (row === row_num) {
                text = input[column - 1]
            } else
            if (row < row_num) {
                text = previous_rows[row - 1][column - 1]
                
                if (text === correct_word[column - 1]) {
                    box_class = 'green'
                    if (!green_letters.includes(text)) {setGreenLetters(green_letters + " " + text)}
                } else
                if (correct_word.includes(text)) {
                    box_class = 'yellow'
                    if (!yellow_letters.includes(text)) {setYellowLetters(yellow_letters + " " + text)}
                } else {
                    box_class = 'gray'
                    if (!gray_letters.includes(text)) {setGrayLetters(gray_letters + " " + text)}
                }

                if (previous_rows.includes(correct_word)) {
                    game_over = 2
                }
            }

            boxes.push(
                <div className={'box ' + box_class} id={"box: " + row + " " + column}>
                    <h2 className='letter'>{text}</h2>
                </div>
            )
        }
    }

    return boxes;
}

const Game = () => {
    const [current_row, SetRow] = useState(1);
    const [input, setInput] = useState("");
    const keyboard = useRef();
    const [words, setWords] = useState("")
    const [correct_word, setWord] = useState(ChooseWord())
    const [gray_letters, setGrayLetters] = useState("")
    const [yellow_letters, setYellowLetters] = useState("")
    const [green_letters, setGreenLetters] = useState("")
    const [time, setTime] = useState(0);

    console.log(correct_word)

    // state to check stopwatch running or not
    const [isRunning, setIsRunning] = useState(false);
  
    useEffect(() => {
      let intervalId;
      if (isRunning) {
        // setting time from 0 to 1 every 1000 milisecond using javascript setInterval method
        intervalId = setInterval(() => setTime(time + 1), 1000);
      }
      return () => clearInterval(intervalId);
    }, [isRunning, time]);
    
    const toggleTimer = (state = null) => {
        if (state !== null) {
            setIsRunning(!isRunning);
        } else {
            setIsRunning(state)
        }
    };

    // Method to reset timer back to 0
    const reset = () => {
    setTime(0);
    };

    if (game_over === 1) { // Fail
        window.location.reload(false);
    } else 
    if (game_over === 2) { //Success
        const word_list = localStorage.getItem('words').split(" ")
        console.log(word_list)
        if (word_list[word_list.length - 2] !== correct_word)
        {
            localStorage.setItem('words', localStorage.getItem('words') + correct_word + ' ')
            localStorage.setItem('time', localStorage.getItem('time') + time + ' ')
        }
        window.location.reload(false);
    }

    const onKeyPress = button => {
        if (time === 0) {
            toggleTimer(true)
        }

        if (button === "{bksp}") {
            setInput(input.substring(0, input.length-1))
        } else
        if (button === "{enter}") {
            if (input.length === 5) {
                if (answers.includes(input.toLowerCase()) || gusses.includes(input.toLowerCase())) {
                    setWords(words + input + " ")
                    SetRow(current_row + 1)
                    setInput("")
                    if (current_row === 6 && game_over === 0) {
                        game_over = 1
                    }
                }
            }
        } else
        if (input.length < 5) {
            setInput(input + button)
        }
    };

    return (
        <div id='game-container'>
            <div id='board'>
                {GenerateBoxes(
                    current_row, 
                    input, 
                    words, 
                    correct_word, 
                    setGrayLetters, 
                    setYellowLetters, 
                    setGreenLetters,
                    gray_letters,
                    yellow_letters,
                    green_letters
                    )}
            </div>
            <div id='keyboard'>
                <Keyboard
                    keyboardRef={r => (keyboard.current = r)}
                    layoutName={'default'}
                    onKeyPress={onKeyPress}
                    layout={{
                        default: [
                          "Q W E R T Y U I O P",
                          "A S D F G H J K L",
                          "{enter} Z X C V B N M {bksp}"
                        ]
                    }}
                    display={{
                        '{enter}': 'enter',
                        '{bksp}': "⌫"
                    }}
                    theme={'hg-theme-default hg-layout-default wordle'}
                    buttonTheme={[
                        {
                            class : "gray",
                            buttons : gray_letters
                        },
                        {
                            class : "yellow",
                            buttons : yellow_letters
                        },
                        {
                            class : "green",
                            buttons : green_letters
                        }
                    ]}
                />
            </div>
            <span id='time'>Time: {time}</span>
        </div>
    )
}

export default Game;