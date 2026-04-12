import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
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

const SignIn = () => {
  const navigate = useNavigate();
  const { login, loading, error } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const res = await login({
      email: data.email,
      password: data.password,
    });

    if (res.success) {
      navigate(AUTH_ROUTES.DASHBOARD);
    }
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Invonit</FieldLegend>
            <FieldDescription>
              Welcome back 👋
            </FieldDescription>

            <FieldGroup>
              {/* EMAIL */}
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

              {/* PASSWORD */}
              <Field>
                <FieldLabel>Password</FieldLabel>
                <Input
                  type="password"
                  placeholder="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </Field>
            </FieldGroup>
          </FieldSet>

          {/* ACTIONS */}
          <div className="mt-4">
            <div className="flex justify-end items-center mb-2">
              <Link
                to={AUTH_ROUTES.FORGOT_PASSWORD}
                className="text-sm text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>

            {/* GLOBAL ERROR */}
            {error && (
              <p className="text-red-500 text-sm mt-2 text-center">
                {error}
              </p>
            )}
          </div>

          <div className="text-center mt-4">
            <span className="text-sm pr-1">
              Want to create a Business Account?
            </span>
            <Link
              to="/auth/signup"
              className="text-sm text-primary hover:underline"
            >
              Click here.
            </Link>
          </div>
        </FieldGroup>
      </form>
    </div>
  );
};

export default SignIn;