/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import { contactFormSchema, ContactFormData } from "@/schema/contact-schema";
import { FormError } from "@shadcn/form-error";
import { FormSuccess } from "@shadcn/form-success";
import { Button } from "@shadcn/button";
import { Input } from "@shadcn/input";
import { Textarea } from "@shadcn/textarea";
import { Label } from "@shadcn/label";

export function ContactForm() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: ""
    }
  });

  const onSubmit = async (data: ContactFormData) => {
    setError(null);
    setSuccess(null);
    setIsPending(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const responseData = await response.json();

      if (!response.ok) {
        setError(responseData.message || "Something went wrong. Please try again.");
        return;
      }

      setSuccess("Message sent successfully! We'll get back to you soon.");
      reset();
    } catch (error) {
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 w-full max-w-md p-4"
    >
      {/* Nama */}
      <div className="space-y-2">
        <Label htmlFor="name" className="text-sm font-medium">
          Nama
        </Label>
        <Input
          id="name"
          type="text"
          placeholder="Nama Lengkap"
          disabled={isPending}
          className={`form-input w-full rounded-xl bg-[#e7eef3] text-[#0e151b] h-14 p-4 placeholder:text-[#4e7997] text-base font-normal leading-normal focus:outline-0 focus:ring-0 transition-all ${errors.name ? "border-destructive focus-visible:ring-destructive" : "border-none"}`}
          {...register("name")}
        />
        {errors.name && (
          <FormError message={errors.name.message} />
        )}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="Alamat Email"
          disabled={isPending}
          className={`form-input w-full rounded-xl bg-[#e7eef3] text-[#0e151b] h-14 p-4 placeholder:text-[#4e7997] text-base font-normal leading-normal focus:outline-0 focus:ring-0 transition-all ${errors.email ? "border-destructive focus-visible:ring-destructive" : "border-none"}`}
          {...register("email")}
        />
        {errors.email && (
          <FormError message={errors.email.message} />
        )}
      </div>

      {/* Nomor Telepon */}
      <div className="space-y-2">
        <Label htmlFor="phone" className="text-sm font-medium">
          Nomor Telepon
        </Label>
        <Input
          id="phone"
          type="tel"
          placeholder="Nomor Telepon"
          disabled={isPending}
          className={`form-input w-full rounded-xl bg-[#e7eef3] text-[#0e151b] h-14 p-4 placeholder:text-[#4e7997] text-base font-normal leading-normal focus:outline-0 focus:ring-0 transition-all ${errors.phone ? "border-destructive focus-visible:ring-destructive" : "border-none"}`}
          {...register("phone")}
        />
        {errors.phone && (
          <FormError message={errors.phone.message} />
        )}
      </div>

      {/* Pesan */}
      <div className="space-y-2">
        <Label htmlFor="message" className="text-sm font-medium">
          Pesan
        </Label>
        <Textarea
          id="message"
          placeholder="Tulis pesan Anda di sini"
          disabled={isPending}
          className={`form-input w-full min-h-[120px] rounded-xl bg-[#e7eef3] text-[#0e151b] p-4 placeholder:text-[#4e7997] text-base font-normal leading-normal focus:outline-0 focus:ring-0 transition-all ${errors.message ? "border-destructive focus-visible:ring-destructive" : "border-none"}`}
          {...register("message")}
        />
        {errors.message && (
          <FormError message={errors.message.message} />
        )}
      </div>

      {/* Global Errors and Success */}
      {error && <FormError message={error} />}
      {success && <FormSuccess message={success} />}

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isPending}
        className="w-full rounded-full h-10 transition-all transform hover:translate-y-[-2px] active:translate-y-[0px] bg-[#309be8] text-white font-bold tracking-[0.015em]"
      >
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Mengirim...
          </>
        ) : (
          "Kirim Pesan"
        )}
      </Button>
    </form>

  );
}