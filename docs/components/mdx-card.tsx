import {
  Card as FumadocsCard,
  type CardProps,
} from "fumadocs-ui/components/card";

export function MdxCard({ icon, title, ...props }: CardProps) {
  return (
    <FumadocsCard
      {...props}
      title={
        <span className="inline-flex items-center gap-2 [&_svg]:size-4">
          {icon}
          <span>{title}</span>
        </span>
      }
    />
  );
}