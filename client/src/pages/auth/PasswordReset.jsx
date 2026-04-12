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
import { Input } from "@/components/ui/input"
import { Link } from "react-router-dom"

const PasswordReset = () => {
    return (
        <div className="w-full max-w-md">
            <form>
                <FieldGroup>
                    <FieldSet>
                        <FieldLegend>Invonit</FieldLegend>
                        <FieldDescription>
                            Reset your password.
                        </FieldDescription>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="checkout-7j9-card-number-uw1">
                                    New password
                                </FieldLabel>
                                <Input
                                    id="checkout-7j9-card-number-uw1"
                                    placeholder="password"
                                    required
                                    type="password"
                                    className="form-input"
                                />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="checkout-7j9-card-number-uw1">
                                    Confirm Password
                                </FieldLabel>
                                <Input
                                    id="checkout-7j9-card-number-uw1"
                                    placeholder="password"
                                    required
                                    type="password"
                                    className="form-input"
                                />
                            </Field>
                        </FieldGroup>
                    </FieldSet>

                    <Field orientation="">
                        <Button type="submit" className="form-btn w-full">Reset password</Button>
                    </Field>
                </FieldGroup>
            </form>
        </div>
    )
}

export default PasswordReset;
