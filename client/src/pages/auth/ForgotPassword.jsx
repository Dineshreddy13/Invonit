import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/store/authStore";
import { OTP_MODE, AUTH_ROUTES } from "@/lib/constants";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { forgotPassword, loading, error } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const res = await forgotPassword(data.email);

    if (res.success) {
      navigate(`${AUTH_ROUTES.VERIFY_OTP}?requestId=${res.requestId}&type=${OTP_MODE.RESET}`);
    }
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Invonit</FieldLegend>
            <FieldDescription>
              Enter your email to reset password.
            </FieldDescription>

            <FieldGroup>
              <Field>
                <FieldLabel>Email</FieldLabel>
                <Input
                  type="email"
                  placeholder="example@example.com"
                  {...register("email", {
                    required: "Email is required",
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">
                    {errors.email.message}
                  </p>
                )}
              </Field>
            </FieldGroup>
          </FieldSet>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Sending..." : "Send OTP"}
          </Button>

          {error && (
            <p className="text-red-500 text-sm text-center mt-2">
              {error}
            </p>
          )}
        </FieldGroup>
      </form>
    </div>
  );
};

export default ForgotPassword;