"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SupremeCourtSearchForm from "./forms/SupremeCourtSearchForm";
import { useRouter } from "next/navigation";

export function SearchTab({
  query,
}: {
  query: { search_type: string | undefined };
}) {
  const router = useRouter();
  return (
    <Tabs
      onValueChange={(value) => {
        router.push(`/search?search_type=${value}`, {
          scroll: false,
        });
      }}
      defaultValue={query.search_type || "supreme_court"}
      className="pt-8"
    >
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="free_search">البحث الحر</TabsTrigger>
        <TabsTrigger value="jarida_rassmia">الجريدة الرسمية</TabsTrigger>
        <TabsTrigger value="supreme_court">المحكمة العليا</TabsTrigger>
      </TabsList>
      <TabsContent value="free_search">
        <Card>
          <CardHeader>
            <CardTitle>البحث الحر</CardTitle>
            <CardDescription>البحث الحر</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2"></CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="jarida_rassmia">
        <Card>
          <CardHeader>
            <CardTitle>الجريدة الرسمية</CardTitle>
            <CardDescription>الجريدة الرسمية</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2"></CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="supreme_court">
        <Card className="bg-slate-100">
          <CardHeader>
            <CardTitle>المحكمة العليا</CardTitle>
            <CardDescription>المحكمة العليا</CardDescription>
          </CardHeader>
          <CardContent>
            <SupremeCourtSearchForm query={query} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
