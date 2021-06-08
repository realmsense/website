import { SetMetadata } from "@nestjs/common";

export const jwtConstants = {
    secret: "MqC3wKCBsgdcrNcf9XRZ3qDJhZVE7sppLuoy39AksJqPLtJuGBVTTXwDdqyaARzQ"
};

export const SKIP_JWT_KEY = "skipJWT";
export const SkipJWTAuth = () => SetMetadata(SKIP_JWT_KEY, true);
