export const msalConfig = {
  auth: {
    clientId: "37e7664f-a5bf-4c61-a242-6876cab2f798", // Application (client) ID from Azure
    authority: "https://login.microsoftonline.com/30c5e7a3-5964-470d-be98-93300f843699", // Directory (tenant) ID
    redirectUri: "https://brave-grass-08c74060f.5.azurestaticapps.net", // Replace with your app's URL in production
  },
  cache: {
    cacheLocation: "sessionStorage", // or "localStorage"
    storeAuthStateInCookie: false,
  },
};