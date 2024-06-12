import { jwtDecode } from "jwt-decode";

export default function checkUserRole() {
  return jwtDecode<{ role: string }>(localStorage.getItem("access_token")!);
}
