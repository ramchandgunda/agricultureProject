
const ADMIN_REGISTRATION_CODE = "FARMADMIN2026";

export function registerUser(user, role, adminCode = "") {
  const users = JSON.parse(
    localStorage.getItem("users") || "[]"
  );

  const email = user.email.trim().toLowerCase();

  const exists = users.find(
    u => u.email.toLowerCase() === email
  );

  if (exists || email === "admin@farmconnect.com") {
    return "Email already registered!";
  }

  if (role !== "user" && role !== "admin") {
    return "Invalid account type!";
  }

  if (role === "admin" && adminCode !== ADMIN_REGISTRATION_CODE) {
    return "Invalid admin registration code!";
  }

  const newUser = {
    name: user.name.trim(),
    email: email,
    password: user.password,
    mobile: user.mobile.trim(),
    role: role
  };

  users.push(newUser);

  localStorage.setItem("users", JSON.stringify(users));

  return "Registration successful!";
}

export function loginUser(email, password, selectedRole = "user") {
  const cleanEmail = email.trim().toLowerCase();

  // Existing demo admin account
  if (
    cleanEmail === "admin@farmconnect.com" &&
    password === "Admin@123" &&
    selectedRole === "admin"
  ) {
    const admin = {
      name: "Admin",
      email: cleanEmail,
      role: "admin"
    };

    localStorage.setItem("currentUser", JSON.stringify(admin));
    return admin;
  }

  const users = JSON.parse(
    localStorage.getItem("users") || "[]"
  );

  const user = users.find(
    u =>
      u.email.toLowerCase() === cleanEmail &&
      u.password === password &&
      u.role === selectedRole
  );

  if (!user) return null;

  localStorage.setItem("currentUser", JSON.stringify(user));

  return user;
}

export function getRegisteredFarmers() {
  const users = JSON.parse(
    localStorage.getItem("users") || "[]"
  );

  return users.filter(user => user.role === "user");
}

export function deleteFarmer(email) {
  let users = JSON.parse(
    localStorage.getItem("users") || "[]"
  );

  users = users.filter(
    user => user.email.toLowerCase() !== email.toLowerCase()
  );

  localStorage.setItem("users", JSON.stringify(users));

  return users.filter(user => user.role === "user");
}

export function logoutUser() {
  localStorage.removeItem("currentUser");
}

export function getCurrentUser() {
  return JSON.parse(
    localStorage.getItem("currentUser") || "null"
  );
}
