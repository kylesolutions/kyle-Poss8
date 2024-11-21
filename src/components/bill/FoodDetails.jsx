import React, { useState, useEffect, useContext } from 'react';
import './foodDetail.css';
import CartContext from '../../context/CartContext';

const FoodDetails = ({ item, combos, onClose }) => {
    if (!item) return null;

    const ADDON_PRICE = 1.5;
    const sizePriceMultipliers = { S: 1.0, M: 1.2, L: 1.5 };

    const [selectedSize, setSelectedSize] = useState('M');
    const [comboSizes, setComboSizes] = useState({});
    const [addonCounts, setAddonCounts] = useState({});
    const [selectedAddon, setSelectedAddon] = useState(null);
    const [selectedCombos, setSelectedCombos] = useState([]);
    const [showCombos, setShowCombos] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const { addToCart } = useContext(CartContext);
    const [comboVariants, setComboVariants] = useState({});

    useEffect(() => {
        const basePrice = item.price * sizePriceMultipliers[selectedSize];
        const addonsPrice = Object.entries(addonCounts).reduce(
            (sum, [addon, multiplier]) => sum + multiplier * ADDON_PRICE,
            0
        );
        const comboPrice = selectedCombos.reduce((sum, combo) => {
            const comboSize = comboSizes[combo.id] || 'Medium';
            const multiplier = sizePriceMultipliers[comboSize];
            return sum + combo.price * multiplier;
        }, 0);

        setTotalPrice(basePrice + addonsPrice + comboPrice);
    }, [selectedSize, addonCounts, selectedCombos, comboSizes, item.price]);

    const handleSizeChange = (size) => setSelectedSize(size);
    const handleComboSizeChange = (comboId, size) => {
        setComboSizes((prev) => ({ ...prev, [comboId]: size }));
    };

    const handleAddonCheck = (addon, isChecked) => {
        if (isChecked) {
            setSelectedAddon(addon);
        } else {
            setAddonCounts((prev) => ({ ...prev, [addon.addonname]: 0 }));
            setSelectedAddon(null);
        }
    };

    const handleAddonOptionChange = (addonName, option) => {
        const multiplier = option === 'Extra' ? 2 : 1;
        setAddonCounts((prev) => ({ ...prev, [addonName]: multiplier }));
    };

    const toggleComboSelection = (combo) => {
        setSelectedCombos((prevCombos) => {
            const isAlreadySelected = prevCombos.some((selected) => selected.id === combo.id);
            if (isAlreadySelected) {
                return prevCombos.filter((selected) => selected.id !== combo.id);
            } else {
                return [...prevCombos, combo];
            }
        });
        setComboSizes((prevSizes) => {
            if (prevSizes[combo.id]) {

                const newSizes = { ...prevSizes };
                delete newSizes[combo.id];
                return newSizes;
            } else {
                return { ...prevSizes, [combo.id]: 'Medium' };
            }
        });
    };



    const handleRemoveCombo = (comboName) => {
        setSelectedCombos((prevCombos) =>
            prevCombos.filter((combo) => combo.name !== comboName)
        );
    };

    const closeAddonPopup = () => setSelectedAddon(null);

    const handleAddToCart = () => {
        const customizedItem = {
            id: item.id,
            name: item.name,
            image: item.image,
            category: item.category,
            basePrice: item.price,
            selectedSize,
            addonCounts,
            selectedCombos: selectedCombos.map((combo) => ({
                ...combo,
                variant: comboVariants[combo.id] || "No Variant",
                size: comboSizes[combo.id] || "Medium",
            })),
            selectedAddon,
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
                            <button type="button" className="btn-close" onClick={onClose}></button>
                        </div>
                        <div className="modal-body">
                            <img
                                src={item.image}
                                alt={item.name}
                                width={100}
                                height={70}
                                className="mb-3 rounded d-flex mx-auto"
                            />
                            <p className="mb-0 text-center">
                                <strong>Category:</strong> {item.category}
                            </p>
                            <p className='text-center'>
                                <strong>Total Price:</strong> ${totalPrice.toFixed(2)}
                            </p>
                            
                                <div
                                    class="radio-inputs"
                                    role="group"
                                    aria-label="Size selection"
                                >
                                    {Object.keys(sizePriceMultipliers).map((size) => (
                                        <label key={size} className="radio">
                                            <input
                                                type="radio"
                                                name="size"
                                                value={size}
                                                checked={selectedSize === size}
                                                onChange={() => handleSizeChange(size)}
                                            />
                                            <span class="name">{size}</span>
                                        </label>
                                    ))}
                                </div>
                            
                            <div className="mt-3">
                                <strong>Add-ons:</strong>
                                <ul className="addons-list d-flex justify-content-evenly">
                                    {item.addons.map((addon) => (
                                        <li key={addon.addonname} className="addon-item">
                                            <input
                                                type="checkbox"
                                                onChange={(e) =>
                                                    handleAddonCheck(addon, e.target.checked)
                                                }
                                            />
                                            <img
                                                src={addon.image}
                                                alt={addon.addonname}
                                                width={50}
                                                height={50}
                                                className="mx-2 rounded"
                                            />
                                            <span>{addon.addonname}</span>
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
                                                    onChange={() =>
                                                        handleAddonOptionChange(
                                                            selectedAddon.addonname,
                                                            'Base'
                                                        )
                                                    }
                                                />
                                                <label
                                                    htmlFor={`${selectedAddon.addonname}-basic`}
                                                    className="btn btn-outline-primary addonName "
                                                >
                                                    {selectedAddon.addonname}
                                                </label>
                                            </div>
                                            <div className="ms-3">
                                                <input
                                                    type="radio"
                                                    id={`${selectedAddon.addonname}-extra`}
                                                    name={`addon-option-${selectedAddon.addonname}`}
                                                    value="Extra"
                                                    checked={addonCounts[selectedAddon.addonname] === 2}
                                                    onChange={() =>
                                                        handleAddonOptionChange(
                                                            selectedAddon.addonname,
                                                            'Extra'
                                                        )
                                                    }
                                                />
                                                <label
                                                    htmlFor={`${selectedAddon.addonname}-extra`}
                                                    className="btn btn-outline-primary addonName"
                                                >
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


                            <div className="form-check mt-4">
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
                                        {combos.map((combo) => (
                                            <div
                                                key={combo.id}
                                                className={`col-lg-3 col-md-4 col-6 text-center mb-3 combo-option ${selectedCombos.some((selected) => selected.id === combo.id) ? 'selected' : ''
                                                    }`}
                                                onClick={() => toggleComboSelection(combo)}
                                            >
                                                <img
                                                    src={combo.image}
                                                    alt={combo.name}
                                                    width={100}
                                                    height={70}
                                                    className="rounded mb-2"
                                                />
                                                <p>{combo.name}</p>
                                                <p>${combo.price.toFixed(2)}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}


                            {selectedCombos.length > 0 && (
                                <div className="selected-combos mt-3">
                                    <h5>Selected Combos:</h5>
                                    <ul className="list-group">
                                        {selectedCombos.map((combo) => (
                                            <li
                                                key={combo.id}
                                                className="list-group-item d-flex justify-content-between align-items-center"
                                            >
                                                <div className="d-flex align-items-center">
                                                    <img
                                                        src={combo.image}
                                                        alt={combo.name}
                                                        width={50}
                                                        height={35}
                                                        className="rounded me-2"
                                                    />
                                                    <span>{combo.name}</span>
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    <span className="me-3">${combo.price.toFixed(2)}</span>
                                                    <div className="text-center me-3">
                                                        {combo.variants && (
                                                            <select
                                                                className="form-select"
                                                                value={comboVariants[combo.id] || ""}
                                                                onChange={(e) =>
                                                                    setComboVariants((prev) => ({
                                                                        ...prev,
                                                                        [combo.id]: e.target.value,
                                                                    }))
                                                                }
                                                            >
                                                                <option value="" disabled>Select a Variant</option>
                                                                {combo.variants.map((variant) => (
                                                                    <option key={variant} value={variant}>
                                                                        {variant}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        )}
                                                    </div>
                                                    <div className="text-center">
                                                        <div
                                                            className="btn-group"
                                                            role="group"
                                                            aria-label="Size selection"
                                                        >
                                                            {Object.keys(sizePriceMultipliers).map((size) => (
                                                                <label key={size} className="btn btn-outline-primary">
                                                                    <input
                                                                        type="radio"
                                                                        name={`combo-size-${combo.id}`}
                                                                        value={size}
                                                                        checked={comboSizes[combo.id] === size}
                                                                        onChange={() => handleComboSizeChange(combo.id, size)}
                                                                    />
                                                                    {size}
                                                                </label>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <button
                                                        className="btn btn-sm"
                                                        onClick={() => toggleComboSelection(combo)}
                                                    >
                                                        <i className="bi bi-x-circle-fill"></i>
                                                    </button>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={onClose}
                            >
                                Close
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleAddToCart}
                            >
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
