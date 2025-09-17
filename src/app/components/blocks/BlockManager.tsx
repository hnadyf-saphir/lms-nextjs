"use client";

import { BLOCKS_REGISTRY, BlockProps } from "./registry";
import BlockErreur from "../BlockErreur";

type Block = { id?: number | string; __component?: string; [k: string]: any };

export default function BlockManager({ blocks }: { blocks: Block[] }) {
  if (!Array.isArray(blocks) || blocks.length === 0) return null;

  return (
    <>
      {blocks.map((block, i) => {
        const Comp = block?.__component
          ? BLOCKS_REGISTRY[block.__component]
          : undefined;

        const key = `${block?.__component ?? "unknown"}-${block?.id ?? i}`;

        if (!Comp) return <BlockErreur key={key} data={block} />;

        return <Comp key={key} data={block} />;
      })}
    </>
  );
}
