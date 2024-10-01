import http from "@/lib/http";
import { AccountResType } from "@/schemaValidations/account.schema";
const accountApiRequest = {
  // Đây là api gọi me của serve
  me: (sessionToken: string) =>
    http.get<AccountResType>("account/me", {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    }),

  // Đây là api gọi me của phía client
  meClient: () => http.get<AccountResType>("account/me"),
};
export default accountApiRequest;
