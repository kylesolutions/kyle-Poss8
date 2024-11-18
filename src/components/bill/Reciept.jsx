import React from 'react'
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './receipt.css'

function Reciept() {
    const [userData, setUserData] = useState({
        name: '',
        mobile: '',
    });
    const location = useLocation();
    const { totalAmount} = location.state || {}; 
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    };
    const handlePaymentMethodSelect = (method) => {
        navigate(`/${method}-payment`, {
            state: {
                userData,
                totalAmount
            },
        });
    };
    const navigate = useNavigate()
  return (
    <>
        <h1>Receipt & Payment</h1>
            <div className="receipt-container">
                <div className="form-section">
                    <h3>User Information</h3>
                    <label>
                        Name:
                        <input 
                            type="text" 
                            name="name" 
                            value={userData.name} 
                            onChange={handleInputChange} 
                            required 
                        />
                    </label>
                    <label>
                        Phone:
                        <input 
                            type="tel" 
                            name="mobile" 
                            value={userData.mobile} 
                            onChange={handleInputChange} 
                            required 
                        />
                    </label>
                    <span>{}</span>
                </div>
                <div className="form-section">
                    <h3>Select Payment Method</h3>
                    <div className="payment-options-isotope-grid">
                        <button 
                            className="payment-button" 
                            onClick={() => handlePaymentMethodSelect('gateway')}
                        >
                            UPI/PAYTM
                        </button>
                        <button 
                            className="payment-button" 
                            onClick={() => handlePaymentMethodSelect('cash')}
                        >
                            CASH
                        </button>
                    </div>
                </div>

                <div className="total-amount">
                    <h3>Total Amount: ₹{totalAmount}</h3>
                </div>
            </div>
    </>
  )
}

export default Reciept