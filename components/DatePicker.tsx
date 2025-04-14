"use client";

import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameDay,
  isBefore,
  isAfter,
} from "date-fns";
import { ChevronLeftIcon, ChevronRight } from "./icons";
import { InputLabel, StyledInput } from "./Input";
import Button from "./utilities/Button";

const calendarVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
};

const DatePickerContainer = styled.div<{ $width?: string }>`
  position: relative;
  width: ${({ $width }) => $width || "100%"};
`;

const CalendarWrapper = styled(motion.div)`
  position: absolute;
  top: 50px;
  left: 0;
  background: white;
  padding: 1.5rem;
  box-shadow: 0 4px 4px -4px rgba(12, 12, 13, 0.05);
  box-shadow: 0 16px 16px -8px rgba(12, 12, 13, 0.1);
  z-index: 100;
  min-width: 16.438rem;
  min-height: 16.313rem;
  border-radius: 1.25rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 1.75rem;
  color: #3b3a39;
  user-select: none;
`;

const DaysContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
`;

const Day = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  text-align: center;
  color: #3b3a39;
  user-select: none;
`;

const DateCell = styled.div<{ $isSelected: boolean; $isInRange: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${({ $isSelected, $isInRange }) =>
    $isSelected
      ? "#18A0FB"
      : $isInRange
      ? "rgba(255, 222, 2, 0.2)"
      : "transparent"};
  color: #0d0d0c;
  cursor: pointer;
  font-size: 0.875rem;
  &:hover {
    background: #ddd;
  }
`;

interface DatePickerProps {
  onClick?: (startDate: Date | null, endDate: Date | null) => void;
  selectionMode?: "single" | "range";
  placeholder?: string;
  label?: string;
  width?: string;
  showButton?: boolean;
  variant?: "default" | "drawer" | "modal" | "filter";
  labelStyle?: React.CSSProperties;
}

export default function DatePicker({
  onClick,
  selectionMode = "range",
  placeholder,
  label,
  width,
  showButton = false,
  variant = "default",
  labelStyle,
}: DatePickerProps) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const pickerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setShowCalendar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDateClick = (day: Date) => {
    if (selectionMode === "single") {
      setStartDate(day);
      setEndDate(null);
      onClick && onClick(day, null);
    } else {
      if (!startDate || (startDate && endDate)) {
        setStartDate(day);
        setEndDate(null);
      } else if (isBefore(day, startDate)) {
        setEndDate(startDate);
        setStartDate(day);
      } else {
        setEndDate(day);
      }
    }
  };

  return (
    <DatePickerContainer $width={width} ref={pickerRef}>
      {label && <InputLabel style={labelStyle}>{label}</InputLabel>}
      <StyledInput
        $variant={variant}
        $radius="5px"
        type="text"
        readOnly
        value={
          startDate && endDate
            ? `${format(startDate, "yyyy-MM-dd")} - ${format(
                endDate,
                "yyyy-MM-dd"
              )}`
            : startDate
            ? format(startDate, "yyyy-MM-dd")
            : ""
        }
        onClick={() => setShowCalendar(!showCalendar)}
        placeholder={placeholder || "Select date"}
      />
      <AnimatePresence>
        {showCalendar && (
          <CalendarWrapper
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={calendarVariants}
          >
            <Header>
              <ChevronLeftIcon
                onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
              />
              {format(currentMonth, "MMMM yyyy")}
              <ChevronRight
                onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
              />
            </Header>
            <DaysContainer>
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                <Day key={day}>{day}</Day>
              ))}
              {eachDayOfInterval({
                start: startOfWeek(startOfMonth(currentMonth)),
                end: endOfWeek(endOfMonth(currentMonth)),
              }).map((day) => (
                <DateCell
                  key={day.toString()}
                  $isSelected={
                    !!(startDate && isSameDay(day, startDate)) ||
                    !!(endDate && isSameDay(day, endDate))
                  }
                  $isInRange={
                    !!(
                      startDate &&
                      endDate &&
                      isAfter(day, startDate) &&
                      isBefore(day, endDate)
                    )
                  }
                  onClick={() => handleDateClick(day)}
                >
                  {format(day, "d")}
                </DateCell>
              ))}
            </DaysContainer>
            {showButton && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "20px",
                  marginTop: "30px",
                }}
              >
                <Button variant="ghost">Cancel</Button>
                <Button variant="yellow">Apply</Button>
              </div>
            )}
          </CalendarWrapper>
        )}
      </AnimatePresence>
    </DatePickerContainer>
  );
}
