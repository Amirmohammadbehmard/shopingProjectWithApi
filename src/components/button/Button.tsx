import { ComponentProps } from "react";
type TVariant = "primary" | "secondary" | "danger" | "warning" | "success";
type TButton = ComponentProps<"button"> & {
  variant?: TVariant;
};

function Button({ children, variant, ...rest }: TButton) {
  return (
    <button
      className="rounded-md px-4 py-2 my-1 w-full flex justify-center"
      style={{ ...checkVariant(variant) }}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
function checkVariant(variant?: TVariant) {
  if (variant === "primary")
    return { backgroundColor: "#0D6EFD", color: "white" };
  else if (variant === "secondary")
    return { backgroundColor: "#595C5F", color: "white" };
  else if (variant === "danger")
    return { backgroundColor: "#DC3545", color: "white" };
  else if (variant === "warning")
    return { backgroundColor: "#FFC107", color: "black" };
  else if (variant === "success")
    return { backgroundColor: "#198754", color: "white" };
}
