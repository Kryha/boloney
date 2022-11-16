import { z } from "zod";

export const log = console;

export async function measurePromise<T>(fn: (...args: any[]) => Promise<T>, name?: string, ...args: any[]): Promise<T> {
  const start = performance.now();
  const result = await fn(...args);
  log.info(`${name ?? fn.name} took ${performance.now() - start} ms`);
  return result;
}

export type HasID<T> = T & { id: number };

const AnyDate = z.preprocess(
  (d) => (typeof d === "object" ? d : ["number", "string"].includes(typeof d) ? new Date(d as number | string) : undefined),
  z.date().optional().nullable()
);

export const BaseDBSchema = z.object({
  id: z.number().int().positive().optional().nullable(),
  createdAt: AnyDate,
  updatedAt: AnyDate,
});

export const lexicographic = (a: string, b: string) => a.localeCompare(b, "en-gb", { numeric: true });

export const range = (n: number) => [...Array(n).keys()];
