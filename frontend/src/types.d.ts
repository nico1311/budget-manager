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
