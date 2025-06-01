// Panel geçişleri
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

// Formlar
const signUpForm = document.querySelector('.sign-up-container form');
const signInForm = document.querySelector('.sign-in-container form');

// Kaydol (Sign Up)
signUpForm.addEventListener('submit', function(e) {
	e.preventDefault();

	const name = signUpForm.querySelector('input[placeholder="Adınız"]').value.trim();
	const email = signUpForm.querySelector('input[placeholder="E-posta"]').value.trim();
	const password = signUpForm.querySelector('input[placeholder="Şifre"]').value;

	if (!name || !email || !password) {
		alert("Lütfen tüm alanları doldurun.");
		return;
	}

	let users = JSON.parse(localStorage.getItem("users")) || [];
	const userExists = users.some(user => user.email === email);

	if (userExists) {
		alert("Bu e-posta adresi zaten kayıtlı.");
		return;
	}

	users.push({ name, email, password });
	localStorage.setItem("users", JSON.stringify(users));

	alert("Kayıt başarılı! Giriş yapabilirsiniz.");
	signInButton.click();
});

// Giriş (Sign In)
signInForm.addEventListener('submit', function(e) {
	e.preventDefault();

	const email = signInForm.querySelector('input[placeholder="E-posta"]').value.trim();
	const password = signInForm.querySelector('input[placeholder="Şifre"]').value;

	if (!email || !password) {
		alert("Lütfen tüm alanları doldurun.");
		return;
	}

	const users = JSON.parse(localStorage.getItem("users")) || [];
	const matchedUser = users.find(user => user.email === email && user.password === password);

	if (matchedUser) {
		alert(`Hoş geldin, ${matchedUser.name}!`);
		localStorage.setItem("activeUser", JSON.stringify(matchedUser)); // aktif kullanıcıyı kaydet
		window.location.href = "index.html"; // index.html sayfasına yönlendir
	} else {
		alert("E-posta veya şifre hatalı.");
	}
});
