import Link from "next/link";
import { MdEmail, MdLocalPhone, MdLocationPin } from "react-icons/md";
import CopyEmail from "~/components/CopyEmail";
import { ContactForm } from "./ContactForm";

export default function Contact() {
  return (
    <div
      className="gap-x-16 gap-y-8 px-4 pb-6 lg:container lg:grid lg:grid-cols-2 lg:pb-16"
      id="contact"
    >
      <div>
        <h2 className="pb-8 pt-16 text-4xl font-bold">
          Persoonlijk &{" "}
          <span className="text-yellow">vrijblijvend kennismaken?</span>
        </h2>
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
              href="https://www.google.com/maps/place/https://www.google.com/maps/dir//Zijperweg+9,+1742+NE+Schagen/@52.7899589,4.7032031,12z/data=!3m1!4b1!4m8!4m7!1m0!1m5!1m1!1s0x47cf4fb00e26744b:0xb6bf74e88712983f!2m2!1d4.7856595!2d52.7900205?entry=ttu&g_ep=EgoyMDI0MTExMy4xIKXMDSoASAFQAw%3D%3Dlierstraat+6,+1741+VK+Schagen/@52.7991544,4.7945222,16z/data=!3m1!4b1!4m6!3m5!1s0x47cf4e47fc1c8309:0x50b2fe8763322bc0!8m2!3d52.7991544!4d4.7970971!16s%2Fg%2F11c12gczzz?entry=ttu"
            >
              YPHS Huis, Zijperweg 9, 1742 NE Schagen
            </Link>
          </div>
        </div>
      </div>
      <div className="lg:pt-[12rem]">
        <ContactForm />
      </div>
    </div>
  );
}
