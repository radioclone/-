import React, { useState } from 'react';
import { soundManager } from "@/utils/sounds";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ManualDateInput } from './ManualDateInput';
import { DropdownDateSelector } from './DropdownDateSelector';

interface DateSelectorProps {
  onDateChange: (value: string) => void;
  onMonthChange: (value: string) => void;
  onYearChange: (value: string) => void;
}

export const DateSelector = ({ onDateChange, onMonthChange, onYearChange }: DateSelectorProps) => {
  const [useManualInput, setUseManualInput] = useState(false);
  const [manualDate, setManualDate] = useState('');
  const [manualMonth, setManualMonth] = useState('');
  const [manualYear, setManualYear] = useState('');
  const currentYear = new Date().getFullYear();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-white/60">Birth Date</h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => {
                  setUseManualInput(!useManualInput);
                  soundManager.playSound('click');
                }}
                className="text-xs text-white/60 hover:text-white transition-colors"
              >
                {useManualInput ? 'Use Dropdown' : 'Manual Input'}
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Toggle between dropdown and manual input</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {useManualInput ? (
          <ManualDateInput
            date={manualDate}
            month={manualMonth}
            year={manualYear}
            currentYear={currentYear}
            onDateChange={(value) => {
              setManualDate(value);
              onDateChange(value);
            }}
            onMonthChange={(value) => {
              setManualMonth(value);
              onMonthChange(value);
            }}
            onYearChange={(value) => {
              setManualYear(value);
              onYearChange(value);
            }}
          />
        ) : (
          <DropdownDateSelector
            onDateChange={onDateChange}
            onMonthChange={onMonthChange}
            onYearChange={onYearChange}
          />
        )}
      </div>
    </div>
  );
};