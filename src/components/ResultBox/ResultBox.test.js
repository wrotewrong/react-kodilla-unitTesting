import ResultBox from './ResultBox';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

const formatCurrency = (currency) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  });
};

const testCasesPLNToUSD = [
  { from: 'PLN', to: 'USD', amount: 21 },
  { from: 'PLN', to: 'USD', amount: 333 },
  { from: 'PLN', to: 'USD', amount: 1827 },
  { from: 'PLN', to: 'USD', amount: 121212 },
];
const testCasesUSDToPLN = [
  { from: 'USD', to: 'PLN', amount: 62 },
  { from: 'USD', to: 'PLN', amount: 532 },
  { from: 'USD', to: 'PLN', amount: 2223 },
  { from: 'USD', to: 'PLN', amount: 999999 },
];
const testCasesSameCurrency = [
  { from: 'USD', to: 'USD', amount: 72 },
  { from: 'USD', to: 'USD', amount: 125 },
  { from: 'PLN', to: 'PLN', amount: 7213 },
  { from: 'PLN', to: 'PLN', amount: 421234 },
];
const testCasesBelowZero = [
  { from: 'USD', to: 'USD', amount: -42 },
  { from: 'USD', to: 'PLN', amount: -619 },
  { from: 'PLN', to: 'PLN', amount: -5289 },
  { from: 'PLN', to: 'USD', amount: -125613 },
];

describe('Component ResultBox', () => {
  it('should render without crashing', () => {
    render(<ResultBox from='PLN' to='USD' amount={100} />);
  });

  for (let testObj of testCasesPLNToUSD) {
    it('should render proper info about conversion when PLN -> USD', () => {
      render(<ResultBox {...testObj} />);
      const resultBox = screen.getByTestId('resultBox');
      expect(resultBox).toHaveTextContent(
        `${formatCurrency(testObj.from)
          .format(testObj.amount)
          .replace(/\u00a0/g, ' ')} = ${formatCurrency(testObj.to).format(
          testObj.amount / 3.5
        )}`
      );
    });
    cleanup();
  }

  for (let testObj of testCasesUSDToPLN) {
    it('should render proper info about conversion when USD -> PLN', () => {
      render(<ResultBox {...testObj} />);
      const resultBox = screen.getByTestId('resultBox');
      expect(resultBox).toHaveTextContent(
        `${formatCurrency(testObj.from)
          .format(testObj.amount)
          .replace(/\u00a0/g, ' ')} = ${formatCurrency(testObj.to)
          .format(testObj.amount * 3.5)
          .replace(/\u00a0/g, ' ')}`
      );
    });
    cleanup();
  }

  for (let testObj of testCasesSameCurrency) {
    it('should render proper info when both selects use the same currency', () => {
      render(<ResultBox {...testObj} />);
      const resultBox = screen.getByTestId('resultBox');
      expect(resultBox).toHaveTextContent(
        `${formatCurrency(testObj.from)
          .format(testObj.amount)
          .replace(/\u00a0/g, ' ')} = ${formatCurrency(testObj.to)
          .format(testObj.amount)
          .replace(/\u00a0/g, ' ')}`
      );
    });
    cleanup();
  }

  for (let testObj of testCasesBelowZero) {
    it('should render error message when input is lower than zero', () => {
      render(<ResultBox {...testObj} />);
      const resultBox = screen.getByTestId('resultBox');
      expect(resultBox).toHaveTextContent('Wrong value...');
    });
    cleanup();
  }
});
