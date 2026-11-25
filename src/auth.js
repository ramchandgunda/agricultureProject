const ADMIN_EMAIL = "admin@farmconnect.com";
const ADMIN_PASSWORD = "Admin@123";
const ADMIN_REGISTRATION_CODE = "FARMADMIN2026";

function readUsers() {
  try {
    return JSON.parse(
      localStorage.getItem("users") || "[]"
    );
  } catch {
    return [];
  }
}

export function registerUser(
  user,
  role = "user",
  adminCode = ""
) {
  const users = readUsers();

  const email = user.email.trim().toLowerCase();

  if (!["user", "admin"].includes(role)) {
    return "Invalid account type!";
  }

  if (
    email === ADMIN_EMAIL ||
    users.some(u => u.email.toLowerCase() === email)
  ) {
    return "Email already registered!";
  }

  if (
    role === "admin" &&
    adminCode !== ADMIN_REGISTRATION_CODE
  ) {
    return "Invalid Admin Registration Code!";
  }

  users.push({
    name: user.name.trim(),
    email,
    password: user.password,
    mobile: (user.mobile || "").trim(),
    role
  });

  localStorage.setItem(
    "users",
    JSON.stringify(users)
  );

  return "Registration successful!";
}

export function loginUser(
  email,
  password,
  selectedRole = "user"
) {
  const cleanEmail = email.trim().toLowerCase();

  if (
    selectedRole === "admin" &&
    cleanEmail === ADMIN_EMAIL &&
    password === ADMIN_PASSWORD
  ) {
    const admin = {
      name: "Administrator",
      email: ADMIN_EMAIL,
      role: "admin"
    };

    localStorage.setItem(
      "currentUser",
      JSON.stringify(admin)
    );

    return admin;
  }

  const user = readUsers().find(
    u =>
      u.email.toLowerCase() === cleanEmail &&
      u.password === password &&
      u.role === selectedRole
  );

  if (!user) return null;

  const { password: omitted, ...session } = user;

  localStorage.setItem(
    "currentUser",
    JSON.stringify(session)
  );

  return session;
}

export function getCurrentUser() {
  try {
    return JSON.parse(
      localStorage.getItem("currentUser") || "null"
    );
  } catch {
    return null;
  }
}

export function logoutUser() {
  localStorage.removeItem("currentUser");
}

export function getRegisteredFarmers() {
  return readUsers().filter(
    u => u.role === "user"
  );
}

export function deleteFarmer(email) {
  const users = readUsers().filter(
    u =>
      u.role !== "user" ||
      u.email.toLowerCase() !== email.toLowerCase()
  );

  localStorage.setItem(
    "users",
    JSON.stringify(users)
  );

  return users.filter(u => u.role === "user");
}