const createUserHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector('#create-email-login').value.trim();
  const password = document.querySelector('#create-password-login').value.trim();
  const username = document.querySelector('#create-username-login').value.trim();
  console.log(username, email, password);

  if (username && email && password) {
    const response = await fetch(`/api/user`, {
      method: 'POST',
      body: JSON.stringify({
        username,
        email,
        password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    console.log(response);

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to create new account');
    }
  }
};

document
  .querySelector('.register_submit')
  .addEventListener('click', createUserHandler);