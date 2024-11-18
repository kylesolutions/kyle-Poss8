import React, { useState, useEffect, useContext } from 'react';
import './foodDetail.css';
import CartContext from '../../context/CartContext';

const SoftDrinkList = [
    { name: 'sprite', price: 60 },
    { name: 'pepsi', price: 50 },
    { name: 'mountaindew', price: 80 },
    { name: 'mirenda', price: 40 },
];
function FoodDetails({ item, combos, onClose }) {
    if (!item) return null;

    const ADDON_PRICE = 1.5; 
    const sizePriceMultipliers = { Small: 1.0, Medium: 1.2, Large: 1.5 };
    const [selectedSize, setSelectedSize] = useState('Medium');
    const [addonCounts, setAddonCounts] = useState({});
    const [selectedSoftDrink, setSelectedSoftDrink] = useState(null); 
    const [totalPrice, setTotalPrice] = useState(item.price * sizePriceMultipliers['Medium']);
    const [showCombos, setShowCombos] = useState(false);
    const [selectedCombos, setSelectedCombos] = useState([]); 
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        setSelectedSize('Medium');
        setAddonCounts(item.addons.reduce((acc, addon) => {
            acc[addon] = 0;
            return acc;
        }, {}));
        setTotalPrice(item.price * sizePriceMultipliers['Medium']);
        setSelectedSoftDrink(null);
        setSelectedCombos([]); 
    }, [item]);

    const handleSizeChange = (size) => {
        setSelectedSize(size);
    };

    const handleAddonChange = (addon, action) => {
        setAddonCounts((prev) => {
            let newCount = prev[addon];
            if (action === 'increase') newCount += 1;
            else if (action === 'decrease') newCount = Math.max(0, newCount - 1);
            else if (action === 'remove') newCount = 0;
            return { ...prev, [addon]: newCount };
        });
        if (addon.toLowerCase() === "soft drink" && action === "remove") {
            setSelectedSoftDrink(null);
          }
    };
   
    const handleSoftDrinkSelect = (drink) => {
        setSelectedSoftDrink(drink.name);
    };

    const handleComboSelect = (combo) => {
        setSelectedCombos((prevCombos) => {
            const isSelected = prevCombos.some((selected) => selected.id === combo.id);
            if (isSelected) {
                return prevCombos.filter((selected) => selected.id !== combo.id);
            } else {   
                return [...prevCombos, combo];
            }
        });
    };

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
            selectedSoftDrink,  
        };

        addToCart(customizedItem);
        onClose();
    };

    useEffect(() => {
        const baseSizePrice = item.price * sizePriceMultipliers[selectedSize];
        const addonsPrice = Object.entries(addonCounts).reduce((sum, [addon, count]) => {
          if (addon.toLowerCase() === "soft drink" && count > 0 && selectedSoftDrink) {
            return sum + count * selectedSoftDrink.price;
          }
          return sum + count * ADDON_PRICE;
        }, 0);
        const comboPrice = selectedCombos.reduce((sum, combo) => sum + combo.price, 0);
        setTotalPrice(baseSizePrice + addonsPrice + comboPrice);
      }, [selectedSize, addonCounts, selectedCombos, item.price, selectedSoftDrink]);
  

    
    return (
        <div className="food-detail bg-dark">
            <div className="modal fade show d-block sec-modal" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabIndex="-1">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{item.name}</h5>
                        </div>
                        <div className="modal-body">
                            <img src={item.image} alt={item.name} width={100} height={70} className="mb-3 rounded" />
                            <p><strong>Category:</strong> {item.category}</p>

                            {selectedCombos.length > 0 && (
                                <div className="selected-combos mb-3">
                                    <h6>Selected Combos:</h6>
                                    {selectedCombos.map((combo, index) => (
                                        <div key={index} className="d-flex align-items-center mb-2">
                                            <img src={combo.image} alt={combo.name} width={50} height={35} className="rounded me-2" />
                                            <p>{combo.name} - ${combo.price.toFixed(2)}</p>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <p><strong>Price:</strong> ${totalPrice.toFixed(2)}</p>

                            <div className="mb-3">
                                <strong>Size:</strong>
                                <div className="mydict">
                                    <div>
                                        {Object.keys(sizePriceMultipliers).map((size) => (
                                            <label key={size}>
                                                <input
                                                    type="radio"
                                                    name="size"
                                                    value={size}
                                                    checked={selectedSize === size}
                                                    onChange={() => handleSizeChange(size)}
                                                />
                                                <span>{size.charAt(0)}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="mb-3">
                                <strong>Add-ons:</strong>
                                <ul>
                                    {item.addons.map((addon, index) => (
                                        <li key={index} className="addon-item">
                                            <div className="addon-details">
                                                <span className="addon-name">{addon}</span>
                                                <div className="addon-controls">
                                                    <button
                                                        type="button"
                                                        className="btn"
                                                        onClick={() => handleAddonChange(addon, 'decrease')}
                                                    >
                                                        -
                                                    </button>
                                                    <span className="addon-count">{addonCounts[addon]}</span>
                                                    <button
                                                        type="button"
                                                        className="btn"
                                                        onClick={() => handleAddonChange(addon, 'increase')}
                                                    >
                                                        +
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="btn cross-icon"
                                                        onClick={() => handleAddonChange(addon, 'remove')}
                                                    >
                                                        <i class="bi bi-x-circle"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <hr />
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="flexCheckDefault"
                                    onChange={() => setShowCombos(!showCombos)}
                                />
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    COMBOS
                                </label>
                            </div>
                            {showCombos && (
                                <div className="combo-list mt-3">
                                    <h5>Combo Options:</h5>
                                    <div className="row">
                                        {combos.map((combo, index) => (
                                            <div
                                                className="col-lg-3 col-md-4 col-6 text-center mb-3 combo-option"
                                                key={index}
                                                onClick={() => handleComboSelect(combo)}
                                                style={{
                                                    cursor: 'pointer',
                                                    backgroundColor: selectedCombos.some((selected) => selected.id === combo.id),
                                                }}
                                            >
                                                <img src={combo.image} alt={combo.name} width={100} height={70} className="rounded mb-2" />
                                                <p className="combo-name">{combo.name}</p>
                                                <p className="combo-price">${combo.price}</p>
                                                
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
                            <button type='button' className="btn btn-primary" onClick={handleAddToCart}>Add To Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FoodDetails;
