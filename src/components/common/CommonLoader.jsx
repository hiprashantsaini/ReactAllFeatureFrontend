const CommonLoader = ({ show = false, text = "Loading..." }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div
        className="flex min-w-[220px] flex-col items-center gap-4 rounded-2xl border p-6 shadow-xl"
        style={{
          backgroundColor: "var(--secondary-bg)",
          borderColor: "var(--primary-border)",
        }}
      >
        <div className="relative h-12 w-12">
          <div
            className="absolute inset-0 animate-spin rounded-full border-4 border-transparent"
            style={{
              borderTopColor: "var(--accent-color1)",
              borderRightColor: "var(--accent-color2)",
            }}
          />
        </div>

        <p
          className="text-sm font-medium"
          style={{ color: "var(--secondary-text)" }}
        >
          {text}
        </p>
      </div>
    </div>
  );
};

export default CommonLoader;