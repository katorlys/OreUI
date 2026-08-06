"use client";

import { useRouter } from "next/navigation";

import { Button } from "@katorlys/oreui-react/button";

type HomeActionsProps = {
  prefix: string;
};

export function HomeActions({ prefix }: HomeActionsProps) {
  const router = useRouter();

  return (
    <div className="mt-8 flex gap-3 max-sm:w-full max-sm:flex-col">
      <Button
        className="max-sm:w-full"
        type="button"
        onClick={() => router.push(`${prefix}/docs/getting-started`)}
      >
        Get started
      </Button>
      <Button
        className="max-sm:w-full"
        type="button"
        variant="secondary"
        onClick={() => router.push(`${prefix}/docs/overview`)}
      >
        View components
      </Button>
    </div>
  );
}
