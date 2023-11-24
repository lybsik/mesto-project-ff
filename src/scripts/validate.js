export const validationConfig = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__button-save',
    inactiveButtonClass: 'form__button-save_disabled',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'popup__input-error_visible'
  }; 

export function enableValidation (config) {
    const showInputError = (form, input) => {
        input.classList.add(config.inputErrorClass)
        const span = form.querySelector(`.${input.id}-error`)
        span.textContent = input.validationMessage
        span.classList.add(config.errorClass)
    }
    const hideInputError = (form, input) => {
        input.classList.remove(config.inputErrorClass)
        const span = form.querySelector(`.${input.id}-error`)
        span.textContent = ''
        span.classList.remove(config.errorClass)
    }
    const isValid = (form, input) => {
        if (!input.validity.valid) {
            showInputError(form, input)
        } else {
            hideInputError(form, input)
        }
    }
    const hasInvalidValue = (inputs) => {
        return inputs.some(input => !input.validity.valid)
        }
        
    const toggleButtonState = (inputs, button) => {
        if (hasInvalidValue(inputs)) {
            button.classList.add(config.inactiveButtonClass)
            button.disabled = true
        } else {
            button.classList.remove(config.inactiveButtonClass)
            button.disabled = false
        }
    }
    const setEventListeners = (form) => {
    const inputs = Array.from(form.querySelectorAll(config.inputSelector));
    const button = form.querySelector(config.submitButtonSelector);

    toggleButtonState(inputs, button)
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            isValid(form, input)
            toggleButtonState(inputs, button)
        })
    })
    }


    const forms = Array.from(document.querySelectorAll(config.formSelector));
    forms.forEach(form => {
        setEventListeners(form);
    })
}
