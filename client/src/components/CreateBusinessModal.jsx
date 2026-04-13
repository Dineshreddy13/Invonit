import { useState } from "react";
import useBusinessStore from "@/store/businessStore";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const BUSINESS_TYPES = [
  { value: "retail", label: "Retail" },
  { value: "wholesale", label: "Wholesale" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "service", label: "Service" },
  { value: "other", label: "Other" },
];

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry",
];

const DEFAULT_FORM = {
  name: "",
  businessType: "retail",
  phone: "",
  email: "",
  gstin: "",
  pan: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
};

export default function CreateBusinessModal({ open }) {
  const [form, setForm] = useState(DEFAULT_FORM);
  const [fieldErrors, setFieldErrors] = useState([]);

  const { creating, error, createBusiness } = useBusinessStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Auto-uppercase GSTIN and PAN so they match the server regex
    const finalValue = (name === "gstin" || name === "pan")
      ? value.toUpperCase()
      : value;
    setForm((prev) => ({ ...prev, [name]: finalValue }));
  };

  const handleSelectChange = (field) => (value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFieldErrors([]);

    if (!form.name.trim() || form.name.trim().length < 2) {
      setFieldErrors(["Business name is required and must be at least 2 characters."]);
      return;
    }

    // Strip empty optional fields so server skips their validation
    const payload = Object.fromEntries(
      Object.entries(form).filter(([, v]) => v !== "")
    );

    const result = await createBusiness(payload);
    if (!result.success) {
      setFieldErrors(result.errors?.length ? result.errors : [result.message]);
    }
  };

  const hasErrors = fieldErrors.length > 0 || !!error;

  return (
    <Dialog open={open} modal>
      <DialogContent showCloseButton={false} className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create your Business</DialogTitle>
          <DialogDescription>
            You need to set up a business account before you can use the app.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {/* Validation errors */}
          {hasErrors && (
            <ul className="rounded-md border border-destructive bg-destructive/10 p-3 text-sm text-destructive list-disc list-inside space-y-1">
              {fieldErrors.length > 0
                ? fieldErrors.map((e, i) => <li key={i}>{e}</li>)
                : <li>{error}</li>
              }
            </ul>
          )}

          {/* Business Name */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="name">Business Name *</Label>
            <Input
              id="name"
              name="name"
              placeholder="Acme Pvt. Ltd."
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Business Type */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="businessType">Business Type</Label>
            <Select value={form.businessType} onValueChange={handleSelectChange("businessType")}>
              <SelectTrigger id="businessType" className="w-full">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {BUSINESS_TYPES.map((t) => (
                  <SelectItem key={t.value} value={t.value}>
                    {t.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Phone & Email */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                placeholder="9876543210"
                value={form.phone}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">Business Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="info@acme.com"
                value={form.email}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* GSTIN & PAN */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="gstin">GSTIN</Label>
              <Input
                id="gstin"
                name="gstin"
                placeholder="22AAAAA0000A1Z5"
                value={form.gstin}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="pan">PAN</Label>
              <Input
                id="pan"
                name="pan"
                placeholder="AAAPL1234C"
                value={form.pan}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Address */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              name="address"
              placeholder="123 Main Street"
              value={form.address}
              onChange={handleChange}
            />
          </div>

          {/* City, State (Select), Pincode */}
          <div className="grid grid-cols-3 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                name="city"
                placeholder="Mumbai"
                value={form.city}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="state">State</Label>
              <Select value={form.state} onValueChange={handleSelectChange("state")}>
                <SelectTrigger id="state" className="w-full">
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  {INDIAN_STATES.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="pincode">Pincode</Label>
              <Input
                id="pincode"
                name="pincode"
                placeholder="400001"
                value={form.pincode}
                onChange={handleChange}
              />
            </div>
          </div>

          <DialogFooter className="mt-2">
            <Button type="submit" disabled={creating} className="w-full">
              {creating ? "Creating…" : "Create Business"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
