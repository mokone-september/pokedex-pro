import { Skeleton, Stack } from "@chakra-ui/react";
import { getPokemonEvolutionChain } from "~/lib/pokeapi";
import EvolutionChain from "./EvolutionChain";

export function EvolutionChainSkeleton() {
  return (
    <Stack borderWidth="1px" borderColor="border" borderRadius="xl" bg="bg.panel" p={6} gap={4}>
      <Skeleton height="24px" width="160px" />
      <Skeleton height="120px" />
    </Stack>
  );
}

export default async function EvolutionChainSection({ name }: { name: string }) {
  try {
    const pokemon = await getPokemonEvolutionChain(name);
    return <EvolutionChain stages={pokemon} />;
  } catch {
    return <EvolutionChain stages={[]} hasError />;
  }
}
