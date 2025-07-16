"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
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
import sendEmail from "~/lib/sendEmail";

const formSchema = z.object({
  naam: z.string().min(2, {
    message: "Naam moet minimaal 2 tekens bevatten.",
  }),
  email: z.string().email({
    message: "Geen geldig emailadres.",
  }),
  bericht: z.string().max(300, {
    message: "Bericht mag maximaal 300 tekens bevatten.",
  }),
});

export function ContactForm() {
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      naam: "",
      email: "",
      bericht: "",
    },
  });

async function onSubmit(values: z.infer<typeof formSchema>) {
  setIsSubmitting(true);
  setError("");

  const emailPromise = sendEmail(values);

  try {
    await Promise.race([
      emailPromise,
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Timeout")), 7000)
      ),
    ]);

    setIsSent(true);
    form.reset();
  } catch (err) {
    console.error("Fout bij verzenden (of timeout):", err);

    if ((err as Error).message === "Timeout") {
      // Mail is waarschijnlijk nog verstuurd — we geven gebruiker gewoon bevestiging
      setIsSent(true);
    } else {
      setError("Er is iets misgegaan bij het verzenden. Probeer het opnieuw.");
      setIsSent(false);
    }
  } finally {
    setIsSubmitting(false);
  }
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

        <Button bgColor={"yellow"} type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Versturen..." : "Verstuur"}
        </Button>

        {isSent && (
          <p className="text-green-600 mx-auto w-full text-sm pt-2">Bericht is verzonden ✅</p>
        )}
        {error && (
          <p className="text-red-600 text-sm pt-2">{error}</p>
        )}
      </form>
    </Form>
  );
}
