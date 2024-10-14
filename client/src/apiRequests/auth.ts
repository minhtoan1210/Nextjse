import http from "@/lib/http";
import {
  LoginBodyType,
  LoginResType,
  RegisterBodyType,
  RegisterResType,
} from "@/schemaValidations/auth.schema";


const authApiRequest = {
  //Api phía client
  login: (body: LoginBodyType) => http.post<LoginResType>("/auth/login", body),
  register: (body: RegisterBodyType) =>
    http.post<RegisterResType>("/auth/register", body),
  
  // Api phía serve
  // Khi mà nó chạy vào đây rồi thì cái ủl api cũng chính là đường dẫn đến thư mục luôn
  auth: (body: { sessionToken: string }) =>
    http.post("/api/auth", body, {
      baseUrl: "",
    }),
};
export default authApiRequest;
