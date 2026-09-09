import { useState } from "react";
import Header from "../components/Header";

function Calculator() {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanYears, setLoanYears] = useState("");

  const [result, setResult] = useState(null);

  const calculateEMI = (event) => {
    event.preventDefault();

    const principal = Number(loanAmount);
    const annualRate = Number(interestRate);
    const years = Number(loanYears);

    if (
      principal <= 0 ||
      annualRate < 0 ||
      years <= 0
    ) {
      alert("Please enter valid values.");
      return;
    }

    const monthlyRate =
      annualRate / 12 / 100;

    const months = years * 12;

    let emi;

    if (monthlyRate === 0) {
      emi = principal / months;
    } else {
      emi =
        (principal *
          monthlyRate *
          Math.pow(
            1 + monthlyRate,
            months
          )) /
        (Math.pow(
          1 + monthlyRate,
          months
        ) - 1);
    }

    const totalPayment = emi * months;

    const totalInterest =
      totalPayment - principal;

    setResult({
      emi,
      totalInterest,
      totalPayment,
    });
  };

  const formatMoney = (amount) => {
    return `₹${Number(amount || 0).toLocaleString(
      "en-IN",
      {
        maximumFractionDigits: 2,
      }
    )}`;
  };

  return (
    <div className="calculator-page">

      <Header
        title="Calculator"
        subtitle="Calculate your loan EMI and repayment details"
      />

      <div className="calculator-layout">

        {/* Calculator Form */}

        <section className="calculator-card">

          <div className="calculator-header">
            <div>
              <h2>EMI Calculator</h2>

              <p>
                Calculate your monthly loan payment
              </p>
            </div>

            <div className="calculator-icon">
              🧮
            </div>
          </div>

          <form
            onSubmit={calculateEMI}
            className="calculator-form"
          >

            <div className="calculator-field">

              <label>
                Loan Amount
              </label>

              <div className="calculator-input">

                <span>₹</span>

                <input
                  type="number"
                  min="1"
                  placeholder="Enter loan amount"
                  value={loanAmount}
                  onChange={(event) =>
                    setLoanAmount(event.target.value)
                  }
                />

              </div>

            </div>


            <div className="calculator-field">

              <label>
                Interest Rate (% per year)
              </label>

              <div className="calculator-input">

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="Example: 8.5"
                  value={interestRate}
                  onChange={(event) =>
                    setInterestRate(event.target.value)
                  }
                />

                <span>%</span>

              </div>

            </div>


            <div className="calculator-field">

              <label>
                Loan Duration (Years)
              </label>

              <div className="calculator-input">

                <input
                  type="number"
                  min="1"
                  placeholder="Example: 5"
                  value={loanYears}
                  onChange={(event) =>
                    setLoanYears(event.target.value)
                  }
                />

                <span>Years</span>

              </div>

            </div>


            <button
              type="submit"
              className="calculate-button"
            >
              Calculate EMI
            </button>

          </form>

        </section>


        {/* Results */}

        <section className="calculator-card result-card">

          <div className="calculator-header">

            <div>
              <h2>Calculation Result</h2>

              <p>
                Your estimated loan repayment
              </p>
            </div>

          </div>


          {result ? (

            <div className="calculator-results">

              <div className="result-main">

                <span>
                  Monthly EMI
                </span>

                <strong>
                  {formatMoney(result.emi)}
                </strong>

              </div>


              <div className="result-row">

                <span>
                  Loan Amount
                </span>

                <strong>
                  {formatMoney(loanAmount)}
                </strong>

              </div>


              <div className="result-row">

                <span>
                  Total Interest
                </span>

                <strong>
                  {formatMoney(
                    result.totalInterest
                  )}
                </strong>

              </div>


              <div className="result-row">

                <span>
                  Total Payment
                </span>

                <strong>
                  {formatMoney(
                    result.totalPayment
                  )}
                </strong>

              </div>

            </div>

          ) : (

            <div className="calculator-empty">

              <div className="calculator-empty-icon">
                ₹
              </div>

              <h3>
                No calculation yet
              </h3>

              <p>
                Enter your loan details and
                calculate your EMI.
              </p>

            </div>

          )}

        </section>

      </div>

    </div>
  );
}

export default Calculator;