import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import './receipt.css'

function CashPayment() {
    const location = useLocation();
    const { userData, totalAmount } = location.state || {};
    const navigate = useNavigate()
    return (
        <>
            <div className='container'>
                <h1>THANK YOU . VISIT AGAIN</h1>
                <div className='row d-flex justify-content-center'>
                    <div className="section col-md-4 text-center">
                        <p><strong>Name:</strong> {userData.name}</p>
                        <p><strong>Phone:</strong> {userData.mobile}</p>
                        <p><strong>Total Amount:</strong> ₹{totalAmount}</p>
                        <button
                            onClick={() => window.print()}
                            className="print-button"
                            class="btn btn-success"
                        >
                           COLLECT RECEIPT
                        </button>
                    </div>
                </div>

            </div>
        </>
    )
}

export default CashPayment