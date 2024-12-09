import React, { useState, useEffect, useContext } from 'react';
import './foodDetail.css';
import CartContext from '../../context/CartContext';

const FoodDetails = ({ item, onClose }) => {
    if (!item) return null;

    const { addToCart } = useContext(CartContext);

    const sizePriceMultipliers = { S: 1.0, M: 1.2, L: 1.5 };
    
    const [selectedSize, setSelectedSize] = useState('M');
    const [addonCounts, setAddonCounts] = useState({});
    const [selectedAddon, setSelectedAddon] = useState(null);
    const [showSelectedPopup, setShowSelectedPopup] = useState(false);

    const [comboSizes, setComboSizes] = useState({});
    const [selectedCombos, setSelectedCombos] = useState([]);
    const [showCombos, setShowCombos] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [comboVariants, setComboVariants] = useState({});
    
    const [customizingCombo, setCustomizingCombo] = useState(null);
    
    const [fetchedItem, setFetchedItem] = useState(null);

    
    useEffect(() => {
        const fetchItemDetails = async () => {
            try {
                const response = await fetch('/api/method/intern.intern.kyle_api.Kyle_items.get_kyle_item_details', {
                    method: 'GET',
                    headers: {
                        'Authorization': 'token 8531904bdbbf00c:1da311f3ef138c0',
                        'Content-Type': 'application/json',
                    },
                });
        
                
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
        
                const data = await response.json();
                if (data && Array.isArray(data.message)) {
                    const baseUrl = 'http://109.199.100.136:8001/';
                    const formattedItem = data.message[0];
                    const formattedAddonData = formattedItem.addons || [];
                    const formattedComboData = formattedItem.combos || [];
                    setFetchedItem({
                        name: formattedItem.item_name,
                        category: formattedItem.item_group,
                        image: formattedItem.image ? `${baseUrl}${formattedItem.image}` : 'default-image.jpg',
                        price: formattedItem.price || 0,
                        addons: formattedAddonData,
                        combos: formattedComboData,
                    });
                } else {
                    throw new Error('Invalid data structure');
                }
            } catch (error) {
                console.error('Error fetching item details:', error);
            }
        };
        

        fetchItemDetails();
    }, [item]);

    useEffect(() => {
        if (fetchedItem) {
           
            const basePrice = fetchedItem.price * sizePriceMultipliers[selectedSize];

            
            const addonsPrice = Object.entries(addonCounts).reduce((sum, [addon, multiplier]) => {
                const addonDetail = fetchedItem.addons.find(a => a.name1 === addon);
                const addonPrice = addonDetail ? 20 : 0; 
                return sum + multiplier * addonPrice;
            }, 0);

            
            const comboPrice = selectedCombos.reduce((sum, combo) => {
                const comboSize = comboSizes[combo.name1] || 'M';
                const multiplier = sizePriceMultipliers[comboSize];
                return sum + 50 * multiplier;  
            }, 0);

            setTotalPrice(basePrice + addonsPrice + comboPrice);
        }
    }, [selectedSize, addonCounts, selectedCombos, comboSizes, fetchedItem]);

    const handleSizeChange = (size) => setSelectedSize(size);

    const handleAddonCheck = (addon, checked) => {
        const updatedAddonCounts = { ...addonCounts };
        if (checked) {
            updatedAddonCounts[addon.name1] = (updatedAddonCounts[addon.name1] || 0) + 1;
        } else {
            updatedAddonCounts[addon.name1] = 0;
        }
        setAddonCounts(updatedAddonCounts);
    };

    const openAddonPopup = (addon) => setSelectedAddon(addon);
    const closeAddonPopup = () => {
        if (!addonCounts[selectedAddon.name1]) {
            setAddonCounts((prev) => ({ ...prev, [selectedAddon.name1]: 0 }));
        }
        setSelectedAddon(null);
    };

    const toggleComboSelection = (combo) => {
        setShowCombos(true);
        setSelectedCombos((prevCombos) => {
            const isAlreadySelected = prevCombos.some((selected) => selected.name1 === combo.name1);
            if (isAlreadySelected) {
                return prevCombos.filter((selected) => selected.name1 !== combo.name1);
            } else {
                return [...prevCombos, combo];
            }
        });
        setComboSizes((prevSizes) => {
            if (prevSizes[combo.name1]) {
                const newSizes = { ...prevSizes };
                delete newSizes[combo.name1];
                return newSizes;
            } else {
                return { ...prevSizes, [combo.name1]: 'M' };
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
            selectedCombos: selectedCombos.map((combo) => ({
                ...combo,
                size: comboSizes[combo.name1] || 'M',
                price: 50 * sizePriceMultipliers[comboSizes[combo.name1] || 'M'], 
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
                        <h5 className="modal-title">{fetchedItem?.name}</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <img
                            src={fetchedItem?.image}
                            alt={fetchedItem?.name}
                            width={150}
                            height={100}
                            className="mb-3 rounded d-flex mx-auto"
                        />
                        <p className="mb-0 text-center">
                            <strong>Category:</strong> {fetchedItem?.category}
                        </p>
                        <p className="text-center">
                            <strong>Total Price:</strong> ${totalPrice.toFixed(2)}
                        </p>

                        <div className="radio-inputs" role="group" aria-label="Size selection">
                            {Object.keys(sizePriceMultipliers).map((size) => (
                                <label key={size} className="radio">
                                    <input
                                        type="radio"
                                        name="size"
                                        value={size}
                                        checked={selectedSize === size}
                                        onChange={() => handleSizeChange(size)}
                                    />
                                    <span className="name">{size}</span>
                                </label>
                            ))}
                        </div>

                        <div className="mt-3">
                            <strong>Add-ons:</strong>
                            <ul className="addons-list d-flex justify-content-evenly">
                                {fetchedItem?.addons?.map((addon) => (
                                    <li key={addon.addonname} className="addon-item">
                                        <input
                                            type="checkbox"
                                            checked={addonCounts[addon.addonname] > 0}
                                            onChange={(e) => handleAddonCheck(addon, e.target.checked)}
                                        />
                                        <img
                                            src={addon.image}
                                            alt={addon.addonname}
                                            width={50}
                                            height={50}
                                            className="mx-2 rounded"
                                        />
                                        <span>{addon.addonname}</span>
                                        <button
                                            className="btn btn-outline-secondary btn-sm"
                                            onClick={() => openAddonPopup(addon)}
                                        >
                                            Customize
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Add-on Customization Popup */}
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
                                                    handleAddonOptionChange(selectedAddon.addonname, 'Base')
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
                                                    handleAddonOptionChange(selectedAddon.addonname, 'Extra')
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

                        <div>
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
                                        {fetchedItem?.combos?.map((combo) => (
                                            <div
                                                key={combo.id}
                                                className={`col-lg-3 col-md-4 col-6 text-center mb-3  ${selectedCombos.some((selected) => selected.id === combo.id) ? 'selected' : ''}`}
                                                onClick={() => toggleComboSelection(combo)}
                                            >
                                                <div className="combo-option">
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
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
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
