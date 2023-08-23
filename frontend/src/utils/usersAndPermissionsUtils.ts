import { asyncFetcher } from "@/utils/graphql";

export const userExists = async (email: string) => {
    const findUser = `query {
      usersPermissionsUsers(filters: { email: {eq: "${email}"} }) {
        data {
          id
        }
      }
    }`;
    try {
      const data = await asyncFetcher(findUser);
      if (data?.usersPermissionsUsers.data.length == 0) {
        return false;
      } else {
        console.log(data?.usersPermissionsUsers.data)
        return true;
      }
    } catch (error) {
      console.error(error);
      console.log("hi")
      return true;
    }
  };


  export const getPasswordError = (password: string, confirmPassword: string) => {
    if (password.length < 8) {
      return "Password must be at least 8 characters long";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        password
      )
    ) {
      return "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character";
    } else if (password != confirmPassword) {
      return "Passwords do not match";
    }
    return false;
  };