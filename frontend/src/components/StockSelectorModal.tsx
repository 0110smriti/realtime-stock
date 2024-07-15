import React, { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { fetchPrices } from '../store/actions';
import { AppDispatch } from '../store';
import '../App.css';

Modal.setAppElement('#root');

interface StockSelectorModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  selectedSymbol: string;
  onSymbolChange: (symbol: string) => void;
}

const StockSelectorModal: React.FC<StockSelectorModalProps> = ({
  isOpen,
  onRequestClose,
  selectedSymbol,
  onSymbolChange
}) => {
  const [localSymbol, setLocalSymbol] = useState(selectedSymbol);
  const dispatch: AppDispatch = useDispatch();

  const handleSymbolChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLocalSymbol(event.target.value);
  };

  const handleSubmit = () => {
    onSymbolChange(localSymbol);
    dispatch(fetchPrices(localSymbol));
    onRequestClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Select Stock">
      <h2>Select Stock</h2>
      <select value={localSymbol} onChange={handleSymbolChange}>
        <option value="GOOG">Google (GOOG)</option>
        <option value="MSFT">Microsoft (MSFT)</option>
        <option value="FB">Facebook (FB)</option>
        <option value="AAPL">Apple (AAPL)</option>
        <option value="AMZN">Amazon (AMZN)</option>
      </select>
      <button onClick={handleSubmit}>Submit</button>
    </Modal>
  );
};

export default StockSelectorModal;
