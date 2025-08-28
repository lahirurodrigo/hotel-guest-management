interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  className?: string
  onValueChange?: (value: string) => void
}

export const Input: React.FC<InputProps> = ({ label, className, onValueChange, ...props }) => {
  return (
    <div className="flex flex-col space-y-1">
      {label && <label>{label}</label>}
      <input
        {...props}
        onChange={(e) => onValueChange && onValueChange(e.target.value)}
        className={`border ... ${className}`}
      />
    </div>
  )
}

