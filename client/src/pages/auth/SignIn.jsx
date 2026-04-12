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

const SignIn = () => {
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
                        </FieldGroup>
                    </FieldSet>

                    <Field orientation="">
                        <div className="mt-4">
                        <div className="flex justify-end items-center mb-2">
                            <Link
                                to="/auth/forgot-password"
                                className="text-sm text-primary hover:underline"
                            >
                                Forgot password?
                            </Link>
                        </div>
                        <Button type="submit" className="form-btn w-full">SignIn</Button>
                        </div>
                        <div className="text-center mt-4">
                            <span className="text-sm pr-1">Want to create a Business Account?</span>
                            <Link
                                to="/auth/signup"
                                className="text-sm text-primary hover:underline"
                            >
                            Click here.
                            </Link>
                        </div>
                    </Field>
                </FieldGroup>
            </form>
        </div>
    )
}

export default SignIn;
