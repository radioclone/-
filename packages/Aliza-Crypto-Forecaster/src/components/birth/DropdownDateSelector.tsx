import React from 'react';
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { soundManager } from "@/utils/sounds";

interface DropdownDateSelectorProps {
  onDateChange: (value: string) => void;
  onMonthChange: (value: string) => void;
  onYearChange: (value: string) => void;
}

export const DropdownDateSelector = ({
  onDateChange,
  onMonthChange,
  onYearChange,
}: DropdownDateSelectorProps) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dates = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0'));
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => String(currentYear - i));

  const handleDateChange = (value: string) => {
    onDateChange(value);
    soundManager.playSound('click');
  };

  const handleMonthChange = (value: string) => {
    onMonthChange(value);
    soundManager.playSound('click');
  };

  const handleYearChange = (value: string) => {
    onYearChange(value);
    soundManager.playSound('click');
  };

  return (
    <>
      <div>
        <Label>Date</Label>
        <Select onValueChange={handleDateChange}>
          <SelectTrigger className="bg-white/5">
            <SelectValue placeholder="Date" />
          </SelectTrigger>
          <SelectContent 
            className="bg-black/95 backdrop-blur-sm border border-white/10 z-[1000]"
            position="popper"
            sideOffset={4}
          >
            {dates.map((date) => (
              <SelectItem key={date} value={date}>
                {date}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Month</Label>
        <Select onValueChange={handleMonthChange}>
          <SelectTrigger className="bg-white/5">
            <SelectValue placeholder="Month" />
          </SelectTrigger>
          <SelectContent 
            className="bg-black/95 backdrop-blur-sm border border-white/10 z-[1000]"
            position="popper"
            sideOffset={4}
          >
            {months.map((month, index) => (
              <SelectItem 
                key={month} 
                value={String(index + 1).padStart(2, '0')}
              >
                {month}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Year</Label>
        <Select onValueChange={handleYearChange}>
          <SelectTrigger className="bg-white/5">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent 
            className="bg-black/95 backdrop-blur-sm border border-white/10 z-[1000]"
            position="popper"
            sideOffset={4}
          >
            {years.map((year) => (
              <SelectItem key={year} value={year}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
};