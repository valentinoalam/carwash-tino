import { CheckCircleIcon } from "lucide-react";

interface FormSuccessProps {
  message?: string;
}

export function FormSuccess({ message }: FormSuccessProps) {
  if (!message) return null;
  
  return (
    <div className="flex items-center gap-x-2 text-emerald-600 text-sm mt-1 animate-in fade-in-50 duration-300">
      <CheckCircleIcon className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
}