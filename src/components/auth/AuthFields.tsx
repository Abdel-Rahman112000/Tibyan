"use client";

import * as React from "react";
import { TextField, MenuItem, type TextFieldProps } from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";
import { useLocale } from "next-intl";
import { RADIUS } from "@/theme/spacing";

function useFieldStyles() {
  const theme = useTheme();
  const locale = useLocale();
  const isRtl = locale === "ar";

  const fieldSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: RADIUS.medium,
      backgroundColor: alpha(theme.palette.background.paper, 0.26),
      transition: "all 0.2s ease",
      "& fieldset": {
        borderColor: alpha(theme.palette.divider, 0.9),
      },
      "&:hover fieldset": {
        borderColor: alpha(theme.palette.primary.main, 0.45),
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.primary.main,
        borderWidth: "1px",
      },
    },
    "& .MuiInputLabel-root": {
      color: theme.palette.text.secondary,
      fontSize: "0.875rem",
      fontWeight: 500,
      // RTL: anchor label to right edge and flip the x-axis of the transform
      ...(isRtl && {
        right: 0,
        left: "auto",
        transformOrigin: "top right",
        // size="small" resting position
        "&.MuiInputLabel-sizeSmall:not(.MuiInputLabel-shrink)": {
          transform: "translate(-14px, 9px) scale(1)",
        },
        // size="medium" resting position
        "&:not(.MuiInputLabel-sizeSmall):not(.MuiInputLabel-shrink)": {
          transform: "translate(-14px, 16px) scale(1)",
        },
        // shrunk (floating on the border) – same y for both sizes
        "&.MuiInputLabel-shrink": {
          transform: "translate(-14px, -9px) scale(0.75)",
        },
      }),
    },
    // Move the notch gap to the right for RTL
    ...(isRtl && {
      "& .MuiOutlinedInput-notchedOutline legend": {
        textAlign: "right",
      },
    }),
    "& .MuiFormHelperText-root": {
      textAlign: isRtl ? "right" : "left",
      marginInlineStart: 0,
      marginInlineEnd: 0,
    },
    "& .MuiSelect-icon": {
      right: isRtl ? "auto" : 7,
      left: isRtl ? 7 : "auto",
    },
  };

  const fieldSlotProps = {
    htmlInput: {
      dir: isRtl ? "rtl" : "ltr",
      style: { textAlign: isRtl ? "right" : "left" } as React.CSSProperties,
    },
  };

  const selectSlotProps = {
    select: {
      MenuProps: {
        anchorOrigin: {
          vertical: "bottom" as const,
          horizontal: isRtl ? ("right" as const) : ("left" as const),
        },
        transformOrigin: {
          vertical: "top" as const,
          horizontal: isRtl ? ("right" as const) : ("left" as const),
        },
        PaperProps: {
          sx: {
            maxHeight: 300,
            direction: isRtl ? "rtl" : "ltr",
            "& .MuiMenuItem-root": {
              justifyContent: isRtl ? "flex-end" : "flex-start",
              textAlign: isRtl ? "right" : "left",
            },
          },
        },
      },
    },
  };

  return { fieldSx, fieldSlotProps, selectSlotProps, isRtl };
}

// Shared text input component
export type AuthTextFieldProps = Omit<TextFieldProps, "sx" | "slotProps"> & {
  extraSlotProps?: Record<string, unknown>;
};

export const AuthTextField = React.forwardRef<
  HTMLInputElement,
  AuthTextFieldProps
>(function AuthTextField({ extraSlotProps, ...props }, ref) {
  const { fieldSx, fieldSlotProps } = useFieldStyles();

  return (
    <TextField
      fullWidth
      sx={fieldSx}
      slotProps={{ ...fieldSlotProps, ...extraSlotProps }}
      inputRef={ref}
      {...props}
    />
  );
});

// Shared select/menu input component
export interface SelectOption {
  value: string;
  label: string;
}

export interface AuthSelectFieldProps {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  name?: string;
  size?: "small" | "medium";
  error?: boolean;
  helperText?: React.ReactNode;
  disabled?: boolean;
  options: SelectOption[];
}

export const AuthSelectField = React.forwardRef<
  HTMLInputElement,
  AuthSelectFieldProps
>(function AuthSelectField(
  {
    label,
    value,
    onChange,
    onBlur,
    name,
    size,
    error,
    helperText,
    disabled,
    options,
  },
  ref,
) {
  const { fieldSx, selectSlotProps } = useFieldStyles();

  return (
    <TextField
      select
      fullWidth
      label={label}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      name={name}
      size={size}
      error={error}
      helperText={helperText}
      disabled={disabled}
      sx={fieldSx}
      slotProps={selectSlotProps}
      inputRef={ref}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
});

export { useFieldStyles };
