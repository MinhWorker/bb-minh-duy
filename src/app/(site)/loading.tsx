export default function Loading() {
  return (
    <div className="site-container route-loading" role="status" aria-live="polite">
      <span className="loading-stem" aria-hidden="true" />
      <p>Đang chuẩn bị nội dung…</p>
    </div>
  );
}

