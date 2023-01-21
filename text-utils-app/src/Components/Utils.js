import React, { useEffect, useState } from "react";
import { RiToggleLine, RiToggleFill } from "react-icons/ri";
import "../App.css";
import { CopyToClipboard } from "react-copy-to-clipboard";

const Utils = () => {
    // usestate for dark & light mode toggle fun
    const [mode, setMode] = useState(false);

    // state changging for toggle icon
    const [toggle, setToggle] = useState(false);

    // state change for real time typing or prieview 
    const [typing, setTyping] = useState("");

    // state for upper case & lower case
    const [upperCase, setUpperCase] = useState();
    // state for copy text
    const [copy, setCopy] = useState(true);
    // state for words counter 
    const [countWords, setCountWords] = useState(0);
    // state for character counter
    const [countChars, setCountChars] = useState(0);

    // dark mode & light mode
    const theme = {
        darkMode: {
            backgroundColor: "black",
            color: "white",
            transition: "900ms",
        },
        lightMode: {
            backgroundColor: "white",
            color: "black",
            transition: "900ms",
        },
    };

    // toggle fun
    function toggler() {
        setToggle((prevMode) => !prevMode);
        setMode((prevMode) => !prevMode);
    }

    //real-time updating states
    const StateTyping = (e) => {
        let typed = e.target.value;
        setTyping(typed);
        counterForChars();
        counterForWords();
    };

    // create upper case fun
    const UpperCaseFun = () => {

        let caseChange = typing.toUpperCase();
        if (caseChange === "") {
            alert("Enter text 1st to Test!!");
        } else {
            setUpperCase(caseChange);
            setTyping(caseChange);
        }

    };

    // create lower case fun
    const LowerCase = () => {
        let caseChange = typing.toLowerCase();
        if (caseChange === "") {
            alert("Enter text to Test!!");
        } else {
            setUpperCase(caseChange);
            setTyping(caseChange);
        }
    };

    // remove extra space
    const removeWhiteSpc = () => {
        const arr = typing.split(" ");
        const str = arr.join("");
        setTyping(str);
    };

    // clear all fun
    const ClearAll = () => {
        setTyping("");
        counterForWords();
        counterForChars();
        CopyToClipboard();

    };

    // copy fun
    useEffect(() => {
        changeCopyBtnTxt();
        setCopy((prevMode) => !prevMode);
    }, []);
    const changeCopyBtnTxt = () => {
        setCopy();
    };

    // counting words fun
    const counterForWords = () => {
        const wordsArr = typing.split(" ");
        setCountWords(wordsArr.length);

        if (wordsArr.length === 1) {
            setCountWords(0);
        }
    };

    // counting char fun
    const counterForChars = () => {
        const charsArr = typing.split(" ");
        for (let i = 0; i < charsArr.length; i++) {
            setCountChars(typing.length);
        }
    };


    return (
        <div className="Main" style={mode ? theme.darkMode : theme.lightMode}>
            
            <div className="Nav">
                <span className="toggle">TextUtils</span>
                <a href="#">
                    <h3 className="toggle"> Home </h3>

                </a>
                <span className="toggle">
                    {toggle ? (
                        <RiToggleFill onClick={toggler} />
                    ) : (
                        <RiToggleLine
                            onClick={toggler}
                        />
                    )}
                    <span> Enable DarkMode</span>
                </span>
            </div>

            <div className="Sub-Main">
                <div className="Body-Container">
                    <h2>Enter the text to analyze below</h2>

                    <CopyToClipboard text={typing}>
                        <textarea
                            value={typing}
                            placeholder="Start Typing..."
                            onChange={StateTyping}
                            cols="60"
                            rows="20"
                            className="input-area"
                        />
                    </CopyToClipboard>


                    <button onClick={UpperCaseFun}>Convert to Uppercase</button>

                    <button onClick={LowerCase}>Convert to Lowercase</button>

                    <button onClick={ClearAll}>Clear Text</button>

                    <button

                        onClick={changeCopyBtnTxt}
                    >
                        {copy}
                        {copy ? "Copy Text" : "Copied📋"}
                    </button>


                    <button onClick={removeWhiteSpc}>Remove Extra space</button>




                    <h2>Your text summary</h2>
                    <h5>
                        {" "}
                        {countWords} words and {countChars} characters
                    </h5>

                    <p>0.008 Minutes read</p>

                    <h2>Preview</h2>

                    <p>Enter something in the textbox above to preview it here</p>

                    <p>{typing}</p>
                </div>
            </div>
        </div>
    );
};

export default Utils;