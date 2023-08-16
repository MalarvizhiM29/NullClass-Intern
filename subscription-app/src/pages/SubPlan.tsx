import { useEffect, useState } from "react";
import axios from "axios";
import "./SubPlan.css";

const SubPlan = () => {
  const [prices, setPrices] = useState<any>([]);

  useEffect(() => {
    fetchPrices();
  }, []);

  const fetchPrices = async () => {
    const { data: response } = await axios.get(
      "http://localhost:5000/subs/prices"
    );
    console.log(response);
    setPrices(response.data);
  };

  const createSession = async (priceId: string) => {
    const { data: response } = await axios.post(
      "http://localhost:5000/subs/session",
      {
        priceId,
      }
    );

    window.location.href = response.url;
  };

  return (
    <div>
      <div className="plan-card">
        {prices.map((prices: any) => (
          <div className="combo-card">
            <div className="card" key={prices.id}>
              <p className="price-amount">
                ₹{(prices.unit_amount / 100).toFixed(2)}
              </p>
            </div>
            <h3 className="nickname">{prices.nickname}</h3>
            <button
              className="plan-btn"
              onClick={() => createSession(prices.id)}
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubPlan;
