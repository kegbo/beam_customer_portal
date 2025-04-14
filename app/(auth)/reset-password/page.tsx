import { AuthHeader } from "../AuthLayout";
import { ResetPasswordSentContent } from "./ResetPasswordSentContent";


export default function ResetPasswordSentPage() {
  return (
    <>
      <AuthHeader
        title={"Check Your Email"}
        description={"We've sent a password reset link to your email address"}
      />
      <ResetPasswordSentContent />
    </>
  );
}