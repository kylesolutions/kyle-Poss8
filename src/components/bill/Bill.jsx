import React, { useContext, useState } from 'react';
import './bill.css';
import FoodDetails from './FoodDetails';
import CartContext from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

const foodList = [
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
    { name: 'Classic Cheese', category: 'Non-Vegetarian', image: '/images/classic cheese.webp', price: 200, addons: [{ addonname: 'Cheese', image: 'images/cheese.webp' }, { addonname: 'Bacon', image: 'images/Bacon.jpg' }, { addonname: 'Onion Rings', image: 'images/onion rings.jpg' }], type: 'food' },
    { name: 'Bacon BBQ', category: 'Non-Vegetarian', image: '/images/bacon bbq1.avif', price: 250, addons: [{ addonname: 'Bacon', image: 'images/Bacon.jpg' }, { addonname: 'Onion Rings', image: 'images/onion rings.jpg' }, { addonname: 'BBQ Sauce', image: 'images/bbq-sauce-5sm-3.jpg' }], type: 'food' },
    { name: 'Spicy Chicken', category: 'Non-Vegetarian', image: '/images/Spicy Chicken.webp', price: 180, addons: [{ addonname: 'Cheese', image: 'images/cheese.webp' }, { addonname: 'Jalapeños', image: 'images/Pickled-Jalapenos-above-500x500.webp' }, { addonname: 'Spicy Sauce', image: 'images/spicy sauce.jpg' }], type: 'food' },
    { name: 'Mushroom Swiss', category: 'Non-Vegetarian', image: '/images/Mushroom Swiss.jpg', price: 220, addons: [{ addonname: 'Cheese', image: 'images/cheese.webp' }, { addonname: 'Grilled Mushrooms', image: 'images/Grilled Mushrooms.jpg' }, { addonname: 'Onion Rings', image: 'images/Onion Rings.webp' }], type: 'food' },
    { name: 'Double Beef', category: 'Non-Vegetarian', image: '/images/Double Beef.jpg', price: 300, addons: [{ addonname: 'Extra Patty', image: 'images/Extra Patty.webp' }, { addonname: 'Bacon', image: 'images/Bacon.jpg' }, { addonname: 'Cheese', image: 'images/cheese.webp' }], type: 'food' },
    { name: 'Veggie Delight', category: 'Vegetarian', image: '/images/Veggie Delight.jpg', price: 150, addons: [{ addonname: 'Cheese', image: 'images/cheese.webp' }, { addonname: 'Grilled Mushrooms', image: 'images/Grilled Mushrooms.jpg' }, { addonname: 'Avocado', image: 'images/Avocado.webp' }], type: 'food' },
    { name: 'Black Bean', category: 'Vegetarian', image: '/images/Black Bean.jpg', price: 170, addons: [{ addonname: 'Cheese', image: 'images/cheese.webp' }, { addonname: 'Guacamole', image: 'images/Guacamole.jpg' }, { addonname: 'Lettuce', image: 'images/Lettuce.webp' }], type: 'food' },
    { name: 'Falafel', category: 'Vegetarian', image: 'images/Falafel Burger.avif', price: 160, addons: [{ addonname: 'Tahini Sauce', image: 'images/Tahini Sauce.jpg' }, { addonname: 'Falafel', image: 'images/Falafel.jpg' }, { addonname: 'Pickles', image: 'images/Pickles.jpg' }], type: 'food' },
    { name: 'Fish Fillet', category: 'Non-Vegetarian', image: '/images/Fish Fillet.jpg', price: 210, addons: [{ addonname: 'Tartar Sauce', image: 'images/Tartar Sauce.jpg' }, { addonname: 'Cheese', image: 'images/cheese.webp' }, { addonname: 'Lettuce', image: 'images/Lettuce.webp' }], type: 'food' },
    { name: 'Grilled Chicken', category: 'Non-Vegetarian', image: '/images/Grilled Chicken.jpeg', price: 190, addons: [{ addonname: 'Cheese', image: 'images/cheese.webp' }, { addonname: 'Bacon', image: 'images/Bacon.jpg' }, { addonname: 'Mayo', image: 'images/Mayo.jpg' }], type: 'food' },
    { name: 'Halloumi', category: 'Vegetarian', image: '/images/Halloumi.jpg', price: 200, addons: [{ addonname: 'Grilled Halloumi', image: 'images/Grilled Halloumi.jpg' }, { addonname: 'Lettuce', image: 'images/Lettuce.webp' }, { addonname: 'Avocado', image: 'images/Avocado.webp' }], type: 'food' },
    { name: 'Buffalo Chicken', category: 'Non-Vegetarian', image: ' /images/Buffalo Chicken.jpg', price: 220, addons: [{ addonname: 'Buffalo Sauce', image: 'images/Buffalo Sauce.jpg' }, { addonname: 'Blue Cheese', image: 'images/Blue Cheese.jpg' }, { addonname: 'Onion Rings', image: 'images/Onion Rings.webp' }], type: 'food' }
];

const pizzaList = [
    { name: 'Margherita', category: 'Vegetarian', image: '/images/Margherita.avif', price: 250, addons: ['Extra Cheese', 'Olives', 'Basil'] },
    { name: 'Pepperoni', category: 'Non-Vegetarian', image: '/images/Pepperoni.jpg', price: 300, addons: ['Extra Cheese', 'Chili Flakes', 'Garlic Sauce'] },
    { name: 'BBQ Chicken', category: 'Non-Vegetarian', image: '/images/BBQ Chicken.webp', price: 320, addons: ['Onions', 'Jalapeños', 'Extra BBQ Sauce'] },
    { name: 'Veggie Supreme', category: 'Vegetarian', image: '/images/Veggie Supreme.webp', price: 280, addons: ['Mushrooms', 'Bell Peppers', 'Spinach'] },
    { name: 'Hawaiian', category: 'Non-Vegetarian', image: '/images/Hawaiian.avif', price: 350, addons: ['Extra Pineapple', 'Ham', 'Cheese Burst'] },
    { name: 'Four Cheese', category: 'Vegetarian', image: '/images/Four Cheese.webp', price: 330, addons: ['Extra Cheese', 'Basil', 'Olives'] },
    { name: 'Meat Lovers', category: 'Non-Vegetarian', image: '/images/Meat Lovers.jpg', price: 400, addons: ['Bacon', 'Sausage', 'Extra Cheese'] },
    { name: 'Pesto Veggie', category: 'Vegetarian', image: '/images/Pesto Veggie.jpg', price: 290, addons: ['Pesto Sauce', 'Arugula', 'Olives'] },
];
const ComboList = [
    {
        name: 'Soft Drink',
        price: 50,
        image: 'images/softdrinks.jpg',
        variants: ["sprite", "mirenda", "7up", "mountainDew"],
        variantPrices: { sprite: 50, mirenda: 55, '7up': 60, mountainDew: 65 }
    },
    {
        name: 'French Fries',
        price: 80,
        image: 'images/french fries.avif',
        variants: ["Spicy", "Non-Spicy", "Cheesy"],
        variantPrices: { Spicy: 80, 'Non-Spicy': 75, Cheesy: 90 }
    },
    { name: 'Onion Rings', price: 70, image: 'images/onion rings.jpg' },
    { name: 'Side Salad', price: 60, image: 'images/side salad.webp' },
];

const ADDON_PRICE = 1.5;

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
                            <div className="col-lg-3 col-md-4 col-6 align-items-center my-2" key={index}>
                                <div className="card" onClick={() => handleItemClick(item)}>
                                    <img className="card-img-top" src={item.image} alt={item.name} width={100} height={100} />
                                    <div className="card-body p-2 mb-0 category-name">
                                        <h4 className="card-title fs-6 text-center mb-0">{item.name}</h4>
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
                                <img src="/images/Drinks.png" width={50} alt="Drinks" />
                                Drinks
                            </button>
                        </div>
                        <div className="col-lg-12 mb-2">
                            <button
                                className="w-100 rounded d-flex align-items-center food-btn justify-content-center"
                                onClick={() => handleFilter('food')}
                            >
                                <img src="/images/foodbg 1.png" width={50} alt="Food" />
                                Food
                            </button>
                        </div>
                        <div className="col-lg-12 mb-2">
                            <button
                                className="text-dark w-100 rounded d-flex align-items-center drink-btn justify-content-center"
                                onClick={() => handleFilter('burger')}
                            >
                                <img src="/images/Food 1.png" width={50} alt="Burger" />
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
                                    <p>START ADDING PRODUCTS</p>
                                </div>
                            ) : (
                                <div>
                                    <h5 className="text-center mb-4">Your Order</h5>
                                    <div className="d-flex flex-column gap-3">

                                        {cartItems.map((item, index) => (
                                            <div key={index} className="card shadow-sm">
                                                <div className="card-body d-flex align-items-start">
                                                    <div><img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="rounded me-3"
                                                        style={{ width: '70px', height: '50px', objectFit: 'cover' }}
                                                    />


                                                        <div className="flex-grow-1">
                                                            <h6 className="card-title mb-1">{item.name}</h6>
                                                            {item.addonCounts &&
                                                                Object.values(item.addonCounts).some((count) => count > 0) && (
                                                                    <div className="text-muted small mb-1">
                                                                        <strong>Add-ons:</strong>
                                                                        <ul className="mb-0 ps-3">
                                                                            {Object.keys(item.addonCounts).map(
                                                                                (addonName) =>
                                                                                    item.addonCounts[addonName] > 0 && (
                                                                                        <li key={addonName}>
                                                                                            {addonName} (x{item.addonCounts[addonName]}) - $
                                                                                            {(item.addonCounts[addonName] * ADDON_PRICE).toFixed(2)}
                                                                                        </li>
                                                                                    )
                                                                            )}
                                                                        </ul>
                                                                    </div>
                                                                )}


                                                            {item.selectedCombos.length > 0 && (
                                                                <div className="text-muted small mb-1">
                                                                    <strong>Combos:</strong>
                                                                    <ul className="mb-0 ps-3">
                                                                        {item.selectedCombos.map((combo) => (
                                                                            <li key={combo.id}>
                                                                                {combo.name} - {combo.variant} - ${combo.price.toFixed(2)}
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            )}

                                                        </div>
                                                    </div>
                                                    <div>
                                                        <p className="mb-0 fw-bold">Price: ${item.totalPrice.toFixed(2)}</p>
                                                        <div className="ms-3">
                                                            <button
                                                                className="btn btn-danger btn-sm mb-2"
                                                                onClick={() => removeFromCart(item)}
                                                                title="Remove Item"
                                                            >
                                                                <i className="bi bi-trash"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>


                                    <div className="mt-4 text-center">
                                        <h6>Total: ${cartTotal()}</h6>
                                        <button type="button" className="btn btn-success mt-2" onClick={handlePayment}>
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