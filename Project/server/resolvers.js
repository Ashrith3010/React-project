const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');  // For password hashing (optional)

const DB_PATH = path.join(__dirname, 'db.json');

const readDB = () => {
  const data = fs.readFileSync(DB_PATH, 'utf-8');
  return JSON.parse(data);
};

const writeDB = (data) => {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
};

const resolvers = {
  Mutation: {
    register: async (_, { username, email, password }) => {
      const db = readDB();
      const existingUser = db.users.find(user => user.email === email);
      if (existingUser) {
        throw new Error('User already exists');
      }
      
      // Hash the password before storing it (optional, recommended)
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = {
        id: String(db.users.length + 1),
        username,
        email,
        password: hashedPassword  // Store the hashed password
      };
      
      db.users.push(newUser);
      writeDB(db);
      
      const token = jwt.sign({ userId: newUser.id }, 'your-secret-key', { expiresIn: '1h' });
      return token;
    },
    login: async (_, { email, password }) => {
      const db = readDB();
      const user = db.users.find(user => user.email === email);
      if (!user) {
        throw new Error('User not found');
      }

      // Compare the plain text password with the stored hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error('Invalid password');
      }

      const token = jwt.sign({ userId: user.id }, 'your-secret-key', { expiresIn: '1h' });
      return token;
    },
    // ... other resolvers
  },
  // ... other resolver types
};

module.exports = resolvers;
