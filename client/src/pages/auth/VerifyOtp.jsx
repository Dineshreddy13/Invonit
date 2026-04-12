import { useSearchParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
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

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { REGEXP_ONLY_DIGITS } from "input-otp";
import { RefreshCcw } from "lucide-react";

const OtpVerification = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const requestId = searchParams.get("requestId");
  const type = searchParams.get("type"); // register | reset

  const {
    verifyOTP,
    verifyResetOTP,
    resendOTP,
    resendResetOTP,
    loading,
  } = useAuthStore();

  const { handleSubmit, setValue, watch } = useForm({
    defaultValues: { otp: "" },
  });

  const otp = watch("otp");

  if (!requestId || !type) {
    navigate(AUTH_ROUTES.SIGNIN);
    return null;
  }

  const onSubmit = async () => {
    let res;

    if (type === OTP_MODE.REGISTER) {
      res = await verifyOTP(otp);
      if (res.success) {
        navigate(AUTH_ROUTES.DASHBOARD);
      }
    } else if (type === OTP_MODE.RESET) {
      res = await verifyResetOTP(otp);
      if (res.success) {
        navigate(`${AUTH_ROUTES.RESET_PASSWORD}?requestId=${requestId}`);
      }
    }
  };

  const handleResend = async () => {
    if (type === OTP_MODE.REGISTER) {
      await resendOTP(requestId);
    } else if (type === OTP_MODE.RESET) {
      await resendResetOTP(requestId);
    }
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Verify your email</FieldLegend>
            <FieldDescription>
              Enter the verification code sent to your email.
            </FieldDescription>

            <Field>
              <FieldLabel>Verification Code</FieldLabel>

              <InputOTP
                maxLength={6}
                pattern={REGEXP_ONLY_DIGITS}
                value={otp}
                onChange={(value) => setValue("otp", value)}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </Field>

            <FieldDescription>
              Code expires in 10 minutes.
            </FieldDescription>
          </FieldSet>

          <Field orientation="horizontal">
            <Button type="submit" disabled={loading}>
              Verify
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={handleResend}
            >
              <RefreshCcw />
              Resend
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
};

export default OtpVerification;