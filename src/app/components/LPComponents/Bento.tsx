import { DollarSignIcon, ActivityIcon, KeyIcon } from "lucide-react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";

const features = [
  {
    Icon: DollarSignIcon,
    name: "Flexible Pricing",
    description: "Pay only for the API calls you use, no hidden fees.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute right-0 top-10 origin-top rounded-md border transition-all duration-300 ease-out group-hover:scale-105"></div>
    ),
  },
  {
    Icon: KeyIcon,
    name: "Secure Access",
    description: "Enable secure API access with custom keys for every request.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: (
      <div className="absolute right-0 top-10 origin-top rounded-md border transition-all duration-300 ease-out group-hover:scale-105"></div>
    ),
  },
  {
    Icon: ActivityIcon,
    name: "Real-Time Data",
    description: "Deliver up-to-the-second microlending data to your app.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: (
      <div className="absolute right-0 top-10 origin-top rounded-md border transition-all duration-300 ease-out group-hover:scale-105"></div>
    ),
  },
  {
    Icon: ActivityIcon,
    name: "API Analytics",
    description: "Track API performance with real-time usage analytics.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute right-0 top-10 origin-top rounded-md border transition-all duration-300 ease-out group-hover:scale-105"></div>
    ),
  },
];

export function BentoDemo() {
  return (
    <BentoGrid className="w-[40vw] h-[30vh]">
      {features.map((feature, idx) => (
        <BentoCard key={idx} {...feature} />
      ))}
    </BentoGrid>
  );
}
