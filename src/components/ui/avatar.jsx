export function Avatar({ className = "", children }) {
  return (
    <div className={`rounded-full overflow-hidden flex items-center justify-center ${className}`}>
      {children}
    </div>
  )
}

export function AvatarFallback({ children }) {
  return (
    <div className="flex items-center justify-center w-full h-full bg-gray-300 text-white">
      {children}
    </div>
  )
}
