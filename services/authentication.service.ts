"use server";
import { cookies } from "next/headers";
import API_INFO from "@config/apiRoutes";

async function login(formData: any) {
  try {
    const formdatajson = JSON.stringify(formData);
    const response = await fetch(`${API_INFO.BASE_URL}${API_INFO.AUTH.LOGIN}`, {
      method: "POST",
      body: formdatajson,
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status !== 200) {
      return {
        status: "error",
        message: "البريد الإلكتروني أو كلمة المرور غير صالحة",
      };
    }
    const data = await response.json();
    cookies().set("userToken", data.token);
    cookies().set("role", "user");
    cookies().set("userId", data.userId);
    return {
      status: "success",
      message: data.userId,
    };
  } catch (error: any) {
    return {
      status: "server error",
      message: error.message || "حدث خطأ غير متوقع في الخادم",
    };
  }
}

async function logout() {
  cookies().set("role", "");
  cookies().set("userToken", "");
  cookies().set("userId", "");
}

async function register(formData: any) {
  const formdatajson = JSON.stringify(formData);

  try {
    const response = await fetch(
      `${API_INFO.BASE_URL}${API_INFO.AUTH.REGISTER}`,
      {
        method: "POST",
        body: formdatajson,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status !== 201) {
      return {
        status: "error",
        message: "المستخدم موجود بالفعل. يرجى تسجيل الدخول.",
      };
    }
    const data = await response.json();
    return {
      status: "success",
      message: "تم تسجيل المستخدم بنجاح",
    };
  } catch (error: any) {
    return {
      status: "server error",
      message: error.message || "حدث خطأ غير متوقع في الخادم",
    };
  }
}

async function getUserDataFromCookies() {
  if (
    !cookies().get("userId")?.value.length ||
    !cookies().get("role")?.value.length ||
    !cookies().get("userToken")?.value.length
  ) {
    return null;
  }
  return {
    userId: cookies().get("userId"),
    role: cookies().get("role"),
    token: cookies().get("userToken"),
  };
}

export { login, logout, register, getUserDataFromCookies };
