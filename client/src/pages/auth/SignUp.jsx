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

const SignUp = () => {
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
                                    Name
                                </FieldLabel>
                                <Input
                                    id="checkout-7j9-card-name-43j"
                                    placeholder="example@example.com"
                                    required
                                    className="form-input"
                                />
                            </Field>
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
                            <Field>
                                <FieldLabel htmlFor="checkout-7j9-card-number-uw1">
                                    Password
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
                        <div className="mt-4">
                        <Button type="submit" className="form-btn w-full">SignUp</Button>
                        </div>
                        <div className="text-center mt-4">
                            <span className="text-sm pr-1">Have an Account?</span>
                            <Link
                                to="/auth/signin"
                                className="text-sm text-primary hover:underline"
                            >
                            signin
                            </Link>
                        </div>
                    </Field>
                </FieldGroup>
            </form>
        </div>
    )
}

export default SignUp;
