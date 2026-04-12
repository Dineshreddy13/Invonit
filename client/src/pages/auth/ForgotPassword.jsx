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

const ForgotPassword = () => {
    return (
        <div className="w-full max-w-md">
            <form>
                <FieldGroup>
                    <FieldSet>
                        <FieldLegend>Invonit</FieldLegend>
                        <FieldDescription>
                            welcome to the Invonit.
                        </FieldDescription>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                                    Email
                                </FieldLabel>
                                <Input
                                    id="checkout-7j9-card-name-43j"
                                    placeholder="example@example.com"
                                    required
                                    className="form-input"
                                />
                            </Field>
                        </FieldGroup>
                    </FieldSet>

                    <Field orientation="horizantal">
                        <Button type="submit" className="form-btn">Send Otp</Button>
                    </Field>
                </FieldGroup>
            </form>
        </div>
    )
}

export default ForgotPassword;
