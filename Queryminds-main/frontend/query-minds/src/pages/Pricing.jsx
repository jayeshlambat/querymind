import React, { useContext, useState } from 'react'
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { HandleSuccess } from '../utils/Utils.js';
import { HomeIcon } from "../utils/Icons.js"
import { NavLink, useNavigate } from 'react-router-dom'
import { Context } from '../context/Context.js';

const Pricing = () => {
  const [amount, setAmount] = useState(99);
  const { setIsPaymentDone } = useContext(Context);
  const navigate = useNavigate();

  const HandlePayment = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_HOST_URL}/payment/order`,
        { amount },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      const data = res.data;
      HandlePaymentVerify(data.data)
    } catch (error) {
      console.log(error);
    }
  }

  const NavigateUser = () => {
    navigate("/chatbot")
  }

  const HandlePaymentVerify = async (data) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: data.currency,
      name: "Queryminds",
      description: "Test Mode",
      order_id: data.id,
      handler: async (response) => {
        try {
          const res = await axios.post(
            `${import.meta.env.VITE_BACKEND_HOST_URL}/payment/verify`,
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            },
            {
              headers: {
                'Content-Type': 'application/json',
              }
            }
          );

          const verifyData = res.data;

          if (verifyData.message) {
            setIsPaymentDone(true);
            HandleSuccess(verifyData.message);
            navigate("/chatbot");
          }
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#5f63b8",
      }
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  }

  const pricingPlans = [
    {
      title: "Classic",
      price: "0",
      backgroundColor: "#2A293E",
      features: "Ask 20 queries for 3 hours with limitation to QueryMinds with short and concise responses.",
      buttonText: "Use Now",
      buttonBgColor: "#2A293E",
      buttonTextColor: "#FF6F61",
      ClickFunction: NavigateUser
    },
    {
      title: "Premium",
      price: "99",
      backgroundColor: "#FF6F61",
      badgeText: "Hot",
      features: "Ask unlimited query without any limitation to QueryMinds with detailed and descriptive responses.",
      buttonText: "Pay Now",
      buttonBgColor: "#FF6F61",
      buttonTextColor: "#2A293E",
      ClickFunction: HandlePayment
    },
  ];

  return (
    <>
      <div className="bg-white dark:bg-[#040B35] font-sans h-screen">
        <div className="h-[10%] p-5 flex items-center px-6 w-full text-white">
          <NavLink to="/">
            <span className="p-2 rounded-full bg-slate-700 flex items-center justify-center cursor-pointer hover:bg-slate-600">
              <HomeIcon className="scale-110" />
            </span>
          </NavLink>
        </div>

        <div className="flex flex-wrap justify-center max-w-5xl mx-auto bg-white dark:bg-[#040B35] mt-12">
          {pricingPlans.map((plan, index) => (
            <div key={index} className="w-full sm:w-1/2 md:w-1/3 p-4 mx-5">
              <div className=" bg-zinc-300 dark:bg-[#f6f8fa] hover:shadow-lg p-6 rounded-lg">
                <div
                  className="relative text-center py-8 px-6"
                  style={{ backgroundColor: plan.backgroundColor }}
                >
                  {plan.badgeText && (
                    <span className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#2A293E] text-[#FF6F61] text-sm font-light px-4 py-1 rounded-full">
                      {plan.badgeText}
                    </span>
                  )}
                  <h2 className="text-white text-2xl font-light tracking-wide mt-4">
                    {plan.title}
                  </h2>
                  <div className="flex justify-center items-baseline mt-6 text-white">
                    <small className="text-lg">₹</small>
                    <h2 className="text-4xl font-bold ml-1">{plan.price}</h2>
                    <span className="text-lg font-light ml-2">/ M</span>
                  </div>
                </div>
                <div className="py-5">
                  <ul className="text-center text-[#2A293E] text-sm font-light">
                    {
                      plan.features
                    }
                  </ul>
                </div>
                <div className="text-center mt-4">
                  <a
                    href="#"
                    className="inline-block px-6 py-2 rounded transition duration-300"
                    style={{
                      backgroundColor: plan.buttonBgColor,
                      color: plan.buttonTextColor,
                    }}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = plan.buttonTextColor;
                      e.target.style.color = plan.buttonBgColor;
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = plan.buttonBgColor;
                      e.target.style.color = plan.buttonTextColor;
                    }}
                    onClick={plan.ClickFunction}
                  >
                    {plan.buttonText}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Pricing