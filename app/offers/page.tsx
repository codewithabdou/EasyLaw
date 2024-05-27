import ServerSideNavbar from '@components/user/layout/ServerSideNavbar'
import React from "react";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@components/ui/button";
import IMAGES from "@config/images";
import getPlans from "@actions/getPlans";
import UserPlansDataTable from '@components/user/offers/data-table';
import getSubs from '@actions/getSubscriptions';
import InvoiceAccordion from '@components/admin/Tarification management/subscription';
import { Subscription } from '@typings/subs';
import { cookies } from 'next/headers';
import { formatDateString } from '@helpers/dateFormatter';

async function page() {
  const sub = await getSubs() as Subscription;
        
        const plans = await getPlans();

  if (!plans) {
    return (
      <div className="flex flex-col gap-6 justify-center items-center">
        <Image
          src={IMAGES.SEARCH_ERROR}
          alt="Search error"
          width={300}
          height={300}
        />
        <p className="text-center text-sm bg-red-200 rounded-md max-w-[40ch] text-red-600 p-2">
          يرجى التحقق من البيانات المدخلة
        </p>
        <Link href={`/admin/users`}>
          <Button>الذهاب إلى الصفحة الرئيسية</Button>
        </Link>
      </div>
    );
  }
  const activePlans = plans.filter((plan) => plan.active);
  const stringUser=cookies().get("user")?.value as string;
  const user =JSON.parse(stringUser);
  const format = "YYYY/MM/DD";
  return (
    <div>

   <ServerSideNavbar/>
    <div className="text-primary mt-24 p-5 flex items-center flex-col gap-y-5">
        <div className='w-full   flex justify-around  items-center'>
           <div className='w-1/3 flex flex-col gap-y-16'>
              <h1 className='md:text-4xl text-2xl text-primary font-bold'>قبل البدء، يجب عليك اختيار
 الاشتراك الذي يناسبك!</h1>
              <p className='md:text-lg text-sm text-[#316E83]'>اختر من بين مجموعة متنوعة من الاشتراكات حسب احتياجاتك.</p>
           </div>
           <Image 
           className='md:w-80 md:h-80 w-48 h-48'
           src={IMAGES.CASH_ILLUSTRATION}
         width={350}
         height={350}
         alt='bills'>

         </Image>
        </div>
        <div className='bg-primary w-[80%] h-7 rounded-t-[20px]'></div>
        <h1 className='md:text-3xl text-xl font-bold'>عروضنا <span className='text-[#316E83]'>المتوفرة</span></h1>

      <div className='w-full flex flex-col justify-center items-center'>
      <UserPlansDataTable data={activePlans} purchasedPlan={sub.plan.id} isActive={sub.active} />
      <div className='w-full flex flex-col gap-5 items-center justify-center'>
          <h1 className='md:text-3xl text-xl font-bold'><span className='text-[#316E83]'>إشتراكك</span> الحالي</h1>
        {sub.plan.active ? <InvoiceAccordion 
        planeName={sub.plan.name}
        date={formatDateString(sub.expiry_date,format)}
        purchaseDate={formatDateString(sub.start_date,format)}
        endDate={formatDateString(sub.expiry_date,format)}
        username={`${user.firstname} ${user.lastname}` }
        recipient="iTouch financial departement"
        has_search_supreme_court={sub.plan.has_search_supreme_court}
        has_search_laws={sub.plan.has_search_laws}
        has_search_constitution={sub.plan.has_search_constitution}
        has_search_conseil={sub.plan.has_search_conseil}
        has_notifications_access={sub.plan.has_notifications_access}
        has_gpt_access={sub.plan.has_gpt_access}
        priceM={sub.plan.price_month}
        priceY={sub.plan.price_year}

      /> :  <p>لا يوجد أي اشتراك في الوقت الحالي</p>}
           </div>
        </div>
        
    </div>
    </div>
  );
}

export default page