import { useEffect, useState } from 'react';
import './App.css';
import { useFuel } from './useFuel';
import { TokenContractAbi__factory } from './types';
import { Address, bn } from 'fuels';

const NETWORK_URL = 'https://beta-3.fuel.network/graphql';
const CONTRACT_ID = '0xd58568036bb3c01142d3149f238bcf2d75478c01fa97dfc1b8caee0f808651ff';
const RECEIVER_ADDRESS = 'fuel1dke8xj6euht7estn4s2akt5smtnvdtqnel0204wv2rq0j06j290qsxqwgt';

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
    await fuel?.connect();
    setConnect(true);
  }

  async function mint() {
    try {
      const account = await fuel?.currentAccount();
      const wallet = await fuel?.getWallet(account || '');

      if (wallet) {
        const contract = TokenContractAbi__factory.connect(
          CONTRACT_ID,
          wallet
        );
  
        const invocation = await contract.multiCall([
          contract.functions
            .mint_to_address(bn(100), {
              value: Address.fromString(RECEIVER_ADDRESS).toB256(),
            }, bn(100)),
          contract.functions
            .mint_to_address(bn(100), {
              value: Address.fromString(RECEIVER_ADDRESS).toB256(),
            }, bn(100)),
        ]);
  
        const txRequest = await invocation.getTransactionRequest();
  
        fuel?.sendTransaction(txRequest, { url: NETWORK_URL }, wallet.address.toAddress());
      }

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
