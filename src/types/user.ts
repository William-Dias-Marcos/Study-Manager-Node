export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  validated_at: Date | null;
  created_at: Date;
  updated_at: Date;
}
