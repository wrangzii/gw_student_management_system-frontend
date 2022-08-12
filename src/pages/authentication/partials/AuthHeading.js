import React from "react";
import styles from "~/styles/components/form.module.scss";

function AuthHeading({ form }) {
  return (
    <h2
      className={`${styles["form-heading"]} bg-${
        form === "login" ? "primary" : form === "forgot" ? "warning" : "success"
      } text-uppercase`}
    >
      {form === "login"
        ? "welcome to cms"
        : form === "forgot"
        ? "forgot password"
        : "reset password"}
    </h2>
  );
}

export default AuthHeading;
