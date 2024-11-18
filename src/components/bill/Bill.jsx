import React, { useContext, useState } from 'react';
import './bill.css';
import FoodDetails from './FoodDetails';
import CartContext from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

const foodList = [
    { name: 'Burger', category: 'Non-Vegetarian', image: 'public/images/Classic Cheeseburger.jpg', price: 200, addons: ['Extra Cheese', 'Bacon', 'Onion Rings'], type: 'food' },
    { name: 'Cola', category: 'Carbonated', image: 'public/images/Cola.jpeg', price: 50, addons: ['Lemon Slice', 'Ice'], type: 'drink' },
    { name: 'Pizza', category: 'Non-Vegetarian', image: 'public/images/BBQ_Chicken_Pizza-removebg-preview.png', price: 320, addons: ['Onions', 'Jalapeños', 'Extra BBQ Sauce'], type: 'food' },
    { name: 'Sandwich', category: 'Vegetarian', image: 'public/images/Grilled_Cheese_Sandwich-removebg-preview.png', price: 220, addons: ['Tomato', 'Basil', 'Extra Cheese'], type: 'food' },
    { name: 'Lemonade', category: 'Non-Carbonated', image: 'public/images/Lemonade.jpg', price: 60, addons: ['Mint', 'Sugar'], type: 'drink' },
    { name: 'Mango Lassi', category: 'Non-Carbonated', image: 'public/images/Mango Lassi.avif', price: 80, addons: ['Cardamom', 'Sugar'], type: 'drink' },
    { name: 'Biryani', category: 'Non-Vegetarian', image: 'public/images/hyderabadi biriyani.png', price: 250, addons: ['Raita', 'Salad', 'Biryani Masala'], type: 'food' },
    { name: 'Biryani', category: 'Non-Vegetarian', image: 'public/images/dum biriyani.png', price: 320, addons: ['Raita', 'Chutney'], type: 'food' },
    { name: 'Juice', category: 'Tropical', image: 'public/images/mango-juice.png', price: 140, addons: ['Chili Powder', 'Salt'], type: 'drink' },
    { name: 'Fried Rice', category: 'Vegetarian', image: 'public/images/egg fried rice.png', price: 240, addons: ['Green Peppers', 'Soy Sauce', 'Chili Flakes'], type: 'food' },
    ];

const BurgerList = [
   { name: 'Classic Cheeseburger', category: 'Non-Vegetarian', image: '/public/images/Classic Cheeseburger1.jpg', price: 200, addons: ['Extra Cheese', 'Bacon', 'Onion Rings'], type: 'food' },
    { name: 'Bacon BBQ Burger', category: 'Non-Vegetarian', image: '/public/images/bbq burger.png', price: 250, addons: ['Extra Bacon', 'Onion Rings', 'BBQ Sauce'], type: 'food' },
    { name: 'Spicy Chicken Burger', category: 'Non-Vegetarian', image: '/public/images/Spicy Chicken Burger.jpg', price: 180, addons: ['Extra Cheese', 'Jalapeños', 'Spicy Sauce'], type: 'food' },
    { name: 'Mushroom Swiss Burger', category: 'Non-Vegetarian', image: '/public/images/Mushroom Swiss Burger.jpg', price: 220, addons: ['Extra Swiss Cheese', 'Grilled Mushrooms', 'Onion Rings'], type: 'food' },
    { name: 'Double Beef Burger', category: 'Non-Vegetarian', image: '/public/images/Double Beef Burger.webp', price: 300, addons: ['Extra Patty', 'Bacon', 'Cheese'], type: 'food' },
    { name: 'Veggie Delight Burger', category: 'Vegetarian', image: '/public/images/Veggie Delight Burger.jpg', price: 150, addons: ['Extra Cheese', 'Grilled Mushrooms', 'Avocado'], type: 'food' },
    { name: 'Black Bean Burger', category: 'Vegetarian', image: '/public/images/Black Bean Burger.jpg', price: 170, addons: ['Extra Cheese', 'Guacamole', 'Lettuce'], type: 'food' },
    { name: 'Falafel Burger', category: 'Vegetarian', image: '/public/images/Falafel Burger.avif', price: 160, addons: ['Tahini Sauce', 'Extra Falafel', 'Pickles'], type: 'food' },
    { name: 'Fish Fillet Burger', category: 'Non-Vegetarian', image: '/public/images/Fish Fillet Burger.webp', price: 210, addons: ['Extra Tartar Sauce', 'Cheese', 'Lettuce'], type: 'food' },
    { name: 'Grilled Chicken Burger', category: 'Non-Vegetarian', image: '/public/images/Grilled Chicken Burger.webp', price: 190, addons: ['Extra Cheese', 'Bacon', 'Mayo'], type: 'food' },
    { name: 'Halloumi Burger', category: 'Vegetarian', image: '/public/images/Halloumi Burger.jpg', price: 200, addons: ['Grilled Halloumi', 'Lettuce', 'Avocado'], type: 'food' },
    { name: 'Buffalo Chicken Burger', category: 'Non-Vegetarian', image: 'public/images/Buffalo Chicken Burger.jpg', price: 220, addons: ['Extra Buffalo Sauce', 'Blue Cheese', 'Onion Rings'], type: 'food' }
];

const pizzaList = [
    { name: 'Margherita Pizza', category: 'Vegetarian', image: '/images/Margherita Pizza.jpg', price: 250, addons: ['Extra Cheese', 'Olives', 'Basil'] },
    { name: 'Pepperoni Pizza', category: 'Non-Vegetarian', image: '/images/Pepperoni Pizza.jpg', price: 300, addons: ['Extra Cheese', 'Chili Flakes', 'Garlic Sauce'] },
    { name: 'BBQ Chicken Pizza', category: 'Non-Vegetarian', image: '/images/BBQ Chicken Pizza.jpg', price: 320, addons: ['Onions', 'Jalapeños', 'Extra BBQ Sauce'] },
    { name: 'Veggie Supreme Pizza', category: 'Vegetarian', image: '/images/Veggie Supreme Pizza.jpeg', price: 280, addons: ['Mushrooms', 'Bell Peppers', 'Spinach'] },
    { name: 'Hawaiian Pizza', category: 'Non-Vegetarian', image: '/images/Hawaiian Pizza.jpg', price: 350, addons: ['Extra Pineapple', 'Ham', 'Cheese Burst'] },
    { name: 'Four Cheese Pizza', category: 'Vegetarian', image: '/images/Four Cheese Pizza.jpeg', price: 330, addons: ['Extra Cheese', 'Basil', 'Olives'] },
    { name: 'Meat Lovers Pizza', category: 'Non-Vegetarian', image: '/images/Meat Lovers Pizza.jpeg', price: 400, addons: ['Bacon', 'Sausage', 'Extra Cheese'] },
    { name: 'Pesto Veggie Pizza', category: 'Vegetarian', image: '/images/Pesto Veggie Pizza.jpg', price: 290, addons: ['Pesto Sauce', 'Arugula', 'Olives'] },
];
const ComboList = [
    { name: 'Soft Drink', price: 50, image: '/public/images/softdrinks.jpg' },
    { name: 'French Fries', price: 80, image: '/public/images/french fries.avif' },
    { name: 'Onion Rings', price: 70, image: '/public/images/onion rings.jpg' },
    { name: 'Side Salad', price: 60, image: '/public/images/side salad.webp' },
];

function Bill() {
    const [menuItems, setMenuItems] = useState([...foodList, ...BurgerList, ...pizzaList]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [modalItems, setModalItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedItemForUpdate, setSelectedItemForUpdate] = useState(null);

    const { cartItems, addToCart, removeFromCart, updateCartItem ,selectedCombos} = useContext(CartContext);

    const handleFilter = (category) => {
        switch (category) {
            case 'burger':
                setModalItems(BurgerList);
                break;
            case 'pizza':
                setModalItems(pizzaList);
                break;
            default:
                setMenuItems([...foodList,...pizzaList].filter((item) => item.type === category));
                setModalItems([]);
        }
        setSelectedCategory(category);
    };

    const handleItemClick = (item) => setSelectedItem(item);

    const handleClose = () => setSelectedItem(null);

    const handleItemUpdate = (updatedItem) => {
        updateCartItem(updatedItem);
        setSelectedItemForUpdate(null);
    };
    const handleUpdateIconClick = (item) => {
        setSelectedItemForUpdate(item);
    };
    const navigate= useNavigate()
    const cartTotal = () => {
        return cartItems.reduce((sum, item) => sum + item.totalPrice, 0).toFixed(2);
    };
    const handlePayment = () => {
        if (cartItems.length === 0) {
            alert('Please add items to your order first!');
            return;
        }
        const totalAmount = cartTotal();
        navigate('/receipt', { state: { totalAmount } });
    };
    return (
        <div className="container-fluid">
            <div className="row">
                <div className='col-lg-1 bg-white side-menu'>
                    <div className='row p-2'>
                        <div className='col-lg-12 bg-light mb-2 text-center rounded '>
                            <div className=''>
                                <i class="bi bi-house-fill fs-2 "></i>
                            </div>
                            <a className='home fs-5 '>HOME</a>
                        </div>
                        <div className='col-lg-12 bg-light mb-2 text-center'>
                            <div className=''>
                                <i class="bi bi-menu-button-wide fs-2"></i>
                            </div>
                            <a className='home fs-5 '>MENU</a>
                        </div>
                        <div className='col-lg-12 bg-light mb-2 text-center'>
                            <div className=''>
                                <i class="bi bi-border-all fs-2"></i>
                            </div>
                            <a className='home fs-5 '>TABLE</a>
                        </div>
                        <div className='col-lg-12 bg-light mb-2 text-center'>
                            <div className=''>
                                <i class="bi bi-gear fs-2"></i>
                            </div>
                            <a className='home fs-5 '>SETTINGS</a>
                        </div>
                        <div className='col-lg-12 bg-light mb-2 text-center'>
                            <div className=''>
                                <i class="bi bi-sliders fs-2"></i>
                            </div>
                            <a className='home fs-5 '>ABOUT</a>
                        </div>
                    </div>
                </div>

                <div className="col-lg-8 row2">
                    <div className="row p-2" >

                        <div className="col-lg-2 col-md-4 col-6">
                            <button
                                className="text-dark w-100 rounded d-flex align-items-center drink-btn justify-content-center"
                                onClick={() => handleFilter('drink')}
                            >
                                <img src="/images/Food.png" width={50} alt="Drinks" />
                                Drinks
                            </button>
                        </div>
                        <div className="col-lg-2 col-md-4 col-6">
                            <button
                                className="w-100 rounded d-flex align-items-center food-btn justify-content-center"
                                onClick={() => handleFilter('food')}
                            >
                                <img src="/images/Drinks.png" width={50} alt="Food" />
                                Food
                            </button>
                        </div>
                        <div className="col-lg-2 col-md-4 col-6">
                            <button
                                className="text-dark w-100 rounded d-flex align-items-center drink-btn justify-content-center"
                                onClick={() => handleFilter('burger')}
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                            >
                                <img src="/images/Food.png" width={50} alt="Burger" />
                                Burger
                            </button>
                        </div>
                        <div className="col-lg-2 col-md-4 col-6">
                            <button
                                className="text-dark w-100 rounded d-flex align-items-center food-btn justify-content-center"
                                onClick={() => handleFilter('pizza')}
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                            >
                                <img src="/images/Food.png" width={50} alt="Pizza" />
                                Pizza
                            </button>
                        </div>
                        <div className="col-lg-2 col-md-4 col-6">
                            <button
                                className="text-dark w-100 rounded d-flex align-items-center drink-btn justify-content-center"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                            >
                                <img src="/images/Food.png" width={50} alt="Pizza" />
                                Biriyani
                            </button>
                        </div>
                    </div>

                    <div className="row">
                        {menuItems.map((item, index) => (
                            <div className="col-lg-2 col-md-3 col-4 align-items-center g-3" key={index}>
                                <div className="card" onClick={() => handleItemClick(item)}>
                                    <img className="card-img-top" src={item.image} alt={item.name} width="100%" />
                                    <div className="card-body px-0 category-name">
                                        <h4 className="card-title fs-6 text-center">{item.name}</h4>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div> 
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-xl">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Related Items</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    {modalItems.map((item, index) => (
                                        <div className="col-lg-2 col-md-3 col-4 align-items-center g-3" key={index} data-bs-target="#exampleModalToggle2" data-bs-toggle="modal" data-bs-dismiss="modal">
                                            <div className="card h-100" onClick={() => handleItemClick(item)}>
                                                <img className="card-img-top" src={item.image} alt={item.name} width="100%" />
                                                <div className="card-body px-0">
                                                    <h4 className="card-title fs-6 text-center">{item.name}</h4>
                                                    <h4 className="card-title fs-6 text-center">${item.price}</h4>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 row1">
                    <div className="row p-2">
                        <div className="col-12 p-5 bg-light rounded mb-3">
                            {cartItems.length === 0 ? (
                                <div className="text-center">
                                    <img src='/public/images/emptycart1.png' width={200} className="py-5" alt="Empty Cart" />
                                    <p>START ADDING PRODUCT</p>
                                </div>
                            ) : (
                                <div>
                                    <h5 className="text-center">Your Order</h5>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">Product</th>
                                                <th scope="col">Price</th>
                                                <th scope="col">Remove</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cartItems.map((item, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <img src={item.image} alt={item.name} width={50} height={30} className="me-2" />
                                                            <span>{item.name}</span>
                                                        </div>
                                                    </td>
                                                    <td>${item.totalPrice.toFixed(2)}</td>
                                                    <td>
                                                        <button
                                                            className="btn btn-sm"
                                                            onClick={() => removeFromCart(item)}
                                                        >
                                                            <i class="bi bi-trash" ></i>
                                                        </button>
                                                        <button
                                                            className="btn btn-sm"
                                                            onClick={() => handleUpdateIconClick(item)}
                                                        >
                                                            <i class="bi bi-arrow-repeat"></i>
                                                        </button>
                                                    </td>
                                                   
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <div className="mt-3">
                                        <h6>Total:  ${cartTotal()}</h6>
                                    </div>
                                    <div>
                                    <button type='button' class="btn btn-success" onClick={handlePayment}>ORDER NOW</button>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="d-flex justify-content-between">
                            <button className="btn btn-light">CUSTOMER</button>
                            <button className="btn btn-light">KITCHEN NOTE</button>
                            <button className="btn btn-light">ACTION</button>
                        </div>
                    </div>
                </div>


            </div>
            {selectedItem &&
                <FoodDetails
                    item={selectedItem}
                    combos={ComboList}
                    onClose={handleClose}
                    onUpdate={handleItemUpdate}
                />
            }
  

            {selectedItemForUpdate &&
                <FoodDetails
                    item={selectedItemForUpdate}
                    combos={ComboList}
                    onClose={() => setSelectedItemForUpdate(null)}
                    onUpdate={handleItemUpdate}
                    isUpdateMode={true}
                />
            }
        </div>
    );
}

export default Bill;