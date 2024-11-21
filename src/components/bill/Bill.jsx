import React, { useContext, useState } from 'react';
import './bill.css';
import FoodDetails from './FoodDetails';
import CartContext from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

const foodList = [
    { name: 'Burger', category: 'Non-Vegetarian', image: 'images/Classic Cheeseburger.jpg', price: 200, addons: ['Extra Cheese', 'Bacon', 'Onion Rings'], type: 'food' },
    { name: 'Cola', category: 'Carbonated', image: 'images/Cola.jpeg', price: 50, addons: ['Lemon Slice', 'Ice'], type: 'drink' },
    { name: 'Pizza', category: 'Non-Vegetarian', image: 'images/BBQ_Chicken_Pizza-removebg-preview.png', price: 320, addons: ['Onions', 'Jalapeños', 'Extra BBQ Sauce'], type: 'food' },
    { name: 'Sandwich', category: 'Vegetarian', image: 'images/Grilled_Cheese_Sandwich-removebg-preview.png', price: 220, addons: ['Tomato', 'Basil', 'Extra Cheese'], type: 'food' },
    { name: 'Lemonade', category: 'Non-Carbonated', image: 'images/Lemonade.jpg', price: 60, addons: ['Mint', 'Sugar'], type: 'drink' },
    { name: 'Mango Lassi', category: 'Non-Carbonated', image: 'images/Mango Lassi.avif', price: 80, addons: ['Cardamom', 'Sugar'], type: 'drink' },
    { name: 'Biryani', category: 'Non-Vegetarian', image: 'images/hyderabadi biriyani.png', price: 250, addons: ['Raita', 'Salad', 'Biryani Masala'], type: 'food' },
    { name: 'Biryani', category: 'Non-Vegetarian', image: 'images/dum biriyani.png', price: 320, addons: ['Raita', 'Chutney'], type: 'food' },
    { name: 'Juice', category: 'Tropical', image: 'images/mango-juice.png', price: 140, addons: ['Chili Powder', 'Salt'], type: 'drink' },
    { name: 'Fried Rice', category: 'Vegetarian', image: 'images/egg fried rice.png', price: 240, addons: ['Green Peppers', 'Soy Sauce', 'Chili Flakes'], type: 'food' },
];

const BurgerList = [
    {
        name: 'Classic Cheeseburger', category: 'Non-Vegetarian',
        image: 'images/Classic Cheeseburger1.jpg',
        price: 200,
        addons: [{ addonname: 'Cheese', image: 'images/cheese.webp' },
        { addonname: 'Bacon', image: 'images/Bacon.jpg' },
        { addonname: 'Onion Rings', image: 'images/onion rings.jpg' }],
        type: 'food'
    },
    {
        name: 'Bacon BBQ Burger', category: 'Non-Vegetarian',
        image: 'images/bbq burger.png', price: 250,
        addons: [{ addonname: 'Bacon', image: 'images/Bacon.jpg' },
        { addonname: 'Onion Rings', image: 'images/onion rings.jpg' },
        { addonname: 'BBQ Sauce', image: 'images/bbq-sauce-5sm-3.jpg' }],
        type: 'food'
    },
    { name: 'Spicy Chicken Burger', category: 'Non-Vegetarian', image: 'images/Spicy Chicken Burger.jpg', price: 180, addons: [{ addonname: 'Cheese', image: 'images/cheese.webp' }, { addonname: 'Jalapeños', image: 'images/Pickled-Jalapenos-above-500x500.webp' }, { addonname: 'Spicy Sauce', image: 'images/spicy sauce.jpg' }], type: 'food' },
    { name: 'Mushroom Swiss Burger', category: 'Non-Vegetarian', image: 'images/Mushroom Swiss Burger.jpg', price: 220, addons: [{ addonname: 'Cheese', image: 'images/cheese.webp' }, { addonname: 'Grilled Mushrooms', image: 'images/Grilled Mushrooms.jpg' }, { addonname: 'Onion Rings', image: 'images/Onion Rings.webp' }], type: 'food' },
    { name: 'Double Beef Burger', category: 'Non-Vegetarian', image: 'images/Double Beef Burger.webp', price: 300, addons: [{ addonname: 'Extra Patty', image: 'images/Extra Patty.webp' }, { addonname: 'Bacon', image: 'images/Bacon.jpg' }, { addonname: 'Cheese', image: 'images/cheese.webp' }], type: 'food' },
    { name: 'Veggie Delight Burger', category: 'Vegetarian', image: 'images/Veggie Delight Burger.jpg', price: 150, addons: [{ addonname: 'Cheese', image: 'images/cheese.webp' }, { addonname: 'Grilled Mushrooms', image: 'images/Grilled Mushrooms.jpg' }, { addonname: 'Avocado', image: 'images/Avocado.webp' }], type: 'food' },
    { name: 'Black Bean Burger', category: 'Vegetarian', image: 'images/Black Bean Burger.jpg', price: 170, addons: [{ addonname: 'Cheese', image: 'images/cheese.webp' }, { addonname: 'Guacamole', image: 'images/Guacamole.jpg' }, { addonname: 'Lettuce', image: 'images/Lettuce.webp' }], type: 'food' },
    { name: 'Falafel Burger', category: 'Vegetarian', image: 'images/Falafel Burger.avif', price: 160, addons: [{ addonname: 'Tahini Sauce', image: 'images/Tahini Sauce.jpg' }, { addonname: 'Falafel', image: 'images/Falafel.jpg' }, { addonname: 'Pickles', image: 'images/Pickles.jpg' }], type: 'food' },
    { name: 'Fish Fillet Burger', category: 'Non-Vegetarian', image: 'images/Fish Fillet Burger.webp', price: 210, addons: [{ addonname: 'Tartar Sauce', image: 'images/Tartar Sauce.jpg' }, { addonname: 'Cheese', image: 'images/cheese.webp' }, { addonname: 'Lettuce', image: 'images/Lettuce.webp' }], type: 'food' },
    { name: 'Grilled Chicken Burger', category: 'Non-Vegetarian', image: 'images/Grilled Chicken Burger.webp', price: 190, addons: [{ addonname: 'Cheese', image: 'images/cheese.webp' }, { addonname: 'Bacon', image: 'images/Bacon.jpg' }, { addonname: 'Mayo', image: 'images/Mayo.jpg' }], type: 'food' },
    { name: 'Halloumi Burger', category: 'Vegetarian', image: 'images/Halloumi Burger.jpg', price: 200, addons: [{ addonname: 'Grilled Halloumi', image: 'images/Grilled Halloumi.jpg' }, { addonname: 'Lettuce', image: 'images/Lettuce.webp' }, { addonname: 'Avocado', image: 'images/Avocado.webp' }], type: 'food' },
    { name: 'Buffalo Chicken Burger', category: 'Non-Vegetarian', image: 'images/Buffalo Chicken Burger.jpg', price: 220, addons: [{ addonname: 'Buffalo Sauce', image: 'images/Buffalo Sauce.jpg' }, { addonname: 'Blue Cheese', image: 'images/Blue Cheese.jpg' }, { addonname: 'Onion Rings', image: 'images/Onion Rings.webp' }], type: 'food' }
];

const pizzaList = [
    { name: 'Margherita Pizza', category: 'Vegetarian', image: 'images/Margherita Pizza.jpg', price: 250, addons: ['Extra Cheese', 'Olives', 'Basil'] },
    { name: 'Pepperoni Pizza', category: 'Non-Vegetarian', image: 'images/Pepperoni Pizza.jpg', price: 300, addons: ['Extra Cheese', 'Chili Flakes', 'Garlic Sauce'] },
    { name: 'BBQ Chicken Pizza', category: 'Non-Vegetarian', image: 'images/BBQ Chicken Pizza.jpg', price: 320, addons: ['Onions', 'Jalapeños', 'Extra BBQ Sauce'] },
    { name: 'Veggie Supreme Pizza', category: 'Vegetarian', image: 'images/Veggie Supreme Pizza.jpeg', price: 280, addons: ['Mushrooms', 'Bell Peppers', 'Spinach'] },
    { name: 'Hawaiian Pizza', category: 'Non-Vegetarian', image: 'images/Hawaiian Pizza.jpg', price: 350, addons: ['Extra Pineapple', 'Ham', 'Cheese Burst'] },
    { name: 'Four Cheese Pizza', category: 'Vegetarian', image: 'images/Four Cheese Pizza.jpeg', price: 330, addons: ['Extra Cheese', 'Basil', 'Olives'] },
    { name: 'Meat Lovers Pizza', category: 'Non-Vegetarian', image: 'images/Meat Lovers Pizza.jpeg', price: 400, addons: ['Bacon', 'Sausage', 'Extra Cheese'] },
    { name: 'Pesto Veggie Pizza', category: 'Vegetarian', image: 'images/Pesto Veggie Pizza.jpg', price: 290, addons: ['Pesto Sauce', 'Arugula', 'Olives'] },
];
const ComboList = [
    { name: 'Soft Drink', price: 50, image: 'images/softdrinks.jpg' },
    { name: 'French Fries', price: 80, image: 'images/french fries.avif' },
    { name: 'Onion Rings', price: 70, image: 'images/onion rings.jpg' },
    { name: 'Side Salad', price: 60, image: 'images/side salad.webp' },
];

function Bill() {
    const [menuItems, setMenuItems] = useState([...foodList, ...BurgerList, ...pizzaList]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedItemForUpdate, setSelectedItemForUpdate] = useState(null);
    const { cartItems, addToCart, removeFromCart, updateCartItem, selectedCombos } = useContext(CartContext);

    const handleFilter = (category) => {
        switch (category) {
            case 'burger':
                setMenuItems(BurgerList);
                break;
            case 'pizza':
                setMenuItems(pizzaList);
                break;
            case 'drink':
                setMenuItems([...foodList, ...BurgerList, ...pizzaList].filter((item) => item.type === 'drink'));
                break;
            case 'food':
                setMenuItems([...foodList, ...BurgerList, ...pizzaList].filter((item) => item.type === 'food'));
                break;
            default:
                setMenuItems([...foodList, ...BurgerList, ...pizzaList]);
        }
        setSelectedCategory(category);
    };

    const handleItemClick = (item) => setSelectedItem(item);

    const handleClose = () => setSelectedItem(null);

    const handleItemUpdate = (updatedItem) => {
        updateCartItem(updatedItem);
        setSelectedItemForUpdate(null);
    };

    const navigate = useNavigate();
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
                <div className="col-lg-7 row2">
                    <div className="row">
                        {menuItems.map((item, index) => (
                            <div className="col-lg-3 col-md-4 col-6 align-items-center g-3" key={index}>
                                <div className="card" onClick={() => handleItemClick(item)}>
                                    <img className="card-img-top" src={item.image} alt={item.name} width={100} height={100} />
                                    <div className="card-body px-0 category-name">
                                        <h4 className="card-title fs-6 text-center">{item.name}</h4>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-lg-1">
                    <div className="row p-2">
                        <div className="col-lg-12 mb-2">
                            <button
                                className="text-dark w-100 rounded d-flex align-items-center drink-btn justify-content-center"
                                onClick={() => handleFilter('drink')}
                            >
                                <img src="/images/Food.png" width={50} alt="Drinks" />
                                Drinks
                            </button>
                        </div>
                        <div className="col-lg-12 mb-2">
                            <button
                                className="w-100 rounded d-flex align-items-center food-btn justify-content-center"
                                onClick={() => handleFilter('food')}
                            >
                                <img src="/images/Drinks.png" width={50} alt="Food" />
                                Food
                            </button>
                        </div>
                        <div className="col-lg-12 mb-2">
                            <button
                                className="text-dark w-100 rounded d-flex align-items-center drink-btn justify-content-center"
                                onClick={() => handleFilter('burger')}
                            >
                                <img src="/images/Food.png" width={50} alt="Burger" />
                                Burger
                            </button>
                        </div>
                        <div className="col-lg-12 mb-2">
                            <button
                                className="text-dark w-100 rounded d-flex align-items-center food-btn justify-content-center"
                                onClick={() => handleFilter('pizza')}
                            >
                                <img src="/images/pizza_logo-removebg-preview.png" width={50} alt="Pizza" />
                                Pizza
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 row1">
                    <div className="row p-2">
                        <div className="col-12 p-5 bg-light rounded mb-3">
                            {cartItems.length === 0 ? (
                                <div className="text-center">
                                    <img src="images/emptycart1.png" width={200} className="py-5" alt="Empty Cart" />
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
                                                        <div className='d-flex align-items-center'>
                                                            {item.addonCounts && (
                                                                <div className="addons">
                                                                    <strong>Add-ons:</strong>
                                                                    <ul>
                                                                        {Object.keys(item.addonCounts).map((addonName) => (
                                                                            <li key={addonName}>
                                                                                {addonName} (x{item.addonCounts[addonName]})
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            )}
                                                            {item.selectedCombos.length > 0 && (
                                                                <div className="combos">
                                                                    <strong>Combos:</strong>
                                                                    <ul>
                                                                        {item.selectedCombos.map((combo) => (
                                                                            <li key={combo.id}>
                                                                                {combo.name} - ${combo.price.toFixed(2)}
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td>${item.totalPrice.toFixed(2)}</td>
                                                    <td> 
                                                        <button
                                                            className="btn btn-sm"
                                                            onClick={() => removeFromCart(item)}
                                                        >
                                                            <i className="bi bi-trash"></i>
                                                        </button>
                                                        <button
                                                            className="btn btn-sm"
                                                            onClick={() => setSelectedItemForUpdate(item)}
                                                        >
                                                            <i className="bi bi-arrow-repeat"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <div className="mt-3">
                                        <h6>Total: ${cartTotal()}</h6>
                                    </div>
                                    <div>
                                        <button type="button" className="btn btn-success" onClick={handlePayment}>
                                            ORDER NOW
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {selectedItem && (
                <FoodDetails
                    item={selectedItem}
                    combos={ComboList}
                    onClose={() => setSelectedItem(null)}
                    onUpdate={handleItemUpdate}
                />
            )}
            {selectedItemForUpdate && (
                <FoodDetails
                    item={selectedItemForUpdate}
                    combos={ComboList}
                    onClose={() => setSelectedItemForUpdate(null)}
                    onUpdate={handleItemUpdate}
                    isUpdateMode={true}
                />
            )}
        </div>
    )
}

export default Bill;