import { Link } from "react-router-dom";
import styles from "./navigateAction.module.scss";

function NavigateAction({ title }) {
  return (
    <ul className={styles["navigate-action"]}>
      <li className="text-success">
        <h1 className="text-capitalize">{title}</h1>
      </li>
      <Link to={`/${title}/view`}>
        <li className="text-success">View</li>
      </Link>
      <Link to={`/${title}/create`}>
        <li className="text-success">Create</li>
      </Link>
    </ul>
  );
}

export default NavigateAction;
