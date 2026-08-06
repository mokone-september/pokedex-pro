import Image from "next/image";

import { HStack, Text } from "@chakra-ui/react";

export function Footer() {
  return (
    <HStack justify="center" py={8} gap={3}>
      <Image
        src="/logo.svg"
        alt="Pokédex Pro"
        width={24}
        height={24}
      />

      <Text>Pokédex Pro</Text>
    </HStack>
  );
}
