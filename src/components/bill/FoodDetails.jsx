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

    // Calculate total price based on selected size, addons, and combos
    useEffect(() => {
        const baseSizePrice = item.price * sizePriceMultipliers[selectedSize];

        // Addon price calculation (considering 'Base' and 'Extra')
        const addonsPrice = Object.entries(addonCounts).reduce((sum, [addon, multiplier]) => {
            return sum + (multiplier * ADDON_PRICE);  // Multiply by ADDON_PRICE based on the multiplier
        }, 0);

        const comboPrice = selectedCombos.reduce((sum, combo) => sum + combo.price, 0);

        setTotalPrice(baseSizePrice + addonsPrice + comboPrice);
    }, [selectedSize, addonCounts, selectedCombos, item.price]);

    // Handle size change
    const handleSizeChange = (size) => setSelectedSize(size);

    // Handle addon selection (checkbox change)
    const handleAddonCheck = (addon, isChecked) => {
        if (isChecked) {
            setSelectedAddon(addon);
        } else {
            setAddonCounts((prev) => ({ ...prev, [addon.addonname]: 0 }));
            setSelectedAddon(null);
        }
    };

    // Update the addon count (for increasing or decreasing the quantity)
    const handleAddonChange = (action) => {
        if (!selectedAddon) return;

        const addonPrice = action === 'increase' ? 2 : 1; // Extra or Base price multiplier

        setAddonCounts((prev) => {
            const newCount =
                action === 'increase'
                    ? prev[selectedAddon.addonname] + 1
                    : Math.max(0, prev[selectedAddon.addonname] - 1);
            return { ...prev, [selectedAddon.addonname]: newCount };
        });
    };

    // Handle the change in addon option (Base or Extra)
    const handleAddonOptionChange = (addonName, option) => {
        const addonPrice = option === 'Extra' ? 2 : 1; // Set multiplier for Extra vs Base
        setAddonCounts((prev) => ({
            ...prev,
            [addonName]: addonPrice,  // Store price multiplier
        }));
    };

    // Add the item to cart
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

    // Close the addon popup
    const closeAddonPopup = () => {
        setSelectedAddon(null);
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

                            <div className="text-center">
                                <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                                    {Object.keys(sizePriceMultipliers).map((size, index) => (
                                        <label key={index} className="btn btn-outline-primary" htmlFor={`btncheck-${index}`}>
                                            <input
                                                type="radio"
                                                className="btn-check"
                                                id={`btncheck-${index}`}
                                                autoComplete="off"
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
                                        <h5 className="card-title text-center">
                                            Customize Add-on: {selectedAddon.addonname}
                                        </h5>
                                        <div className="text-center">
                                            <img
                                                src={selectedAddon.image}
                                                alt={selectedAddon.addonname}
                                                className="img-fluid rounded my-3"
                                                style={{ width: "80px", height: "80px" }}
                                            />
                                        </div>

                                        <div className="addon-options d-flex justify-content-center mb-4">
                                            <div>
                                                <input
                                                    type="radio"
                                                    id={`${selectedAddon.addonname}-basic`}
                                                    name={`addon-option-${selectedAddon.addonname}`}
                                                    value="Base"
                                                    checked={addonCounts[selectedAddon.addonname] === 1}
                                                    onChange={() => handleAddonOptionChange(selectedAddon.addonname, 'Base')}
                                                />
                                                <label htmlFor={`${selectedAddon.addonname}-basic`} className="btn btn-outline-primary">
                                                    {selectedAddon.addonname} (Base)
                                                </label>
                                            </div>

                                            <div className="ms-3">
                                                <input
                                                    type="radio"
                                                    id={`${selectedAddon.addonname}-extra`}
                                                    name={`addon-option-${selectedAddon.addonname}`}
                                                    value="Extra"
                                                    checked={addonCounts[selectedAddon.addonname] === 2}
                                                    onChange={() => handleAddonOptionChange(selectedAddon.addonname, 'Extra')}
                                                />
                                                <label htmlFor={`${selectedAddon.addonname}-extra`} className="btn btn-outline-primary">
                                                    Extra {selectedAddon.addonname}
                                                </label>
                                            </div>
                                        </div>

                                        <div className="text-center mt-4">
                                            <button className="btn" onClick={closeAddonPopup}>
                                                Done
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
