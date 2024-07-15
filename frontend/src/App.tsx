import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPrices } from './store/actions';
import { RootState, AppDispatch } from './store';
import { Provider } from 'react-redux';
import store from './store';
import StockSelectorModal from './components/StockSelectorModal';
import './App.css';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSymbol, setSelectedSymbol] = useState('GOOG');
  const dispatch: AppDispatch = useDispatch();
  const prices = useSelector((state: RootState) => state.prices.prices);

  useEffect(() => {
    dispatch(fetchPrices(selectedSymbol));
    const interval = setInterval(() => {
      dispatch(fetchPrices(selectedSymbol));
    }, 60 * 30 * 1000);

    return () => clearInterval(interval);
  }, [dispatch, selectedSymbol]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSymbolChange = (symbol: string) => {
    setSelectedSymbol(symbol);
  };

  return (
    <div>
      <h1>Stock Prices</h1>
      <button onClick={openModal}>Change Stock</button>
      <StockSelectorModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        selectedSymbol={selectedSymbol}
        onSymbolChange={handleSymbolChange}
      />
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Price</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {prices.map((price) => (
            <tr key={price._id}>
              <td>{price.symbol}</td>
              <td>{price.price}</td>
              <td>{new Date(price.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const RootApp: React.FC = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default RootApp;
