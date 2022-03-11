import logo from './logo.svg';
import './App.css';
import Card from './CardComponent/CardComponent';
import React, { useEffect, useState } from 'react';
import axios from "axios";

function App() {

  const [plans, setPlans] = useState([]);
  const [offersLength, setOffersLength] = useState([]);
  const [planId, setPlanId] = useState([]);
  const [isActivePlan, setIsActivePlan] = useState(parseInt(localStorage.getItem("activePlan")));

  useEffect(() => {
    axios.get("https://my-json-server.typicode.com/TypesetIO/mock/plans")
      .then(response => {
        setPlans(response.data);
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  useEffect(() => {
    axios.get("https://my-json-server.typicode.com/TypesetIO/mock/offers")
      .then(response => {
        const offers = response.data.filter(item => item.planId === planId);
        if (!offers.length) {
          localStorage.removeItem("offersLength");
        }
        offers?.forEach((item, index) => {
          localStorage.setItem(`offer${index}`, item.body);
          localStorage.setItem("offersLength", offers.length);
        });
        setOffersLength(offers.length);
      })
      .catch(err => {
        console.log(err);
      })
  }, [planId])

  const planClickHandler = (id) => {
    setIsActivePlan(id);
    setPlanId(id+1);
    localStorage.setItem("activePlan", id);
  }

  const constructOfferBody = () => {
    const offersArray = [];
    const offersLength = localStorage.getItem("offersLength");
    for(let i=0; i<offersLength; i++) {
      offersArray.push(localStorage.getItem(`offer${i}`));
    }

    return offersArray;
  }

  return (
    <div className="App">
      <div className="side-nav-container">
        <span>Plans and Pricing</span>
        <span>Password</span>
      </div>
      <div className="main-container">
        <div className="header"></div>
        <div className="main">
          <div className='plans-container'>
            {plans?.map((item, index) => {
              return (
                <Card
                  key={item.title}
                  className={isActivePlan === index ? "selected-plan" : ""}
                  heading={item.title}
                  pricing={item.price}
                  onClick={() => planClickHandler(index)}
                />
              );
            })}
          </div>
          <div className='offers-container'>
            <Card isOffer heading={constructOfferBody()} />;
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
