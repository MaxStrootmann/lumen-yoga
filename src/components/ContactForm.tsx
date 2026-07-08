"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import posthog from "posthog-js";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  naam: z.string().min(2, {
    message: "Naam moet minimaal 2 tekens bevatten.",
  }),
  email: z.string().email({
    message: "Geen geldig emailadres.",
  }),
  bericht: z.string().min(1, {
    message: "Bericht is verplicht.",
  }).max(300, {
    message: "Bericht mag maximaal 300 tekens bevatten.",
  }),
});

export function ContactForm() {
  const [isSent, setIsSent] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      naam: "",
      email: "",
      bericht: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const subject = encodeURIComponent(`Bericht van ${values.naam} - Lumen Yoga Contact`);
    const body = encodeURIComponent(
      `Naam: ${values.naam}\nEmail: ${values.email}\n\n${values.bericht}`,
    );

    posthog.capture("contact_form_mailto_started");
    window.location.href = `mailto:ellen@lumenyoga.nl?subject=${subject}&body=${body}`;
    setIsSent(true);
    form.reset();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 pt-8 lg:pt-0"
      >
        <FormField
          control={form.control}
          name="naam"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Naam:</FormLabel>
              <FormControl>
                <Input placeholder="naam" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email:</FormLabel>
              <FormControl>
                <Input placeholder="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bericht"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bericht:</FormLabel>
              <FormControl>
                <Textarea
                  className="pb-4"
                  placeholder="Schrijf hier je bericht"
                  id="message"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button bgColor="yellow" type="submit">
          Open e-mail
        </Button>

        {isSent && (
          <p className="text-green-600 mx-auto w-full pt-2 text-sm">
            Je e-mailprogramma is geopend met het bericht.
          </p>
        )}
      </form>
    </Form>
  );
}
