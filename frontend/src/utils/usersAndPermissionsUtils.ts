import { asyncFetcher } from "@/app/api/graphql";

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
        return true;
      }
    } catch (error) {
      console.error(error);
      return true;
    }
  };
