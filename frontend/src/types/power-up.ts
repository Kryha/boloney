import { z } from "zod";

/**
 * Power-ups are matched to their ID in the following way:
 * 1. Grill
 * 2. Bird's Eye View
 * 3. Ménage à Troìs
 * 4. Double Up
 * 5. Vendetta
 * 6. Second Chance
 * 7. Coup
 * 8. Smoke and Mirrors
 * 9. Hypnosis
 */

export const powerUpIdSchema = z.enum(["1", "2", "3", "4", "5", "6", "7", "8", "9"]);

export type PowerUpId = z.infer<typeof powerUpIdSchema>;

export const powerUpProbabilitySchema = z.object({
  id: powerUpIdSchema,
  probability: z.number().min(0).max(100),
});

export type PowerUpProbability = z.infer<typeof powerUpProbabilitySchema>;

export const powerUpSchema = z.object({
  id: powerUpIdSchema,
  name: z.string(),
  shortDescription: z.string(),
  longDescription: z.string(),
  cardImage: z.string(),
  isImageLarge: z.boolean(),
});
export type PowerUp = z.infer<typeof powerUpSchema>;

// USE_POWER_UP API payloads
// TODO: define all types

export const useGrillFrontendSchema = z.object({
  targetId: z.string(),
  face: z.number().min(1).max(6),
  amount: z.number().min(1),
});
export type UseGrillFrontend = z.infer<typeof useGrillFrontendSchema>;

export const useGrillBackendSchema = z.object({
  targetId: z.string(),
  isCorrect: z.boolean(),
});
export type UseGrillBackend = z.infer<typeof useGrillBackendSchema>;

export const useBirdsEyeFrontendSchema = z.object({
  targetId: z.string(),
});
export type UseBirdsEyeFrontend = z.infer<typeof useBirdsEyeFrontendSchema>;

export const useBirdsEyeBackendSchema = z.object({
  targetId: z.string(),
  sum: z.number(),
});
export type UseBirdsEyeBackend = z.infer<typeof useBirdsEyeBackendSchema>;

export const useMenageFrontendSchema = z.object({});
export type UseMenageFrontend = z.infer<typeof useMenageFrontendSchema>;

export const useMenageBackendSchema = z.object({});
export type UseMenageBackend = z.infer<typeof useMenageBackendSchema>;

export const useDoubleUpFrontendSchema = z.object({});
export type UseDoubleUpFrontend = z.infer<typeof useDoubleUpFrontendSchema>;

export const useDoubleUpBackendSchema = z.object({
  powerUpIds: z.array(powerUpIdSchema),
  recentlyAdded: z.number(),
});
export type UseDoubleUpBackend = z.infer<typeof useDoubleUpBackendSchema>;

export const useVendettaFrontendSchema = z.object({});
export type UseVendettaFrontend = z.infer<typeof useVendettaFrontendSchema>;

export const useVendettaBackendSchema = z.object({});
export type UseVendettaBackend = z.infer<typeof useVendettaBackendSchema>;

export const useSecondChanceFrontendSchema = z.object({});
export type UseSecondChanceFrontend = z.infer<typeof useSecondChanceFrontendSchema>;

export const useSecondChanceBackendSchema = z.object({});
export type UseSecondChanceBackend = z.infer<typeof useSecondChanceBackendSchema>;

export const useCoupFrontendSchema = z.object({});
export type UseCoupFrontend = z.infer<typeof useCoupFrontendSchema>;

export const useCoupBackendSchema = z.object({
  powerUpIds: z.array(powerUpIdSchema),
  targetId: z.string(),
});
export type UseCoupBackend = z.infer<typeof useCoupBackendSchema>;

export const useSmokeAndMirrorsFrontendSchema = z.object({});
export type UseSmokeAndMirrorsFrontend = z.infer<typeof useSmokeAndMirrorsFrontendSchema>;

export const useSmokeAndMirrorsBackendSchema = z.object({});
export type UseSmokeAndMirrorsBackend = z.infer<typeof useSmokeAndMirrorsBackendSchema>;

export const useHypnosisFrontendSchema = z.object({});
export type UseHypnosisFrontend = z.infer<typeof useHypnosisFrontendSchema>;

export const useHypnosisBackendSchema = z.object({});
export type UseHypnosisBackend = z.infer<typeof useHypnosisBackendSchema>;

export const usePowerUpPayloadFrontendSchema = z.discriminatedUnion("id", [
  z.object({ id: z.literal("1"), data: useGrillFrontendSchema }),
  z.object({ id: z.literal("2"), data: useBirdsEyeFrontendSchema }),
  z.object({ id: z.literal("3"), data: useMenageFrontendSchema }),
  z.object({ id: z.literal("4"), data: useDoubleUpFrontendSchema }),
  z.object({ id: z.literal("5"), data: useVendettaFrontendSchema }),
  z.object({ id: z.literal("6"), data: useSecondChanceFrontendSchema }),
  z.object({ id: z.literal("7"), data: useCoupFrontendSchema }),
  z.object({ id: z.literal("8"), data: useSmokeAndMirrorsFrontendSchema }),
  z.object({ id: z.literal("9"), data: useHypnosisFrontendSchema }),
]);
export type UsePowerUpPayloadFrontend = z.infer<typeof usePowerUpPayloadFrontendSchema>;

export const usePowerUpPayloadBackendSchema = z.discriminatedUnion("id", [
  z.object({ id: z.literal("1"), data: useGrillBackendSchema }),
  z.object({ id: z.literal("2"), data: useBirdsEyeBackendSchema }),
  z.object({ id: z.literal("3"), data: useMenageBackendSchema }),
  z.object({ id: z.literal("4"), data: useDoubleUpBackendSchema }),
  z.object({ id: z.literal("5"), data: useVendettaBackendSchema }),
  z.object({ id: z.literal("6"), data: useSecondChanceBackendSchema }),
  z.object({ id: z.literal("7"), data: useCoupBackendSchema }),
  z.object({ id: z.literal("8"), data: useSmokeAndMirrorsBackendSchema }),
  z.object({ id: z.literal("9"), data: useHypnosisBackendSchema }),
]);
export type UsePowerUpPayloadBackend = z.infer<typeof usePowerUpPayloadBackendSchema>;
