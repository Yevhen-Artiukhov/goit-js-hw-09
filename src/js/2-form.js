const STORAGE_KEY = 'feedback-form-state';

const formData = {
  email: '',
  message: '',
};

const form = document.querySelector('.feedback-form');

populateFormFromStorage();

form.addEventListener('input', onFormInput);
form.addEventListener('submit', onFormSubmit);

function onFormInput(event) {
  const { name, value } = event.target;

  if (!(name in formData)) return;

  formData[name] = value.trim();

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(event) {
  event.preventDefault();

  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  console.log(formData);

  form.reset();

  localStorage.removeItem(STORAGE_KEY);

  formData.email = '';
  formData.message = '';
}

function populateFormFromStorage() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return;

  try {
    const parsedData = JSON.parse(saved);

    if (typeof parsedData.email === 'string') {
      form.elements.email.value = parsedData.email;
      formData.email = parsedData.email;
    }

    if (typeof parsedData.message === 'string') {
      form.elements.message.value = parsedData.message;
      formData.message = parsedData.message;
    }
  } catch (error) {
    console.error('Error parsing saved form data:', error);
  }
}
