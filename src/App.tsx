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
        '0x8b112594e42fcba3f38f8947a2b6d25c0972233fd7b991b5451d6545dd6340fc',
        wallet
      );

      const invocation = await contract.multiCall([
        contract.functions
          .mint_to_address(bn(100), {
            value: wallet.address.toB256(),
          }, bn(100)),
        contract.functions
          .mint_to_address(bn(100), {
            value: wallet.address.toB256(),
          }, bn(100)),
      ]);

      const txRequest = await invocation.getTransactionRequest();

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
