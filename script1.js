document.getElementById('login-btn').addEventListener('click', function () {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    fetch('php/login.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `username=${username}&password=${password}`
    })
      .then(response => response.text())
      .then(data => {
        if (data === "success") {
          alert("Acceso exitoso");
          document.getElementById('access-container').style.display = 'none';
          document.getElementById('menu-container').style.display = 'block';
        } else {
          alert("Usuario o contraseña incorrectos.");
        }
      })
      .catch(error => console.error('Error:', error));
  });
  