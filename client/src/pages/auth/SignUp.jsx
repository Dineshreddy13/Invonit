import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
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

const SignUp = () => {
  const navigate = useNavigate();
  const { sendOTP, loading } = useAuthStore();

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

    const res = await sendOTP({
      name: data.name,
      email: data.email,
      phone: data.phone, // ✅ added
      password: data.password,
    });

    if (res.success) {
      navigate(`${AUTH_ROUTES.VERIFY_OTP}?requestId=${res.requestId}&type=${OTP_MODE.REGISTER}`);
    }
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Invonit</FieldLegend>
            <FieldDescription>
              Welcome to Invonit.
            </FieldDescription>

            <FieldGroup>
              {/* NAME */}
              <Field>
                <FieldLabel>Name</FieldLabel>
                <Input
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">
                    {errors.name.message}
                  </p>
                )}
              </Field>

              {/* EMAIL */}
              <Field>
                <FieldLabel>Email</FieldLabel>
                <Input
                  type="email"
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

              {/* 📱 PHONE */}
              <Field>
                <FieldLabel>Phone Number (optional)</FieldLabel>
                <Input
                  type="tel"
                  placeholder="9876543210"
                  {...register("phone", {
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Enter valid 10-digit number",
                    },
                  })}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">
                    {errors.phone.message}
                  </p>
                )}
              </Field>

              {/* PASSWORD */}
              <Field>
                <FieldLabel>Password</FieldLabel>
                <Input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
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

              {/* CONFIRM PASSWORD */}
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

          <div className="mt-4">
            <Button type="submit" className="w-full" disabled={loading}>
              Sign Up
            </Button>
          </div>

          <div className="text-center mt-4">
            <span className="text-sm pr-1">Have an Account?</span>
            <Link to={AUTH_ROUTES.SIGNIN} className="text-sm text-primary">
              Sign in
            </Link>
          </div>
        </FieldGroup>
      </form>
    </div>
  );
};

export default SignUp;