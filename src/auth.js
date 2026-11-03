
export function registerUser(user) {
  let users = JSON.parse(
    localStorage.getItem("users") || "[]"
  );

  const exists = users.find(
    u => u.email === user.email
  );

  if (exists) {
    return "Email already registered!";
  }

  users.push(user);

  localStorage.setItem(
    "users",
    JSON.stringify(users)
  );

  return "Registration successful!";
}

export function loginUser(email, password) {
  // Demo admin account
  if (
    email === "admin@farmconnect.com" &&
    password === "Admin@123"
  ) {
    const admin = {
      name: "Admin",
      email,
      role: "admin"
    };

    localStorage.setItem(
      "currentUser",
      JSON.stringify(admin)
    );

    return admin;
  }

  const users = JSON.parse(
    localStorage.getItem("users") || "[]"
  );

  const user = users.find(
    u => u.email === email &&
         u.password === password
  );

  if (!user) return null;

  localStorage.setItem(
    "currentUser",
    JSON.stringify(user)
  );

  return user;
}

export function logoutUser() {
  localStorage.removeItem("currentUser");
}

export function getCurrentUser() {
  return JSON.parse(
    localStorage.getItem("currentUser") || "null"
  );
}
