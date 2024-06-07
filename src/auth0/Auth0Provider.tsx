"use client";

import { Auth0Provider } from "@auth0/auth0-react";

function AuthOProvider({ children }: { children: React.ReactNode }) {
  return (
    <Auth0Provider
      domain="dev-zse8qge31om0dwlh.us.auth0.com"
      clientId="558TIlmIBmSjf5Ncu2An2o7sYcm5K0Hw"
      authorizationParams={{
        redirect_uri:
          typeof window !== "undefined" ? window.location.origin : undefined,
      }}
    >
      {children}
    </Auth0Provider>
  );
}

export default AuthOProvider;
