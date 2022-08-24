function ViewDetail({ children }) {
  return (
    <div className="view-detail">
      <div className="overflow-auto">{children}</div>
    </div>
  );
}

export default ViewDetail;
