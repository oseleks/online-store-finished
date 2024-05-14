import { httpRequest } from "../request/index.js";

const getBaseUrl = () => {
  const { BACKEND_URL } = window[Symbol.for("app-config")];

  return new URL("dashboard/", BACKEND_URL);
};

export const getBrands = async () => {
  const url = new URL("brand", getBaseUrl());
  const result = await httpRequest.get(url);

  return result;
};
