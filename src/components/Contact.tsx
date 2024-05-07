import Link from "next/link";
import { MdEmail, MdLocalPhone, MdLocationPin } from "react-icons/md";
import CopyEmail from "~/components/CopyEmail";
import { ContactForm } from "./ContactForm";

export default function Contact() {
  return (
    <div className="px-4" id="contact">
      <h2 className="pb-8 pt-12 text-4xl font-bold">
        Vraag een vrijblijvend gesprek aan
      </h2>
      <p className="font-normal">Of neem contact op via email of telefoon.</p>
      <div className="space-y-2 pt-4">
        <div className="flex gap-2 ">
          <MdEmail size={24} />
          <CopyEmail />
        </div>
        <div className="flex gap-2">
          <MdLocalPhone size={24} />
          <a className="underline underline-offset-4" href="tel:+31630141408">
            +31 6 30 14 14 08
          </a>
        </div>
        <div className="flex gap-2">
          <MdLocationPin size={24} />
          <Link
            className="underline underline-offset-4"
            href="https://www.google.com/maps/place/Vlierstraat+6,+1741+VK+Schagen/@52.7991544,4.7945222,16z/data=!3m1!4b1!4m6!3m5!1s0x47cf4e47fc1c8309:0x50b2fe8763322bc0!8m2!3d52.7991544!4d4.7970971!16s%2Fg%2F11c12gczzz?entry=ttu"
          >
            Vlierstraat 6, 1741 VK, Schagen
          </Link>
        </div>
      </div>
      <ContactForm />
    </div>
  );
}
