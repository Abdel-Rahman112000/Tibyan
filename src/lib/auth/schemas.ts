import { z } from "zod";

// Schema factory that accepts translation function
export function createLoginSchema(t: (key: string) => string) {
  return z.object({
    email: z
      .string()
      .min(1, { message: t("emailRequired") })
      .email({ message: t("emailInvalid") }),
    password: z
      .string()
      .min(1, { message: t("passwordRequired") })
      .min(8, { message: t("passwordMin") }),
  });
}

export function createRegisterSchema(t: (key: string) => string) {
  return z
    .object({
      firstName: z
        .string()
        .min(1, { message: t("firstNameRequired") })
        .min(2, { message: t("firstNameMin") })
        .max(50, { message: t("firstNameMax") }),
      lastName: z
        .string()
        .min(1, { message: t("lastNameRequired") })
        .min(2, { message: t("lastNameMin") })
        .max(50, { message: t("lastNameMax") }),
      email: z
        .string()
        .min(1, { message: t("emailRequired") })
        .email({ message: t("emailInvalid") }),
      phone: z
        .string()
        .min(1, { message: t("phoneRequired") })
        .regex(/^\+?[1-9]\d{7,14}$/, {
          message: t("phoneInvalid"),
        }),
      password: z
        .string()
        .min(1, { message: t("passwordRequired") })
        .min(8, { message: t("passwordMin") })
        .regex(/[A-Z]/, {
          message: t("passwordUppercase"),
        })
        .regex(/[a-z]/, {
          message: t("passwordLowercase"),
        })
        .regex(/[0-9]/, {
          message: t("passwordNumber"),
        }),
      confirmPassword: z
        .string()
        .min(1, { message: t("confirmPasswordRequired") }),
      country: z.string().min(1, { message: t("countryRequired") }),
      role: z.enum(["student", "teacher"], {
        message: t("roleRequired"),
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("passwordsMismatch"),
      path: ["confirmPassword"],
    });
}

// Static schemas (English fallback for non-i18n contexts)
export const loginSchema = createLoginSchema((key) => {
  const messages: Record<string, string> = {
    emailRequired: "Email is required",
    emailInvalid: "Invalid email address",
    passwordRequired: "Password is required",
    passwordMin: "Password must be at least 8 characters",
  };
  return messages[key] || key;
});

export const registerSchema = createRegisterSchema((key) => {
  const messages: Record<string, string> = {
    firstNameRequired: "First name is required",
    firstNameMin: "First name must be at least 2 characters",
    firstNameMax: "First name must be less than 50 characters",
    lastNameRequired: "Last name is required",
    lastNameMin: "Last name must be at least 2 characters",
    lastNameMax: "Last name must be less than 50 characters",
    emailRequired: "Email is required",
    emailInvalid: "Invalid email address",
    phoneRequired: "Phone number is required",
    phoneInvalid: "Invalid phone number format",
    passwordRequired: "Password is required",
    passwordMin: "Password must be at least 8 characters",
    passwordUppercase: "Password must contain at least one uppercase letter",
    passwordLowercase: "Password must contain at least one lowercase letter",
    passwordNumber: "Password must contain at least one number",
    confirmPasswordRequired: "Please confirm your password",
    countryRequired: "Country is required",
    roleRequired: "Please select a role",
    passwordsMismatch: "Passwords don't match",
  };
  return messages[key] || key;
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
