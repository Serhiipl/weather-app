import { ReactNode } from "react";

interface MetaDataComponentProps {
  metadata: {
    title: string;
    description: string;
  };
  children: ReactNode;
}

export default function MetaDataComponent({
  metadata,
  children,
}: MetaDataComponentProps) {
  return (
    <>
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>{children}</body>
    </>
  );
}
