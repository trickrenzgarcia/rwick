"use client";

import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';

export function ProjectFilterList({
  tag,
  isChecked,
  onToggle,
}: {
  tag: string;
  isChecked: boolean;
  onToggle: (tag: string, checked: boolean) => void;
}) {
  return (
    <div className="flex items-center gap-2 px-2 py-1 sm:gap-3 sm:px-1">
      <Checkbox
        id={tag}
        checked={isChecked}
        onCheckedChange={(checked) => onToggle(tag, !!checked)}
        className="flex-shrink-0"
      />
      <Label htmlFor={tag} className="text-sm sm:text-[16px] whitespace-nowrap">
        {tag}
      </Label>
    </div>
  );
}