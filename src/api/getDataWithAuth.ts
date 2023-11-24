import axios from "axios";

const getDataWithAuth = async (url: string, options = {}) => {
  // TODO: Auth Token은 Zustand에 저장하고, 가져오는 식으로 구현한다.
  const fetchOptions = {
    ...options,
  };
  const { data } = await axios.get(url, fetchOptions);
  return data;
};

export default getDataWithAuth;
