function reportWebVitals(metric) {
  const body = JSON.stringify({ [metric.name]: metric.value });
  // Use `navigator.sendBeacon()` if available, falling back to `fetch()`.
  (navigator.sendBeacon && navigator.sendBeacon("/api/analytics", body)) ||
    fetch("/api/analytics", { body, method: "POST", keepalive: true });
}
export default reportWebVitals;
