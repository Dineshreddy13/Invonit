import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import useAuthStore from "@/store/authStore";
import { AUTH_ROUTES } from "@/lib/constants";

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

const PasswordReset = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const requestId = searchParams.get("requestId");

  const { resetPassword, loading, error } = useAuthStore();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const res = await resetPassword(data.password);

    if (res.success) {
      navigate(AUTH_ROUTES.SIGNIN);
    }
  };

  // ❌ If user refreshes or no requestId
  if (!requestId) {
    navigate(AUTH_ROUTES.FORGOT_PASSWORD);
    return null;
  }

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Invonit</FieldLegend>
            <FieldDescription>
              Reset your password.
            </FieldDescription>

            <FieldGroup>
              <Field>
                <FieldLabel>New Password</FieldLabel>
                <Input
                  type="password"
                  {...register("password", {
                    required: "Password required",
                    minLength: {
                      value: 6,
                      message: "Minimum 6 characters",
                    },
                  })}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </Field>

              <Field>
                <FieldLabel>Confirm Password</FieldLabel>
                <Input
                  type="password"
                  {...register("confirmPassword", {
                    required: "Confirm your password",
                  })}
                />
              </Field>
            </FieldGroup>
          </FieldSet>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Resetting..." : "Reset Password"}
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

export default PasswordReset;