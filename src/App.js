import { useState } from 'react';
import Header from './components/Header';
import InvestmentForm from './components/InvestmentForm';
import InvestmentResult from './components/InvestmentResult';

function App() {
  const [results, setResults] = useState(null);
  const [initialInvestment, setInitialInvestment] = useState(0);

  const calculateHandler = (userInput) => {
    setInitialInvestment(userInput['current-savings']);
    const yearlyData = [];

    let currentSavings = +userInput['current-savings'];
    const yearlyContribution = +userInput['yearly-contribution'];
    const expectedReturn = +userInput['expected-return'] / 100;
    const duration = +userInput['duration'];

    for (let i = 0; i < duration; i++) {
      const yearlyInterest = currentSavings * expectedReturn;
      currentSavings += yearlyInterest + yearlyContribution;
      yearlyData.push({
        year: i + 1,
        yearlyInterest: yearlyInterest,
        savingsEndOfYear: currentSavings,
        yearlyContribution: yearlyContribution,
      });
    }

    setResults(yearlyData);
  };

  return (
    <div>
      <Header />

      <InvestmentForm onCalculate={calculateHandler} />

      {/* Todo: Show below table conditionally (only once result data is available) */}
      {/* Show fallback text if no data is available */}
      {!results && <p style={{textAlign: 'center'}}>No investment calculated yet</p>}
      {results && <InvestmentResult results={results} initialInvestment={initialInvestment}/>}
    </div>
  );
}

export default App;
