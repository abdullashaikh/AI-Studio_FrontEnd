export interface LoginPayload {
  identifier: string;   // email or phone
  method: "email" | "phone";
  password: string;
}
  export interface SignupPayload {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
  }
  