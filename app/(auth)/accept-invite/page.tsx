import { AuthHeader } from "../AuthLayout";
import { AcceptInviteForm } from "./AcceptInviteForm";

export default function LoginPage() {
  return (
    <>
      <AuthHeader
        title={"Setup your account."}
        description={
          "Complete the form below to create your account and get started."
        }
      />
      <AcceptInviteForm />
    </>
  );
}
