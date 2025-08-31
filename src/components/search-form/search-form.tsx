import {
  Button,
  CloseButton,
  Field,
  Group,
  Input,
  InputGroup,
} from "@chakra-ui/react";
import React, { useRef } from "react";

interface SearchFormProps {
  searchInput: string;
  onSearchInputChange: (value: string) => void;
  onSearch: () => void;
}

export function SearchForm({
  searchInput,
  onSearchInputChange,
  onSearch,
}: SearchFormProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: "100%" }}>
      <Field.Root w="100%">
        <Group attached w="full" maxW="1000px">
          {/* Button for clearing input */}
          <InputGroup
            endElement={
              searchInput ? (
                <CloseButton
                  size="xs"
                  onClick={() => {
                    onSearchInputChange("");
                    inputRef.current?.focus();
                  }}
                  me="-2"
                />
              ) : undefined
            }
          >
            <Input
              placeholder="Search for an image on GIPHY!"
              value={searchInput}
              onChange={(e) => onSearchInputChange(e.target.value)}
              onKeyDown={handleKeyDown}
              w="100%"
            />
          </InputGroup>

          <Button type="submit">Search</Button>
        </Group>
      </Field.Root>
    </form>
  );
}
