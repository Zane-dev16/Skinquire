import React, { Dispatch, SetStateAction } from "react";
import { ApolloError } from "@apollo/client";

interface FormData {
  email: string;
  password: string;
}

interface FormProps {
  title: string;
  buttonText: string;
  formData: FormData;
  setFormData: Dispatch<SetStateAction<FormData>>;
  callback: (event: React.FormEvent<HTMLFormElement>) => Promise<void>; // Define the type for the async callback
  error: ApolloError | undefined;
}

const Form: React.FC<FormProps> = ({
  title,
  buttonText,
  formData,
  setFormData,
  callback,
  error,
}) => {
  return (
    <section>
      <div>
        <div>
          <h3>{title}</h3>
        </div>
        <form onSubmit={callback}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="************"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
          {error && <div>Error: {error.message}</div>}
          <button type="submit">{buttonText}</button>
        </form>
      </div>
    </section>
  );
};

export default Form;
