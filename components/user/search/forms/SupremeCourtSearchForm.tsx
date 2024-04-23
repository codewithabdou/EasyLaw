"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@components/ui/switch";
import { IoCalendar } from "react-icons/io5";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React from "react";
import { useRouter } from "next/navigation";
import { buildSearchLink } from "@helpers/buildSupremeCourtSearch";
import { formatDateToYYYYMMDD } from "@helpers/formatDate";

const numbersRegEx = /^[0-9]*$/;

const FormSchema = z
  .object({
    search_query: z.string().min(1, {
      message: "يجب ألا يكون هذا الحقل فارغًا",
    }),
    haveDetailedSearch: z.boolean(),
    decision_number: z
      .string()
      .regex(numbersRegEx, "من فضلك أدخل رقما صالحا")
      .optional(),
    date_range: z.object({
      from: z.date().optional(),
      to: z.date().optional(),
    }),
    decision_subject: z.string().optional(),
    search_field: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.haveDetailedSearch) {
        return data.decision_number !== "";
      } else {
        return true;
      }
    },
    {
      message: "يجب ألا يكون هذا الحقل فارغًا",
      path: ["decision_number"],
    }
  )
  .refine(
    (data) => {
      if (data.haveDetailedSearch) {
        return data.decision_subject !== "";
      } else {
        return true;
      }
    },
    {
      message: "يجب ألا يكون هذا الحقل فارغًا",
      path: ["decision_subject"],
    }
  )
  .refine(
    (data) => {
      if (data.haveDetailedSearch) {
        return data.search_field !== "";
      } else {
        return true;
      }
    },
    {
      message: "يجب ألا يكون هذا الحقل فارغًا",
      path: ["search_field"],
    }
  );

export function SupremeCourtSearchForm({
  query,
}: {
  query: { search_type: string | undefined };
}) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });

  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      search_query: "",
      haveDetailedSearch: false,
      decision_number: "",
      date_range: {
        from: new Date(2022, 0, 20),
        to: addDays(new Date(2022, 0, 20), 20),
      },
      decision_subject: "",
      search_field: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!data.haveDetailedSearch) {
      router.push(
        buildSearchLink(
          query.search_type,
          data.search_query,
          undefined,
          {
            from: undefined,
            to: undefined,
          },
          undefined,
          undefined
        ),
        {
          scroll: false,
        }
      );
    } else {
      router.replace(
        buildSearchLink(
          query.search_type,
          data.search_query,
          data.decision_number,
          {
            from: formatDateToYYYYMMDD(data.date_range.from),
            to: formatDateToYYYYMMDD(data.date_range.to),
          },
          data.decision_subject,
          data.search_field
        ),
        {
          scroll: false,
        }
      );
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <div className="flex w-full md:items-center gap-6 items-start  flex-col md:flex-row">
          <FormField
            control={form.control}
            name="search_query"
            render={({ field }) => (
              <FormItem className="md:w-1/2 w-full">
                <FormControl>
                  <Input placeholder="كلمات مفتاحية ..." {...field} />
                </FormControl>
                <FormDescription>
                  ساعدنا في العثور على ما تبحث عنه
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="haveDetailedSearch"
            render={({ field }) => (
              <FormItem className="flex md:-translate-y-4  items-center gap-3 ">
                <FormControl>
                  <div className="flex items-center ">
                    <Switch
                      className={`shrink-0 translate-y-1 `}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </div>
                </FormControl>
                <FormLabel className="">بحث متقدم</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {form.watch("haveDetailedSearch") && (
          <>
            <div className="flex w-full md:items-center gap-6 items-start  flex-col md:flex-row">
              <FormField
                control={form.control}
                name="decision_number"
                render={({ field }) => (
                  <FormItem className="md:w-1/3 w-full">
                    <FormLabel>رقم القرار</FormLabel>
                    <FormControl>
                      <Input placeholder="رقم القرار" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date_range"
                render={({ field }) => (
                  <FormItem className="md:w-1/3 w-full">
                    <FormLabel>تاريخ القرار</FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            id="date"
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <IoCalendar className="ml-2  h-4 w-4" />
                            {date?.from ? (
                              date.to ? (
                                <>
                                  {format(date.from, "yyyy/LL/dd")} -{" "}
                                  {format(date.to, "yyyy/LL/dd")}
                                </>
                              ) : (
                                format(date.from, "LLL dd, y")
                              )
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            initialFocus
                            mode="range"
                            defaultMonth={date?.from}
                            selected={date}
                            onSelect={(value) => {
                              setDate(value);
                              field.onChange(value);
                            }}
                            numberOfMonths={2}
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex w-full md:items-center gap-6 items-start  flex-col md:flex-row">
              <FormField
                control={form.control}
                name="decision_subject"
                render={({ field }) => (
                  <FormItem className="md:w-1/3 w-full">
                    <FormLabel>موضوع القرار</FormLabel>
                    <FormControl>
                      <Input placeholder="موضوع القرار" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="search_field"
                render={({ field }) => (
                  <FormItem className="md:w-1/3 w-full">
                    <FormLabel>حقل البحث</FormLabel>
                    <FormControl>
                      <Input placeholder="حقل البحث" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </>
        )}
        <Button type="submit">بحث</Button>
      </form>
    </Form>
  );
}

export default SupremeCourtSearchForm;
