const phoneInput = document.getElementById('phoneInput');
//hotfix
phoneInput.addEventListener('input', function(event) {
    let inputValue = event.target.value.replace(/\D/g, '').substring(0, 11);
    let formattedValue = '';
  
    if (inputValue.length > 0) {
      formattedValue = '+7 (';
  
      if (inputValue.length > 3) {
        formattedValue += inputValue.substring(1, 4) + ') ';
  
        if (inputValue.length > 6) {
          formattedValue += inputValue.substring(4, 7) + ' ';
  
          if (inputValue.length > 8) {
            formattedValue += inputValue.substring(7, 9);
            if (inputValue.length > 9) {
              formattedValue += '-' + inputValue.substring(9);
            }
          } else {
            formattedValue += inputValue.substring(7);
          }
        } else {
          formattedValue += inputValue.substring(4);
        }
      } else {
        formattedValue += inputValue.substring(1);
      }
    }
  
    event.target.value = formattedValue;
    const phoneError = document.getElementById('phoneError');

    phoneInput.addEventListener('input', function(event) {
        const input = event.target.value.replace(/\D/g, '');

        if (input.length === 11 && input.length!=1) {
            phoneError.style.display = 'none';
        } else {
            phoneError.style.display = 'block';
        }
    });
  });
const dobInput = document.getElementById('davaToday');
const dobError = document.getElementById('dobError');

dobInput.addEventListener('change', function(event) {
    const selectedDate = new Date(event.target.value);
    const comparisonDate = new Date('2009-01-01');
    const minDate = new Date('1900-01-01');

    if (selectedDate > comparisonDate || selectedDate<minDate) {
      dobError.style.display = 'block';
    } 
    else {
      dobError.style.display = 'none';
    }
});
const emailInput = document.getElementById('email');
const emailError = document.getElementById('emailError');

emailInput.addEventListener('change', function(event) {
    const email = event.target.value;
    const isValid = validateEmail(email);

    if (!isValid) {
        emailError.style.display = 'block';
    } 
    else {
        emailError.style.display = 'none';
    }
});

function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

const passwordInput = document.getElementById('password');
const passwordError = document.getElementById('passwordError');

passwordInput.addEventListener('change', function(event) {
    const password = event.target.value;
    const isValid = validatePassword(password);

    if (!isValid) {
        passwordError.style.display = 'block';
    } 
    else {
        passwordError.style.display = 'none';
    }
});
function validatePassword(password) {
  if (password.length < 6) {
      return false;
  }
  const Number = /[0-9]/.test(password);
  const Letter = /[a-zA-Z]/.test(password);
  return Number && Letter;
}
