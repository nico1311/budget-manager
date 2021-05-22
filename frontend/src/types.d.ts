export interface LoginPayload {
  email: string,
  password: string
}

export interface SignUpPayload {
  name: string,
  email: string,
  password: string,
  password_confirmation: string
}

export interface Transaction {
  id: number,
  user_id: number,
  created_at: string,
  type: 1 | 2,
  category?: (0 | 1 | 2 | 3 | 4 | 5 | 6),
  amount: number,
  comment: string
}
