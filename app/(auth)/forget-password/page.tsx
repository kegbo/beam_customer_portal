import { AuthHeader } from "../AuthLayout";
import { ForgotPasswordForm } from "./ForgetPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <>
      <AuthHeader
        title={"Forgot Password"}
        description={"Enter your email to receive a password reset link"}
      />
      <ForgotPasswordForm />
    </>
  );
}
