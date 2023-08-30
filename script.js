const cart = [];
let total = 0;

function addItem() {
  const itemName = document.getElementById("item").value;
  const itemPrice = parseFloat(document.getElementById("price").value);

  if (!itemName || isNaN(itemPrice)) {
    alert("Please enter valid data.");
    return;
  }

  const item = {
    name: itemName,
    price: itemPrice,
    quantity: 1,
  };

  cart.push(item);

  // Update the cart table
  updateCart();

  // Calculate and update the total
  total += item.price;
  document.getElementById("total").textContent = total.toFixed(2);

  // Clear input fields
  document.getElementById("item").value = "";
  document.getElementById("price").value = "";
}

function removeItem(index) {
  total -= cart[index].price * cart[index].quantity;
  cart.splice(index, 1);

  // Update the cart table and total
  updateCart();
  document.getElementById("total").textContent = total.toFixed(2);
}

function updateQuantity(index, newQuantity) {
  if (newQuantity < 1) {
    return;
  }
  const item = cart[index];
  total -= item.price * item.quantity;
  item.quantity = newQuantity;
  total += item.price * newQuantity;
  updateCart();
  document.getElementById("total").textContent = total.toFixed(2);
}

function updateCart() {
  const cartTable = document.getElementById("cart");
  cartTable.innerHTML = "";

  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];

    const row = cartTable.insertRow();
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);
    const cell5 = row.insertCell(4);

    cell1.innerHTML = item.name;
    cell2.innerHTML = `$${item.price.toFixed(2)}`;

    // Quantity buttons
    const decreaseButton = document.createElement("button");
    decreaseButton.className = "quantity-button";
    decreaseButton.textContent = "-";
    decreaseButton.onclick = function () {
      updateQuantity(i, item.quantity - 1);
    };

    const quantitySpan = document.createElement("span");
    quantitySpan.textContent = item.quantity;

    const increaseButton = document.createElement("button");
    increaseButton.className = "quantity-button";
    increaseButton.textContent = "+";
    increaseButton.onclick = function () {
      updateQuantity(i, item.quantity + 1);
    };

    cell3.appendChild(decreaseButton);
    cell3.appendChild(quantitySpan);
    cell3.appendChild(increaseButton);

    cell4.innerHTML = `$${(item.price * item.quantity).toFixed(2)}`;

    // Remove button
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.onclick = function () {
      removeItem(i);
    };

    cell5.appendChild(removeButton);
  }
}
