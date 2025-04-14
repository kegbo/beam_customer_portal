import { AuthHeader } from "../AuthLayout";
import { LoginForm } from "./LoginForm";

export default function LoginPage() {
  return (
    <>
      <AuthHeader
        title={"Sign in to Beam."}
        description={"Please sign in with the your assigned login details"}
      />
      <LoginForm />
    </>
  );
}
