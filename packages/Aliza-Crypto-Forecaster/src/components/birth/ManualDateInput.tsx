import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface ManualDateInputProps {
  date: string;
  month: string;
  year: string;
  currentYear: number;
  onDateChange: (value: string) => void;
  onMonthChange: (value: string) => void;
  onYearChange: (value: string) => void;
}

export const ManualDateInput = ({
  date,
  month,
  year,
  currentYear,
  onDateChange,
  onMonthChange,
  onYearChange,
}: ManualDateInputProps) => {
  return (
    <>
      <div>
        <Label>Date (1-31)</Label>
        <Input
          type="text"
          value={date}
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d{0,2}$/.test(value) && Number(value) <= 31) {
              if (value.length === 2) onDateChange(value.padStart(2, '0'));
            }
          }}
          placeholder="DD"
          className="bg-white/5"
          maxLength={2}
        />
      </div>
      <div>
        <Label>Month (1-12)</Label>
        <Input
          type="text"
          value={month}
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d{0,2}$/.test(value) && Number(value) <= 12) {
              if (value.length === 2) onMonthChange(value.padStart(2, '0'));
            }
          }}
          placeholder="MM"
          className="bg-white/5"
          maxLength={2}
        />
      </div>
      <div>
        <Label>Year</Label>
        <Input
          type="text"
          value={year}
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d{0,4}$/.test(value) && Number(value) <= currentYear) {
              if (value.length === 4) onYearChange(value);
            }
          }}
          placeholder="YYYY"
          className="bg-white/5"
          maxLength={4}
        />
      </div>
    </>
  );
};