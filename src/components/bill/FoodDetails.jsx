import React, { useState, useEffect, useContext } from 'react';
import './foodDetail.css';
import CartContext from '../../context/CartContext';

const FoodDetails = ({ item, combos, onClose }) => {
    if (!item) return null;

    const ADDON_PRICE = 1.5;
    const sizePriceMultipliers = { Small: 1.0, Medium: 1.2, Large: 1.5 };

    const [selectedSize, setSelectedSize] = useState('Medium');
    const [addonCounts, setAddonCounts] = useState({});
    const [selectedAddon, setSelectedAddon] = useState(null); 
    const [totalPrice, setTotalPrice] = useState(0);
    const [showCombos, setShowCombos] = useState(false);
    const [selectedCombos, setSelectedCombos] = useState([]);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        setSelectedSize('Medium');
        setAddonCounts(
            item.addons.reduce((acc, addon) => {
                acc[addon.addonname] = 0;
                return acc;
            }, {})
        );
        setTotalPrice(item.price * sizePriceMultipliers['Medium']);
    }, [item]);

    const handleSizeChange = (size) => setSelectedSize(size);

    const handleAddonCheck = (addon, isChecked) => {
        if (isChecked) {
            setSelectedAddon(addon);
        } else {
            setAddonCounts((prev) => ({ ...prev, [addon.addonname]: 0 }));
            setSelectedAddon(null);
        }
    };

    const handleAddonChange = (action) => {
        if (!selectedAddon) return;

        setAddonCounts((prev) => {
            const newCount =
                action === 'increase'
                    ? prev[selectedAddon.addonname] + 1
                    : Math.max(0, prev[selectedAddon.addonname] - 1);
            return { ...prev, [selectedAddon.addonname]: newCount };
        });

        if (action === 'remove') {
            setAddonCounts((prev) => ({ ...prev, [selectedAddon.addonname]: 0 }));
            setSelectedAddon(null); 
        }
    };

    const closeAddonPopup = () => setSelectedAddon(null);

    useEffect(() => {
        const baseSizePrice = item.price * sizePriceMultipliers[selectedSize];
        const addonsPrice = Object.entries(addonCounts).reduce((sum, [addon, count]) => {
            return sum + count * ADDON_PRICE;
        }, 0);
        const comboPrice = selectedCombos.reduce((sum, combo) => sum + combo.price, 0);
        setTotalPrice(baseSizePrice + addonsPrice + comboPrice);
    }, [selectedSize, addonCounts, selectedCombos, item.price]);

    const handleAddToCart = () => {
        const customizedItem = {
            id: item.id,
            name: item.name,
            image: item.image,
            category: item.category,
            basePrice: item.price,
            selectedSize,
            addonCounts,
            selectedCombos,
            totalPrice,
        };
        addToCart(customizedItem);
        onClose();
    };

    return (
        <div className="food-detail bg-dark">
            <div className="modal fade show d-block sec-modal">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{item.name}</h5>
                        </div>
                        <div className="modal-body">
                            <img src={item.image} alt={item.name} width={100} height={70} className="mb-3 rounded d-flex mx-auto" />
                            <p className="mb-0"><strong>Category:</strong> {item.category}</p>
                            <p><strong>Total Price:</strong> ${totalPrice.toFixed(2)}</p>

                            <div>
                                <strong>Size:</strong>
                                <div className="size-options">
                                    {Object.keys(sizePriceMultipliers).map((size) => (
                                        <label key={size} className="me-3">
                                            <input
                                                type="radio"
                                                name="size"
                                                value={size}
                                                checked={selectedSize === size}
                                                onChange={() => handleSizeChange(size)}
                                            />
                                            {size}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-3">
                                <strong>Add-ons:</strong>
                                <ul className="addons-list d-flex justify-content-evenly">
                                {item.addons.map((addon, index) => (
        <li key={index} className="addon-item">
            <input
                type="checkbox"
                onChange={(e) => handleAddonCheck(addon, e.target.checked)}
            />
            <img
                src={addon.image}
                alt={addon.addonname}
                width={20}
                height={20}
                className="mx-2"
            />
            <span className="addon-name">{addon.addonname}</span>
        </li>
    ))}
                                </ul>
                            </div>

                            {selectedAddon && (
    <div className="addon-popup card shadow">
        <div className="card-body">
            <h5 className="card-title text-center">Customize Add-on: {selectedAddon.addonname}</h5>
            <div className="text-center">
                <img
                    src={selectedAddon.image}
                    alt={selectedAddon.addonname}
                    className="img-fluid rounded my-3"
                    style={{ width: "80px", height: "80px" }}
                />
            </div>
            <div className="addon-controls d-flex justify-content-center align-items-center">
                <button
                    className="btn btn-outline-secondary mx-2"
                    onClick={() => handleAddonChange('decrease')}
                >
                    -
                </button>
                <span className="mx-3 fs-5">{addonCounts[selectedAddon.addonname]}</span>
                <button
                    className="btn btn-outline-secondary mx-2"
                    onClick={() => handleAddonChange('increase')}
                >
                    +
                </button>
            </div>
            <div className="text-center mt-4">
                <button className="btn btn-danger" onClick={closeAddonPopup}>
                    Close
                </button>
            </div>
        </div>
    </div>
)}

                            <hr />
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={showCombos}
                                    onChange={() => setShowCombos(!showCombos)}
                                />
                                <label className="form-check-label">Show Combos</label>
                            </div>

                            {showCombos && (
                                <div className="combo-list mt-3">
                                    <h5>Combo Options:</h5>
                                    <div className="row">
                                        {combos.map((combo, index) => (
                                            <div
                                                key={index}
                                                className={`col-lg-3 col-md-4 col-6 text-center mb-3 combo-option ${selectedCombos.some((selected) => selected.id === combo.id) ? 'selected' : ''}`}
                                                onClick={() => handleAddonCheck(combo)}
                                            >
                                                <img src={combo.image} alt={combo.name} width={100} height={70} className="rounded mb-2" />
                                                <p>{combo.name}</p>
                                                <p>${combo.price.toFixed(2)}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onClose}>
                                Close
                            </button>
                            <button type="button" className="btn btn-primary" onClick={handleAddToCart}>
                                Add To Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodDetails;
