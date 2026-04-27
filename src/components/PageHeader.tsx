import { ReactNode } from "react";
import { useAuth } from "../context/auth/AuthContextProvider";

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export default function PageHeader({
  title,
  description,
  action,
}: PageHeaderProps) {
  const { user } = useAuth();

  const isReadOnly = user?.role === "read-only admin";

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-text-dark">{title}</h1>

        {description && (
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        )}

        {/* 🔒 Read-only badge */}
        {isReadOnly && (
          <p className="mt-2 text-xs text-gray-500 bg-gray-100 inline-block px-2 py-1 rounded">
            You have read-only access
          </p>
        )}
      </div>

      {action && <div>{action}</div>}
    </div>
  );
}
