export function Card({ className = "", children }) {
  return (
    <div className={`border rounded-lg shadow-sm ${className}`}>
      {children}
    </div>
  )
}
