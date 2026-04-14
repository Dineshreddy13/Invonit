import React, { useState } from "react";
import useBusinessStore from "../store/businessStore";
import { Modal } from "./ui/Modal";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { Label } from "./ui/Label";
import { Select } from "./ui/Select";
import { Textarea } from "./ui/Textarea";
import { AlertCircle } from "lucide-react";

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
].map(state => ({ value: state, label: state }));

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
    <Modal
      isOpen={open}
      onClose={() => {}} // Forced modal, no close button for initial setup
      title="Create your Business"
      description="You need to set up a business account before you can use the app."
      size="lg"
      footer={
        <Button onClick={handleSubmit} isLoading={creating} className="w-full">
          Create Business
        </Button>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Validation errors */}
        {hasErrors && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 animate-in slide-in-from-top-2 duration-200">
            <div className="flex gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 shrink-0" />
              <div className="flex flex-col gap-1">
                <p className="text-sm font-semibold text-red-800">Please correct the following errors:</p>
                <ul className="text-sm text-red-700 list-disc list-inside space-y-0.5">
                  {fieldErrors.length > 0
                    ? fieldErrors.map((e, i) => <li key={i}>{e}</li>)
                    : <li>{error}</li>
                  }
                </ul>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="name">Business Name <span className="text-red-500">*</span></Label>
              <Input
                id="name"
                name="name"
                placeholder="Acme Pvt. Ltd."
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="businessType">Business Type</Label>
              <Select 
                id="businessType"
                value={form.businessType} 
                onValueChange={handleSelectChange("businessType")}
                options={BUSINESS_TYPES}
              />
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="9876543210"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-1.5">
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
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="gstin">GSTIN (Optional)</Label>
                <Input
                  id="gstin"
                  name="gstin"
                  placeholder="22AAAAA0000A1Z5"
                  value={form.gstin}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="pan">PAN (Optional)</Label>
                <Input
                  id="pan"
                  name="pan"
                  placeholder="AAAPL1234C"
                  value={form.pan}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="address">Full Address</Label>
              <Textarea
                id="address"
                name="address"
                placeholder="123 Main Street, Sector 5..."
                value={form.address}
                onChange={handleChange}
                rows={4}
              />
            </div>
          </div>
        </div>

        {/* Location Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-slate-100 pt-6">
          <div className="space-y-1.5">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              name="city"
              placeholder="Mumbai"
              value={form.city}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="state">State</Label>
            <Select 
              id="state"
              value={form.state} 
              onValueChange={handleSelectChange("state")}
              options={INDIAN_STATES}
              placeholder="Select state"
              align="top"
            />
          </div>

          <div className="space-y-1.5">
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
      </form>
    </Modal>
  );
}
