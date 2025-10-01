(function() {
    // Get the form element by its ID. This matches <form id="contact-form">
    const form = document.getElementById('contact-form');

    // If the form does not exist on the page, stop execution.
    if (!form) return;

    // Expose validateForm globally so that the HTML attribute onsubmit can find it.
    // By attaching it to window, we make sure it is available in the global scope.
    window.validateForm = function validateForm() {
        // Retrieve values from input fields. Use .trim() to remove extra spaces.
        var firstName = document.getElementById('firstName').value.trim();
        var lastName = document.getElementById('lastName').value.trim();
        var email = document.getElementById('email').value.trim();
        var phoneEl = document.getElementById('phone');
        var phone = phoneEl ? phoneEl.value.trim() : ''; // Optional field
        var message = document.getElementById('message').value.trim();
        var consent = document.getElementById('consent');

        // === Basic validation checks ===

        // First name is required (cannot be empty).
        if (firstName === "") {
            alert("First name must be filled out");
            return false; // Block form submission
        }

        // Last name is required (cannot be empty).
        if (lastName === "") {
            alert("Last name must be filled out");
            return false;
        }

        // Validate email with a very simple pattern.
        // This only checks that there is text before and after "@", and ends with .xx or .xxx
        var emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if (!email.match(emailPattern)) {
            alert("Please enter a valid email address");
            return false;
        }

        // Phone number is optional. If the user provided a value, do a light validation.
        if (phone !== "") {
            // Remove all non-digit characters (e.g. spaces, +, parentheses).
            var digitsOnly = phone.replace(/\D/g, '');

            // Check if the length is between 7 and 15 digits.
            if (digitsOnly.length < 7 || digitsOnly.length > 15) {
                alert("Please enter a valid phone number (7 to 15 digits)");
                return false;
            }
        }

        // The message must contain at least 10 characters.
        if (message.length < 10) {
            alert("Message must have at least 10 characters");
            return false;
        }

        // The consent checkbox must be ticked (required for Privacy Policy).
        if (!consent.checked) {
            alert("You must agree to the Privacy Policy");
            return false;
        }

        // If all checks pass, show a success alert.
        alert("Form submitted successfully!");

        // Return true so the onsubmit handler knows validation passed.
        return true;
    };

    // Add an event listener for the submit event.
    // This ensures the form does not actually submit to a server (since there is no backend).
    form.addEventListener('submit', function (e) {
        // Call our validation function.
        if (!validateForm()) {
            // If validation fails, stop form submission.
            e.preventDefault();
            return;
        }

        // If validation passes, also prevent the real submission.
        e.preventDefault();

        // Reset the form fields to empty values.
        form.reset();
    });
})();