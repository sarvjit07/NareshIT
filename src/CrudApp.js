// CrudApp.js

import React, { useState, useEffect } from "react";

const CrudApp = () => {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState("");
    const [editIndex, setEditIndex] = useState(null);

    // Load items from localStorage when the component mounts
    useEffect(() => {
        const storedItems = JSON.parse(localStorage.getItem("items"));
        if (storedItems) {
            setItems(storedItems);
        }
    }, []);

    // Save items to localStorage whenever the items array changes
    useEffect(() => {
        localStorage.setItem("items", JSON.stringify(items));
    }, [items]);

    // Add a new item
    const addItem = () => {
        if (newItem.trim() !== "") {
            setItems([...items, newItem.trim()]);
            setNewItem("");
        }
    };

    // Delete an item
    const deleteItem = (index) => {
        const updatedItems = items.filter((_, i) => i !== index);
        setItems(updatedItems);
    };

    // Start editing an item
    const editItem = (index) => {
        setNewItem(items[index]);
        setEditIndex(index);
    };

    // Save the edited item
    const saveItem = () => {
        if (editIndex !== null && newItem.trim() !== "") {
            const updatedItems = items.map((item, i) =>
                i === editIndex ? newItem.trim() : item
            );
            setItems(updatedItems);
            setNewItem("");
            setEditIndex(null);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>CRUD App with localStorage</h1>
            <div>
                <input
                    type="text"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    placeholder="Enter an item"
                />
                <button onClick={editIndex !== null ? saveItem : addItem}>
                    {editIndex !== null ? "Save" : "Add"}
                </button>
            </div>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>
                        {item}
                        <button onClick={() => editItem(index)}>Edit</button>
                        <button onClick={() => deleteItem(index)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CrudApp;
