import { Button } from "@/components/ui/button"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSeparator,
    FieldSet,
} from "@/components/ui/field"
import { RefreshCcw } from "lucide-react"

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { REGEXP_ONLY_DIGITS } from "input-otp"

const OtpVerification = () => {
    return (
        <div className="w-full max-w-md">
            <form>
                <FieldGroup>
                    <FieldSet>
                        <FieldLegend>Verify your email</FieldLegend>
                        <FieldDescription>
                            Enter verification code we sent to your email.
                        </FieldDescription>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                                    Verification code
                                </FieldLabel>
                                <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS}>
                                    <InputOTPGroup>
                                        <InputOTPSlot className="form-input" index={0} />
                                        <InputOTPSlot className="form-input" index={1} />
                                        <InputOTPSlot className="form-input" index={2} />
                                    </InputOTPGroup>
                                    <InputOTPSeparator />
                                    <InputOTPGroup>
                                        <InputOTPSlot className="form-input" index={3} />
                                        <InputOTPSlot className="form-input" index={4} />
                                        <InputOTPSlot className="form-input" index={5} />
                                    </InputOTPGroup>
                                </InputOTP>

                            </Field>
                        </FieldGroup>
                        <FieldDescription>
                            This code wil expire in 10 minutes.
                        </FieldDescription>
                    </FieldSet>

                    <Field orientation="horizantal">
                        <Button type="submit" className="form-btn">Verify</Button>
                        <Button type="button" variant="outline" className="form-btn">
                            <RefreshCcw/>
                            Resend
                            </Button>
                    </Field>
                </FieldGroup>
            </form>
        </div>
    )
}

export default OtpVerification;
