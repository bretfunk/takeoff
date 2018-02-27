# Takeoff
Takeoff is a crowdfunding app bulid with Solidity, Web3, React.js, Next.js, IPFS and Semantic UI.
With Takeoff there is no rentseeking middlemen to skim off of inventors or fundraisers.
It all happens automatically through the power of the Ethereum blockchain.
If the amount of money specified is not raised in the time alotted then the user's recieve their funds (minus 1% to cover the Ethereum costs).

## Backend
This appliction includes a simple Rails backend to store and retrieve user-contributed campaigns.
The backend code can be found at: https://github.com/bretfunk/takeoff_backend
The backend api live site can be found at: https://takeoff-backend2.herokuapp.com/

## Versions
Solidity: 0.4.19
Web3: 1.0.0-beta.29
Next: 5.0.0
React: 16.2.0
ReactDOM: 16.2.0
Node: 9.5.0

Solidity and Web3 update versions quickly so if you are having errors be sure to check the versions

## To Install
Clone the directory and run 'npm install'
In a seperate terminal, inside the directory, run 'npm run dev' to start up the development branch on localhost:3000
The frontend application already points to the backend api live on heroku

## Testing
Testing is done with Mocha.js and Web3.
To run the tests run 'npm run test' or node takeoff/test/<specific file>

## Future Improvements
IPFS for media storage
AWS to store user donated contracts

## Bug Fixes / Suggestions
Submit a PR or contact me at @bretfunk
