import {
  requestRegisteration,
  verifyAndRegister,
  resendRegistrationOTP,
  loginUser,
  getUserById,
} from "./auth.service.js";

export const startRegisteration = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: "Name, email, and password are required."
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters."
      });
    }

    await requestRegisteration({ name, email, phone, password });

    return res.status(200).json({
      success: true,
      message: "OTP sent to your email. Valid for 10 minutes."
    });

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

export const completeRegisteration = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required."
      });
    }

    const { user, token } = await verifyAndRegister({ email, otp });

    return res.status(201).json({
      success: true,
      message: "Email verified. Registration successful.",
      data: { user, token },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

export const resendRegistrationOTPHandler = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({
      success: false,
      message: "Email is required."
    });

    await resendRegistrationOTP(email);

    return res.status(200).json({
      success: true,
      message: "New OTP sent to your email."
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required."
      });
    }

    const { user, token } = await loginUser({ email, password });

    return res.status(200).json({
      success: true,
      message: "Login successful.", 
      data: { user, token } 
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await getUserById(req.user.id);
    return res.status(200).json({
      success: true,
      data: { user }
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};