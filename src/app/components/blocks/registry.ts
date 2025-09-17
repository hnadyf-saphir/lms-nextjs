import dynamic from "next/dynamic";

export type BlockProps<T = any> = { data: T };


const Hero        = dynamic(() => import("../Hero"));
const About       = dynamic(() => import("../About")); 
const BlockErreur = dynamic(() => import("../BlockErreur"));


export const BLOCKS_REGISTRY: Record<string, React.ComponentType<BlockProps>> = {
  "blocks.hero":   Hero as any,
  "blocks.about":  About as any,

};
