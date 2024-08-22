import { cn } from "@/lib/utils";

const Container = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-8 lg:px-4", className)}>
      {children}
    </div>
  );
};

export default Container;
