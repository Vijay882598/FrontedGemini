export function Textarea({ className = "", ...props }) {
  return (
    <textarea
      className={`w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      {...props}
    />
  )
}
