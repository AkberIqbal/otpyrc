import { useState } from 'react';
import { ethers } from 'ethers'
import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json'
import './App.css';

// Update with the contract address logged out to the CLI when it was deployed 
const greeterAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";

const Crypto = () => {
    // store greeting in local state
    const [greeting, setGreetingValue] = useState()
    const [readGreeting, setReadGreeting] = useState()

    // request access to the user's MetaMask account
    async function requestAccount() {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
    }

    // call the smart contract, read the current greeting value
    async function fetchGreeting() {
        console.log('inside fetchGreeting');
        if (typeof window.ethereum !== 'undefined') {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const contract = new ethers.Contract(greeterAddress, Greeter.abi, provider)
            try {
                const data = await contract.greet()
                setReadGreeting(data);
                console.log('data: ', data)
            } catch (err) {
                console.log("Error: ", err)
            }
        }
    }

    // call the smart contract, send an update
    async function setGreeting() {
        if (!greeting) return
        if (typeof window.ethereum !== 'undefined') {
            await requestAccount()
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner()
            const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer)
            const transaction = await contract.setGreeting(greeting)
            await transaction.wait()
            fetchGreeting()
        }
    }

    return (
        <div className="crpyto-container">
            <header className="App-header">
                <button onClick={fetchGreeting}>Fetch Greeting</button>
                {readGreeting && readGreeting !== '' ?
                    <span>Greeting read: <strong>{readGreeting}</strong></span>
                    :
                    <span>no greeting read yet</span>
                }
                <button onClick={setGreeting}>Set Greeting</button>
                <input onChange={e => setGreetingValue(e.target.value)} placeholder="Set greeting" />
            </header>
        </div>
    );
}

export default Crypto;