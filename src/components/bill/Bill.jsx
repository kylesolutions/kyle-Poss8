import React, { useContext, useEffect, useState } from 'react';
import './bill.css';
import FoodDetails from './FoodDetails';
import CartContext from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

function Bill() {
    const [menuItems, setMenuItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedItemForUpdate, setSelectedItemForUpdate] = useState(null);
    const [categories, setCategories] = useState([]);
    const { cartItems, addToCart, removeFromCart, updateCartItem } = useContext(CartContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch('/api/method/intern.intern.kyle_api.Kyle_items.get_kyle_item_details', {
                    method: 'GET',
                    headers: {
                        'Authorization': 'token 8531904bdbbf00c:bf68905e1a692f5',
                        'Content-Type': 'application/json',
                    },
                });


                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }


                const data = await response.json();
                console.log('API Response:', data);


                if (data && Array.isArray(data.message)) {
                    const baseUrl = 'http://109.199.100.136:8001/';
                    const formattedItems = data.message.map((item) => ({
                        name: item.item_name,
                        category: item.item_group,
                        image: item.image ? `${baseUrl}${item.image}` : 'default-image.jpg',
                        price: item.price || 0,
                        addons: item.addons || [],
                        combos: item.combos || [],
                    }));
                    setMenuItems(formattedItems);
                    setFilteredItems(formattedItems);

                    const uniqueCategories = [
                        ...new Set(formattedItems.map((item) => item.category.toLowerCase())),
                    ];
                    setCategories(uniqueCategories);

                } else {
                    throw new Error('Invalid data structure or missing message array');
                }
            } catch (error) {
                console.error('Error fetching items:', error);

            }
        };

        fetchItems();
    }, []);

    const handleFilter = (category) => {
        const filtered = menuItems.filter((item) =>
            item.category.toLowerCase() === category.toLowerCase()
        );
        setFilteredItems(filtered);
        setSelectedCategory(category);
    };

    const handleItemClick = (item) => setSelectedItem(item);

    const handleItemUpdate = (updatedItem) => {
        updateCartItem(updatedItem);
        setSelectedItemForUpdate(null);
    };

    const cartTotal = () => {
        return cartItems.reduce((sum, item) => {
            const addonsTotal = item.addons
                ? item.addons.reduce((addonSum, addon) => addonSum + addon.price * addon.count, 0)
                : 0;
            return sum + item.totalPrice + addonsTotal;
        }, 0).toFixed(2);
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
                        {filteredItems.map((item, index) => (
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
                        {categories.map((category, index) => (
                            <div key={index} className="col-lg-12 mb-2">
                                <button
                                    className={`text-dark w-100 rounded d-flex align-items-center justify-content-center ${selectedCategory === category ? 'active-category' : ''
                                        }`}
                                    onClick={() => handleFilter(category)}
                                >
                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                </button>
                            </div>
                        ))}
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
                                                    <div>
                                                        <img
                                                            src={item.image}
                                                            alt={item.name}
                                                            className="rounded me-3"
                                                            style={{ width: '70px', height: '50px', objectFit: 'cover' }}
                                                        />
                                                        <div className="flex-grow-1">
                                                            <h6 className="card-title mb-1">{item.name}</h6>
                                                            {item.addons &&
                                                                item.addons.map((addon, addonIndex) => (
                                                                    <div className="text-muted small mb-1" key={addonIndex}>
                                                                        {addon.name} (x{addon.count}) - ${addon.price.toFixed(2)}
                                                                    </div>
                                                                ))}
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
                    combos={menuItems.filter((combo) => combo.type === 'combo')}
                    onClose={() => setSelectedItem(null)}
                    onUpdate={handleItemUpdate}
                />
            )}
        </div>
    );
}

export default Bill;
