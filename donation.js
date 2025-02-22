
const paypalScript = document.createElement("script");
paypalScript.src = "https://www.paypal.com/sdk/js?client-id=AS3LWrkE7mDtdX8Wvj9OHG4NCNT2nSSViw-ZI9ijbhz0PCepE1_bapH4Uhcv__Bbd7nGWwOsZpKJF96p&currency=USD"; // Replace with your PayPal client ID
document.head.appendChild(paypalScript);

paypalScript.onload = () => {
    const donationAmountInput = document.getElementById("donationAmount");
    const customAmountInput = document.getElementById("custom-amount");

    //button click ki settings
    document.querySelectorAll(".amount-buttons button").forEach((button) => {
        button.addEventListener("click", (e) => {
            const amount = e.target.getAttribute("data-amount");
            if (amount) {
                donationAmountInput.value = amount;
                customAmountInput.style.display = "none";
                customAmountInput.value = ""; 
            } else {
                customAmountInput.style.display = "block";
                donationAmountInput.value = ""; 
            }
        });
    });

    customAmountInput.addEventListener("input", () => {
        donationAmountInput.value = customAmountInput.value;
    });

    // Render PayPal Buttons
    paypal.Buttons({
        createOrder: (data, actions) => { 
            let amount = donationAmountInput.value.trim() || customAmountInput.value.trim();
            if (!amount || isNaN(amount) || amount <= 0) {
                alert("Please select or enter a valid donation amount.");
                throw new Error("Invalid donation amount.");
            }

            // Create PayPal order
            return actions.order.create({
                purchase_units: [
                    {
                        amount: {
                            value: amount,
                        },
                    },
                ],
            });
        },

        onApprove: (data, actions) => {
            return actions.order.capture().then((details) => {
                alert(`Thank you, ${details.payer.name.given_name}, for your donation of Rs ${details.purchase_units[0].amount.value}!`);
            });
        },

        onError: (err) => {
            console.error("PayPal Checkout Error:", err);
            alert(`An error occurred: ${err.message}. Please try again.`);
        },
    }).render("#paypal-button-container");
};

// Handle errors in PayPal SDK loading
paypalScript.onerror = () => {
    alert("Failed to load PayPal SDK. Please check your network or try again later.");
};

// Form submission fallback for non-PayPal methods
document.getElementById("donationForm").addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Currently only PayPal is supported. Please use the PayPal button.");
});
