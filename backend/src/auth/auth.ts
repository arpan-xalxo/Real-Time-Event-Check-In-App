// Mock authentication: Accepts a static token and returns a user object
const MOCK_USERS = [
  { id: 'user1', name: 'Alice', email: 'alice@example.com' },
  { id: 'user2', name: 'Bob', email: 'bob@example.com' },
];

export function verifyToken(token: string) {
  // Accept 'token-alice'/'token-bob' 
  if (token === 'token-alice') return MOCK_USERS[0];
  if (token === 'token-bob') return MOCK_USERS[1];
  return null;
}
