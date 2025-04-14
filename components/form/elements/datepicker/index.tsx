"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
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
import { ChevronLeftIcon, ChevronRightIcon } from "../../../icons";
import {
  DatePickerContainer,
  CalendarWrapper,
  Header,
  DaysContainer,
  Day,
  DateCell,
} from "./DatePicker.style";
import { InputLabel, StyledInput } from "../input/Input.style";

const calendarVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
};

interface DatePickerProps {
  onClick?: (startDate: Date | null, endDate: Date | null) => void;
  selectionMode?: "single" | "range";
  placeholder?: string;
  label?: string;
  width?: string;
  showButton?: boolean;
  variant?: "default" | "drawer" | "modal" | "filter";
  labelStyle?: React.CSSProperties;
  disabledDate?: (date: Date) => boolean;
}

export function DatePicker({
  onClick,
  selectionMode = "range",
  placeholder,
  label,
  width,
  showButton = false,
  variant = "default",
  labelStyle,
  disabledDate,
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
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setShowCalendar(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    if (selectionMode === "range" && startDate && endDate) {
      onClick && onClick(startDate, endDate);
    }
  }, [startDate, endDate, selectionMode, onClick]);

  const handleDateClick = (day: Date) => {
    if (disabledDate?.(day)) return;

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
              <ChevronRightIcon
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
              }).map((day) => {
                const isDisabled = disabledDate?.(day) ?? false;
                return (
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
                    $isDisabled={isDisabled}
                    onClick={() => handleDateClick(day)}
                    tabIndex={isDisabled ? -1 : 0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !isDisabled)
                        handleDateClick(day);
                    }}
                  >
                    {format(day, "d")}
                  </DateCell>
                );
              })}
            </DaysContainer>
            {showButton && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "20px",
                  marginTop: "30px",
                }}
              ></div>
            )}
          </CalendarWrapper>
        )}
      </AnimatePresence>
    </DatePickerContainer>
  );
}
