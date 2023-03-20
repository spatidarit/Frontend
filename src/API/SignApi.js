import axios from "axios";

class SignApi {
  signInApi = async (payload) => {
    return await axios.post("http://localhost:3001/users/login", payload);
  };
}
export default SignApi;
