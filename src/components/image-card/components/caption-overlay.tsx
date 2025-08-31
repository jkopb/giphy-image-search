import { Box, Text } from "@chakra-ui/react";

export function CaptionOverlay({
  captionText,
  position,
}: {
  captionText: string;
  position: "top" | "bottom";
}) {
  return (
    <Box
      position="absolute"
      left={0}
      right={0}
      bg="rgba(0, 0, 0, 0.7)"
      color="white"
      p={2}
      textAlign="center"
      {...(position === "top"
        ? { top: 0, borderTopRadius: "md" }
        : { bottom: 0, borderBottomRadius: "md" })}
    >
      <Text fontSize="sm" fontWeight="medium">
        {captionText}
      </Text>
    </Box>
  );
}
