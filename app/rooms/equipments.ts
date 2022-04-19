import type { Equipment } from "./room-repository.server";

type ChoiceOption = {
  value: Exclude<keyof Equipment, "roomId">;
  label: string;
};

export const equipements: ChoiceOption[] = [
  { value: "tv", label: "Télévision 4K" },
  { value: "visio", label: "Visio conférence" },
  { value: "paperboard", label: "Paperboard" },
  { value: "videoprojector", label: "Vidéo projecteur" },
];

export const isEquipementChecked =
  (equipment: Equipment | null) => (choice: ChoiceOption) => ({
    ...choice,
    defaultChecked: !!equipment?.[choice.value],
  });

export const initialEquipment = {
  tv: false,
  videoprojector: false,
  paperboard: false,
  visio: false,
};
