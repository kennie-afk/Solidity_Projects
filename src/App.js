import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

// web3 module
import Web3 from 'web3';

//  contract address and the ABI
const ADDRESS = "0x84BD6178d14AdCFAa27124E261275534D287cFE2"; 
const ABI = [
	{
		"inputs": [],
		"name": "decreaseNumber",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "increaseNumber",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_newNumber",
				"type": "uint256"
			}
		],
		"name": "resetNumber",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_newMessage",
				"type": "string"
			}
		],
		"name": "setMessage",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_initialNumber",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_initialMessage",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "getMessage",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getNumber",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

function App() {
  const [number, setNumber] = useState('none');
  const [currentMessage, setCurrentMessage] = useState('none');
  const [newMessage, setNewmessage] = useState('');

  // initialize web3 object
  const web3 = new Web3(window.ethereum);

  //initializing the contract ABI and ADDRESS
  const myContract = new web3.eth.Contract(ABI, ADDRESS);

  // reading functions
  //number
  async function getNumber() {
    const result = await myContract.methods.getNumber().call();
    setNumber(result.toString());
  }

  //message
  async function getMessage() {
    const message = await myContract.methods.getMessage().call();  // Corrected call
    setCurrentMessage(message);
  }

  //writing functions
  //number
  async function increaseNumber() {
    const accountConnected = await web3.eth.requestAccounts();
    const tx = await myContract.methods
      .increaseNumber()
      .send({ from: accountConnected[0] });
    getNumber();
  }

  async function decreaseNumber() {
    const accountPresent = await web3.eth.requestAccounts();
    const transact = await myContract.methods
      .decreaseNumber()
      .send({ from: accountPresent[0] });
    getNumber();
  }

  async function updateMessage() {
    const connectedAccounts = await web3.eth.requestAccounts();
    const Transaction = await myContract.methods
      .setMessage(newMessage)
      .send({ from: connectedAccounts[0] });
    getMessage();
  }

  return (
    <div className='App'>
      <div className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <br></br>
        <button onClick={getNumber}>Get Number</button>
        <br></br>
        <br />
        <button onClick={increaseNumber}>Increase Number</button>
        <br />
        <br></br>
        <button onClick={decreaseNumber}>Decrease Number</button>
        <br />
        <p>Number: {number}</p>
        <br></br>
        <button onClick={getMessage}>Get Message</button>
        <br />
        <p>Message: {currentMessage}</p>
        <br />
        <input
          type='text'
          value={newMessage}
          onChange={(e) => setNewmessage(e.target.value)}
          placeholder='Enter new Message'
        />
        <br />
        <br></br>
        <button onClick={updateMessage}>Update Message</button>
      </div>
    </div>
  );
}

export default App;
