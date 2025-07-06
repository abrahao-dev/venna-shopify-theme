/**
 * Gift Recipient Form Validation
 * Validates that sender name, recipient name, and email fields are filled when the gift checkbox is checked
 * before allowing any form submission button to proceed (including "Adicionar ao carrinho" and "Reservar agora").
 */

document.addEventListener('DOMContentLoaded', function() {
  // Debug info on load
  console.log('Gift validation script loaded');
  
  // Setup validation for Cowlendar button clicks
  setupCowlendarButtonValidation();
  
  // Setup validation for standard product form submissions
  setupProductFormValidation();
  
  // Setup input change listeners to update button states
  setupInputChangeListeners();
  
  // Initial check for button states after a short delay to ensure DOM is fully ready
  setTimeout(() => {
    console.log('Performing initial validation check...');
    updateCowlendarButtonState();
  }, 500);
  
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
  
  // Initialize button state based on current form validity
  updateCowlendarButtonState();
}

/**
 * Sets up validation for standard product form submissions
 * Handles both "Adicionar ao carrinho" and "Reservar agora" buttons
 */
function setupProductFormValidation() {
  // Find all product forms
  const productForms = document.querySelectorAll('form[is="product-form"]');
  
  productForms.forEach(form => {
    // Remove any existing listeners to prevent duplicates
    form.removeEventListener('submit', validateGiftRecipientFormOnSubmit);
    // Add the validation listener
    form.addEventListener('submit', validateGiftRecipientFormOnSubmit);
    
    // Also find all submit buttons within the form (could be multiple: add to cart, buy now, etc)
    const submitButtons = form.querySelectorAll('button[type="submit"]');
    submitButtons.forEach(button => {
      // Remove any existing listeners to prevent duplicates
      button.removeEventListener('click', checkGiftValidationBeforeSubmit);
      // Add the validation listener to the button itself for better UX
      button.addEventListener('click', checkGiftValidationBeforeSubmit);
    });
  });
}

/**
 * Validates the gift recipient form if the gift checkbox is checked
 * @param {Event} event - The click event
 */
function validateGiftRecipientForm(event) {
  // Perform validation and prevent default if validation fails
  if (!validateGiftFields()) {
    event.preventDefault();
    event.stopPropagation();
    return false;
  }
}

/**
 * Validates the gift recipient form on form submission
 * @param {Event} event - The submit event
 */
function validateGiftRecipientFormOnSubmit(event) {
  // Perform validation and prevent form submission if validation fails
  if (!validateGiftFields()) {
    event.preventDefault();
    event.stopPropagation();
    return false;
  }
}

/**
 * Pre-validates gift fields when clicking submit buttons
 * @param {Event} event - The click event
 */
function checkGiftValidationBeforeSubmit(event) {
  // Only validate, don't prevent default yet (that happens in the submit handler)
  // This is just for early feedback before the actual form submission
  validateGiftFields();
}

/**
 * Sets up input change listeners to update button states
 */
function setupInputChangeListeners() {
  // Listen for changes on the gift checkbox
  const giftCheckbox = document.querySelector('input[name="properties[__shopify_send_gift_card_to_recipient]"]');
  if (giftCheckbox) {
    giftCheckbox.addEventListener('change', function() {
      updateCowlendarButtonState();
    });
  }
  
  // Listen for changes on all gift-related input fields
  const recipientFields = document.querySelectorAll('input[name="properties[Recipient name]"], input[name="properties[Recipient email]"], input[name*="sender"], input[name*="Sender"]');
  recipientFields.forEach(field => {
    field.addEventListener('input', function() {
      updateCowlendarButtonState();
    });
  });
}

/**
 * Updates the Cowlendar button state (enabled/disabled) based on form validity
 */
function updateCowlendarButtonState() {
  // Get the gift checkbox first
  const giftCheckbox = document.querySelector('input[name="properties[__shopify_send_gift_card_to_recipient]"]');
  
  // If checkbox doesn't exist or isn't checked, always enable the button
  if (!giftCheckbox || !giftCheckbox.checked) {
    enableCowlendarButtons();
    return;
  }
  
  // Check form validity only if gift checkbox is checked
  const isValid = checkGiftFieldsValidity();
  
  // Get all Cowlendar buttons
  const cowlendarButtons = document.querySelectorAll('.cowlendar-btn');
  
  cowlendarButtons.forEach(button => {
    if (isValid) {
      // Enable button
      button.disabled = false;
      button.classList.remove('button--disabled');
      button.style.opacity = '1';
      button.style.cursor = 'pointer';
      console.log('Enabling Cowlendar button - validation passed');
    } else {
      // Disable button
      button.disabled = true;
      button.classList.add('button--disabled');
      button.style.opacity = '0.5';
      button.style.cursor = 'not-allowed';
      console.log('Disabling Cowlendar button - validation failed');
    }
  });
}

/**
 * Enable all Cowlendar buttons
 */
function enableCowlendarButtons() {
  const cowlendarButtons = document.querySelectorAll('.cowlendar-btn');
  cowlendarButtons.forEach(button => {
    button.disabled = false;
    button.classList.remove('button--disabled');
    button.style.opacity = '1';
    button.style.cursor = 'pointer';
    console.log('Enabling Cowlendar button - no gift selected or validation passed');
  });
}

/**
 * Core validation logic for gift fields
 * @returns {boolean} - Whether validation passed
 */
function validateGiftFields() {
  return checkGiftFieldsValidity();
}

/**
 * Checks if gift fields are valid
 * @returns {boolean} - Whether all required fields are filled
 */
function checkGiftFieldsValidity() {
  // Get the gift checkbox
  const giftCheckbox = document.querySelector('input[name="properties[__shopify_send_gift_card_to_recipient]"]');
  
  // If checkbox doesn't exist or isn't checked, allow the action
  if (!giftCheckbox || !giftCheckbox.checked) {
    console.log('Gift checkbox not checked, validation passes');
    return true;
  }
  
  console.log('Gift checkbox checked, validating required fields...');
  
  // Get the name field which could be used as the sender name
  const nameInput = document.querySelector('input[id^="Recipient-name-"]');
  
  // Get the recipient name and email fields
  const recipientNameField = document.querySelector('input[name="properties[Recipient name]"]') || 
                             document.querySelector('input[id^="Recipient-recipient-name-"]');
  const emailField = document.querySelector('input[name="properties[Recipient email]"]') || 
                     document.querySelector('input[id^="Recipient-email-"]');
  
  console.log('Form fields found:', { 
    nameInput: nameInput ? 'found' : 'not found', 
    recipientNameField: recipientNameField ? 'found' : 'not found', 
    emailField: emailField ? 'found' : 'not found' 
  });
  
  // Check if the fields exist and are filled
  const nameEmpty = !nameInput || !nameInput.value.trim();
  const recipientNameEmpty = !recipientNameField || !recipientNameField.value.trim();
  const emailEmpty = !emailField || !emailField.value.trim();
  
  console.log('Field validation:', { 
    nameEmpty, 
    recipientNameEmpty, 
    emailEmpty,
    nameValue: nameInput ? nameInput.value : 'no field',
    recipientNameValue: recipientNameField ? recipientNameField.value : 'no field',
    emailValue: emailField ? emailField.value : 'no field'
  });
  
  // For debugging purposes, find all name and email inputs on the page
  const allInputs = document.querySelectorAll('input');
  console.log('All input fields on page:', Array.from(allInputs).map(input => ({ 
    name: input.name || 'unnamed', 
    id: input.id || 'no-id',
    value: input.value || 'empty'
  })));
  
  // If any of the required fields are empty
  if (nameEmpty || recipientNameEmpty || emailEmpty) {
    // In validateGiftFields, show error message
    if (arguments.callee.name === 'validateGiftFields') {
      showValidationError(senderEmpty, nameEmpty, emailEmpty);
      
      // Focus on the first empty field
      if (senderEmpty && senderField) {
        senderField.focus();
      } else if (nameEmpty && nameField) {
        nameField.focus();
      } else if (emailEmpty && emailField) {
        emailField.focus();
      }
    }
    
    return false;
  }
  
  // All validations passed
  if (arguments.callee.name === 'validateGiftFields') {
    removeValidationError();
  }
  return true;
}

/**
 * Shows a validation error message for empty gift recipient fields
 * @param {boolean} senderEmpty - Whether the sender name field is empty
 * @param {boolean} nameEmpty - Whether the recipient name field is empty
 * @param {boolean} emailEmpty - Whether the recipient email field is empty
 */
function showValidationError(senderEmpty, nameEmpty, emailEmpty) {
  // Remove any existing error messages
  removeValidationError();
  
  // Create error message container
  const errorDiv = document.createElement('div');
  errorDiv.className = 'gift-recipient-validation-error alert alert--error';
  errorDiv.setAttribute('role', 'alert');
  errorDiv.style.color = '#e11d48'; // Red color for error
  errorDiv.style.marginTop = '10px';
  errorDiv.style.marginBottom = '10px';
  errorDiv.style.padding = '10px';
  errorDiv.style.border = '1px solid #e11d48';
  errorDiv.style.borderRadius = '4px';
  errorDiv.style.backgroundColor = '#fff1f2';
  
  // Create error message content with proper structured HTML for accessibility
  const heading = document.createElement('p');
  heading.style.fontWeight = 'bold';
  heading.style.marginBottom = '5px';
  heading.textContent = 'Preencha os campos obrigatórios';
  
  // Create list of missing fields
  const missingFieldsList = document.createElement('ul');
  missingFieldsList.style.paddingLeft = '20px';
  missingFieldsList.style.marginTop = '5px';
  
  if (senderEmpty) {
    const item = document.createElement('li');
    item.textContent = 'Nome do remetente';
    missingFieldsList.appendChild(item);
  }
  
  if (nameEmpty) {
    const item = document.createElement('li');
    item.textContent = 'Nome do destinatário';
    missingFieldsList.appendChild(item);
  }
  
  if (emailEmpty) {
    const item = document.createElement('li');
    item.textContent = 'E-mail do destinatário';
    missingFieldsList.appendChild(item);
  }
  
  // Assemble the error message
  errorDiv.appendChild(heading);
  errorDiv.appendChild(missingFieldsList);
  
  // Find optimal placement for the error message
  // First try the product form error message container (if it exists)
  const formErrorContainer = document.querySelector('.product-form__error-message');
  if (formErrorContainer) {
    // Clone our error content into the existing error container
    formErrorContainer.innerHTML = '';
    formErrorContainer.appendChild(errorDiv.cloneNode(true));
    formErrorContainer.hidden = false;
    return; // Exit early as we've placed the error in the proper container
  }
  
  // If no proper error container exists, try to insert near relevant elements
  const productForm = document.querySelector('form[is="product-form"]');
  const buyButtons = productForm ? productForm.querySelector('.product-form__buttons') : null;
  
  if (buyButtons) {
    // Insert before the buy buttons
    buyButtons.insertBefore(errorDiv, buyButtons.firstChild);
  } else {
    // Try Cowlendar button
    const cowlendarButton = document.querySelector('.cowlendar-btn');
    if (cowlendarButton) {
      const buttonContainer = cowlendarButton.parentNode;
      buttonContainer.insertBefore(errorDiv, cowlendarButton);
    } else {
      // Last resort - insert after the recipient fields
      const recipientFields = document.querySelector('.recipient-fields');
      if (recipientFields) {
        recipientFields.parentNode.insertBefore(errorDiv, recipientFields.nextSibling);
      }
    }
  }
  
  // Scroll the error into view
  errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
  
  // Update button states after showing error
  updateCowlendarButtonState();
}

/**
 * Removes any existing validation error messages
 */
function removeValidationError() {
  const errorMessages = document.querySelectorAll('.gift-recipient-validation-error');
  errorMessages.forEach(message => message.remove());
}
