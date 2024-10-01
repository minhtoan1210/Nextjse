"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginBody, LoginBodyType } from "@/schemaValidations/auth.schema";

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
import envConfig from "@/config";
import { useToast } from "@/hooks/use-toast";
import authApiRequest from "@/apiRequests/auth";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginBodyType) {
    try {
      // const result = await fetch(
      //   `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/auth/login`,
      //   {
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify(values),
      //     method: "POST",
      //   }
      // ).then(async (res) => {
      //   const payload = await res.json();
      //   const data = {
      //     status: res.status,
      //     payload,
      //   };
      //   console.log("data", data);
      //   // trong phần header ok nếu lỗi là false
      //   if (!res.ok) {
      //     throw data;
      //   }
      //   return data;
      // });
      const result = await authApiRequest.login(values);
      toast({
        description: result.payload.message,
      });

      // const resultFromNextServer = await fetch("/api/auth", {
      //   method: "POST",
      //   body: JSON.stringify(result),
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // }).then(async (res) => {
      //   const payload = await res.json();
      //   const data = {
      //     status: res.status,
      //     payload,
      //   };
      //   if (!res.ok) {
      //     throw data;
      //   }
      //   return data;
      // });
      // setSessionToken(resultFromNextServer.payload.data.token)
      await authApiRequest.auth({ sessionToken: result.payload.data.token });
      router.push("/me");
    } catch (error: any) {
      const errors = error.payload.errors as {
        field: string;
        message: string;
      }[];
      const status = error.status as number;
      if (status === 422) {
        errors.forEach((error) => {
          form.setError(error.field as "email" | "password", {
            type: "server",
            message: error.message,
          });
        });
      } else {
        toast({
          title: "Lỗi",
          description: error.payload.message,
          variant: "destructive",
        });
      }
    }
  }
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, (e) => {
            console.log(e);
          })}
          className="space-y-8"
          //noValidate loại bỏ các cái check của html thay vào đó là js
          noValidate
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
