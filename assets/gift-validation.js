/**
 * Gift Recipient Form Validation
 * Validates that recipient name and email fields are filled when the gift checkbox is checked
 * before allowing the Cowlendar reservation button to proceed.
 */

document.addEventListener('DOMContentLoaded', function() {
  // Setup validation for Cowlendar button clicks
  setupCowlendarButtonValidation();
  
  // Since Cowlendar might load asynchronously, we also need to check periodically
  // for the button if it's not immediately available
  const checkInterval = setInterval(() => {
    const cowlendarButtons = document.querySelectorAll('.cowlendar-btn');
    if (cowlendarButtons.length > 0) {
      setupCowlendarButtonValidation();
      clearInterval(checkInterval);
    }
  }, 1000); // Check every second
});

/**
 * Sets up validation for Cowlendar reservation buttons
 */
function setupCowlendarButtonValidation() {
  const cowlendarButtons = document.querySelectorAll('.cowlendar-btn');
  
  cowlendarButtons.forEach(button => {
    // Remove any existing listeners to prevent duplicates
    button.removeEventListener('click', validateGiftRecipientForm);
    // Add the validation listener
    button.addEventListener('click', validateGiftRecipientForm);
  });
}

/**
 * Validates the gift recipient form if the gift checkbox is checked
 * @param {Event} event - The click event
 */
function validateGiftRecipientForm(event) {
  // Get the gift checkbox
  const giftCheckbox = document.querySelector('input[name="properties[__shopify_send_gift_card_to_recipient]"]');
  
  // If checkbox doesn't exist or isn't checked, allow the click
  if (!giftCheckbox || !giftCheckbox.checked) {
    return;
  }
  
  // Get the recipient name and email fields
  const nameField = document.querySelector('input[name="properties[Recipient name]"]');
  const emailField = document.querySelector('input[name="properties[Recipient email]"]');
  
  // Check if the fields exist and are filled
  const nameEmpty = !nameField || !nameField.value.trim();
  const emailEmpty = !emailField || !emailField.value.trim();
  
  if (nameEmpty || emailEmpty) {
    // Prevent the default click action
    event.preventDefault();
    event.stopPropagation();
    
    // Show error message
    showValidationError(nameEmpty, emailEmpty);
    
    // Focus on the first empty field
    if (nameEmpty && nameField) {
      nameField.focus();
    } else if (emailEmpty && emailField) {
      emailField.focus();
    }
    
    return false;
  }
}

/**
 * Shows a validation error message for empty gift recipient fields
 * @param {boolean} nameEmpty - Whether the name field is empty
 * @param {boolean} emailEmpty - Whether the email field is empty
 */
function showValidationError(nameEmpty, emailEmpty) {
  // Remove any existing error messages
  removeValidationError();
  
  // Create error message
  const errorDiv = document.createElement('div');
  errorDiv.className = 'gift-recipient-validation-error';
  errorDiv.style.color = '#e11d48'; // Red color for error
  errorDiv.style.marginTop = '10px';
  errorDiv.style.marginBottom = '10px';
  errorDiv.style.padding = '10px';
  errorDiv.style.border = '1px solid #e11d48';
  errorDiv.style.borderRadius = '4px';
  errorDiv.style.backgroundColor = '#fff1f2';
  
  // Create error message content
  let errorMessage = 'Por favor completa ';
  const missingFields = [];
  
  if (nameEmpty) missingFields.push('el nombre del destinatario');
  if (emailEmpty) missingFields.push('el email del destinatario');
  
  if (missingFields.length === 1) {
    errorMessage += missingFields[0];
  } else {
    errorMessage += missingFields.join(' y ');
  }
  
  errorMessage += ' antes de continuar.';
  errorDiv.textContent = errorMessage;
  
  // Find a good place to insert the error message
  const cowlendarButton = document.querySelector('.cowlendar-btn');
  if (cowlendarButton) {
    // Try to insert before the button
    const buttonContainer = cowlendarButton.parentNode;
    buttonContainer.insertBefore(errorDiv, cowlendarButton);
  } else {
    // Fallback - insert after the email field
    const emailField = document.querySelector('input[name="properties[Recipient email]"]');
    if (emailField) {
      const fieldContainer = emailField.closest('.recipient-field') || emailField.parentNode;
      fieldContainer.parentNode.insertBefore(errorDiv, fieldContainer.nextSibling);
    }
  }
  
  // Automatically remove the error after 5 seconds
  setTimeout(removeValidationError, 5000);
}

/**
 * Removes any existing validation error messages
 */
function removeValidationError() {
  const errorMessages = document.querySelectorAll('.gift-recipient-validation-error');
  errorMessages.forEach(message => message.remove());
}
