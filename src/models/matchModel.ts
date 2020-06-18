import { fileURLToPath } from "url"

user sends request(app.ts) -> a route gets chosen (guest/auth/admin)
calls function out of model file(user/image/match)
calls query(dbservice.ts)