interface LoadingProps {
  message?: string;
  color?: string;
}

export default function Loading({ message, color = "blue" }: LoadingProps) {
  const spinner = `w-10 h-10 border-4 border-${color}-500 border-t-transparent rounded-full animate-spin`;
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <div role="status" className={spinner} />
      <p className="text-gray-700x text-lg">{message}</p>
    </div>
  );
}
