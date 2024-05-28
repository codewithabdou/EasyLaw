"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { arSA } from "date-fns/locale";

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
import { format } from "date-fns";
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
import { buildLawSearchLink } from "@helpers/buildLawSearch";
import { formatDateToYYYYMMDD } from "@helpers/formatDate";

const numbersRegEx = /^[0-9]*$/;

const FormSchema = z.object({
    search_query: z.string().optional(),
    haveDetailedSearch: z.boolean(),
    field: z.string().optional(),
    ministry: z.string().optional(),
    text_number: z.string().optional(),
    text_type: z.string().optional(),
    date_range: z
        .object({
            from: z.date().optional(),
            to: z.date().optional(),
        })
        .optional(),
    signature_date_range: z
        .object({
            from: z.date().optional(),
            to: z.date().optional(),
        })
        .optional(),

});

export function LawSearchForm({
    query,
}: {
    query: { search_type: string | undefined };
}) {
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: undefined,
        to: undefined,
    });

    const router = useRouter();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            search_query: "",
            haveDetailedSearch: false,

            field: "",
            ministry: "",
            text_number: "",
            text_type: "",
            date_range: {
                from: undefined,
                to: undefined,
            },
            signature_date_range: {
                from: undefined,
                to: undefined,
            },

        },
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
        router.push(
            buildLawSearchLink(
                query.search_type,
                data.search_query?.length !== 0 ? data.search_query : undefined,
                data.field?.length !== 0 ? data.field : undefined,
         
                data.ministry?.length !== 0 ? data.ministry : undefined,
                data.text_number?.length !== 0 ? data.text_number : undefined,
                data.text_type?.length !== 0 ? data.text_type : undefined,
                {
                    from: data?.date_range?.from
                        ? formatDateToYYYYMMDD(data.date_range.from)
                        : undefined,
                    to: data?.date_range?.to
                        ? formatDateToYYYYMMDD(data.date_range.to)
                        : undefined,
                },
                {
                    from: data?.signature_date_range?.from
                        ? formatDateToYYYYMMDD(data.signature_date_range.from)
                        : undefined,
                    to: data?.signature_date_range?.to
                        ? formatDateToYYYYMMDD(data.signature_date_range.to)
                        : undefined,
                }
            ),
            {
                scroll: false,
            }
        );
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
                                name="field"
                                render={({ field }) => (
                                    <FormItem className="md:w-1/3 w-full">
                                        <FormLabel> القطاع :</FormLabel>
                                        <FormControl>
                                            <Input placeholder=" (مثال: رئاسة الجمهورية) :" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="ministry"
                                render={({ field }) => (
                                    <FormItem className="md:w-1/3 w-full">
                                        <FormLabel> الوزارة  :</FormLabel>
                                        <FormControl>
                                            <Input placeholder="(مثال: امانة عامة حكومة) :" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex w-full md:items-center gap-6 items-start  flex-col md:flex-row">
                            <FormField
                                control={form.control}
                                name="text_number"
                                render={({ field }) => (
                                    <FormItem className="md:w-1/3 w-full">
                                        <FormLabel> النص رقم :</FormLabel>
                                        <FormControl>
                                            <Input placeholder="  (مثال: 77-74) :" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="text_type"
                                render={({ field }) => (
                                    <FormItem className="md:w-1/3 w-full">
                                        <FormLabel> النوع  :</FormLabel>
                                        <FormControl>
                                            <Input placeholder="(مثال: مرسوم) :" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    
                        <FormField
                            control={form.control}
                            name="date_range"
                            render={({ field }) => (
                                <FormItem className="md:w-1/3 w-full">
                                    <FormLabel>المنشورة بين :</FormLabel>
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
                                                            format(date.from, "yyyy/LL/dd")
                                                        )
                                                    ) : (
                                                        <span>تاريخ القرار</span>
                                                    )}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    dir="rtl"
                                                    locale={arSA}
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
                        <FormField
                            control={form.control}
                            name="signature_date_range"
                            render={({ field }) => (
                                <FormItem className="md:w-1/3 w-full">
                                    <FormLabel>الممضي بين : </FormLabel>
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
                                                            format(date.from, "yyyy/LL/dd")
                                                        )
                                                    ) : (
                                                        <span>تاريخ القرار</span>
                                                    )}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    dir="rtl"
                                                    locale={arSA}
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
                    </>
                )}
                <Button type="submit">بحث</Button>
            </form>
        </Form>
    );
}

export default LawSearchForm;
