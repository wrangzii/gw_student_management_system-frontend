import styles from "~/styles/components/form.module.scss";

function HeadingTitle({ title, form }) {
  return (
    <h2
      className={`${styles["form-heading"]} ${
        form === "create" ? "bg-success" : form === "update" ? "bg-warning" : ""
      }`}
    >
      {`${
        form === "create"
          ? "creating a new"
          : form === "update"
          ? "updating"
          : ""
      } ${title}`}
    </h2>
  );
}

export default HeadingTitle;
