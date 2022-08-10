import { SearchBar } from "~/components";
import { sections } from "./Sections";
import SectionBtn from "./SectionBtn";
import styles from "./grade.module.scss";

function Grade() {
  return (
    <div className={styles["grade"]}>
      <SearchBar page={"student name or FPT ID"} />
      <h3>Ten sinh vien - MSSV</h3>
      {sections.map((section) => (
        <SectionBtn
          key={section.id}
          title={section.title}
          color={section.color}
        />
      ))}
    </div>
  );
}

export default Grade;
