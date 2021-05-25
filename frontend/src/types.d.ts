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
  type: number,
  category: number,
  amount: number,
  comment: string 
}
