import { Portal, Select, createListCollection } from "@chakra-ui/react";
import { CaptionPlacement } from "@/components/caption-placement-select/caption-placement-select.types";

const captionPlacementOptions = createListCollection({
  items: [
    {
      label: "On top of image (center top)",
      value: CaptionPlacement.OverlayTop,
    },
    {
      label: "On top of image (center bottom)",
      value: CaptionPlacement.OverlayBottom,
    },
    { label: "Below the image", value: CaptionPlacement.Below },
  ],
});

export const CaptionPlacementSelect = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: CaptionPlacement;
  onChange: (value: CaptionPlacement) => void;
}) => {
  return (
    <Select.Root
      collection={captionPlacementOptions}
      value={[value]}
      onValueChange={(e) => onChange(e.value[0] as CaptionPlacement)}
    >
      <Select.HiddenSelect />
      <Select.Label>{label}</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder={label} />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {captionPlacementOptions.items.map((option) => (
              <Select.Item item={option} key={option.value}>
                {option.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
};
