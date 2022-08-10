import { SearchBar } from "~/components";
import { sections } from "./Sections";
import CollapseSection from "./CollapseSection";
import styles from "./grade.module.scss";

function Grade() {
  return (
    <div className={styles["grade"]}>
      <SearchBar page={"student name or FPT ID"} />
      <div class="card mb-3 col-12 col-md-6">
        <div className="card-body">
          <h3 className="card-title">Truong Quoc Khanh</h3>
          <p className="card-text">
            FPT_ID: GCS190795
          </p>
          <p className="card-text">
            Pearson_ID: KhanhTQ190795
          </p>
          <p className="card-text">
            UOG_ID: UOG190795
          </p>
        </div>
      </div>
      {sections.map((section) => (
        <CollapseSection
          key={section.id}
          title={section.title}
          color={section.color}
        />
      ))}
    </div>
  );
}

export default Grade;
