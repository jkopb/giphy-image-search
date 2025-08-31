import { useRef } from "react";
import {
  Box,
  Card,
  CloseButton,
  Field,
  HStack,
  Input,
  InputGroup,
} from "@chakra-ui/react";
import { CaptionPlacementSelect } from "../caption-placement-select";
import { CaptionPlacement } from "@/components/caption-placement-select/caption-placement-select.types";

interface CaptionFormProps {
  captionText: string;
  onCaptionTextChange: (value: string) => void;
  captionPlacement: CaptionPlacement;
  onCaptionPlacementChange: (placement: CaptionPlacement) => void;
}

export function CaptionForm({
  captionText,
  onCaptionTextChange,
  captionPlacement,
  onCaptionPlacementChange,
}: CaptionFormProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Card.Root w="100%">
      <Card.Header>
        <Card.Title>Add a caption</Card.Title>
      </Card.Header>
      <Card.Body>
        <HStack gap={4} flexWrap="wrap">
          <Field.Root w={{ base: "100%", md: "240px" }}>
            <Field.Label>Caption text</Field.Label>

            {/* Button for clearing input */}
            <InputGroup
              endElement={
                captionText ? (
                  <CloseButton
                    size="xs"
                    onClick={() => {
                      onCaptionTextChange("");
                      inputRef.current?.focus();
                    }}
                    me="-2"
                  />
                ) : undefined
              }
            >
              <Input
                ref={inputRef}
                placeholder="Enter a custom image caption"
                value={captionText}
                onChange={(e) => onCaptionTextChange(e.target.value)}
              />
            </InputGroup>
          </Field.Root>

          <Box minW="290px">
            <CaptionPlacementSelect
              label="Caption placement"
              value={captionPlacement}
              onChange={onCaptionPlacementChange}
            />
          </Box>
        </HStack>
      </Card.Body>
    </Card.Root>
  );
}
