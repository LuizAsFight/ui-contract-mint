import { useEffect, useState } from 'react';
import './App.css';
import { useFuel } from './useFuel';
import { TokenContractAbi__factory } from './types';
import { bn } from 'fuels';

function App() {
  const [fuel, error] = useFuel();
  const [isConnected, setConnect] = useState(false);

  useEffect(() => {
    (async () => {
      if (fuel) {
        await connect();
      }
    })();
  }, [fuel]);

  async function connect() {
    await fuel.connect();
    setConnect(true);
  }

  async function mint() {
    try {
      const account = await fuel.currentAccount();
      const wallet = await fuel.getWallet(account);
      const contract = TokenContractAbi__factory.connect(
        '0x2d87e944770f0c88aea643a7248c8f143df52eb15fada315fc2018b89b59e68f',
        wallet
      );

      const invocation = await contract.multiCall([
        contract.functions
          .mint_to_address(bn(100), {
            value: wallet.address.toB256(),
          }, bn(100), ['LFG', 'LFG', 'LFG']),
        contract.functions
          .mint_to_address(bn(100), {
            value: wallet.address.toB256(),
          }, bn(100), ['ABC', 'ABC', 'ABC']),
      ]);

      const txRequest = await invocation.getTransactionRequest();

      debugger;
      fuel.sendTransaction(txRequest, { url: 'http://localhost:4000/graphql' }, wallet.address.bech32Address);

    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        {isConnected ? (
          <button onClick={mint}>Mint</button>
        ) : (
          <button onClick={connect}>Connect</button>
        )}
      </header>
    </div>
  );
}

export default App;
