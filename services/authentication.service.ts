"use server";
import { cookies } from "next/headers";
import API_INFO from "@config/apiRoutes";
import { User, UserDataCookies } from "@typings/User";

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
    cookies().set("userId", data.userId);
    const user: User | null = await getLoggedInUserInfo();
    if (user) {
      cookies().set("role", user.role);
      if (user.active) {
        return {
          status: "success",
          message: user.role,
        };
      }
    } else {
      return {
        status: "error",
        message: "حسابك غير مفعل. يرجى التواصل مع الإدارة",
      };
    }
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

async function getUserDataFromCookies(): Promise<UserDataCookies | null> {
  const userId = cookies().get("userId")?.value;
  const role = cookies().get("role")?.value;
  const userToken = cookies().get("userToken")?.value;
  if (
    userId === undefined ||
    userId === null ||
    userId.length === 0 ||
    role === undefined ||
    role === null ||
    role.length === 0 ||
    userToken === undefined ||
    userToken === null ||
    userToken.length === 0
  ) {
    return null;
  }
  return {
    userId,
    role,
    token: userToken,
  };
}

async function getLoggedInUserInfo(): Promise<User | null> {
  const userId = cookies().get("userId")?.value;
  if (!userId || userId.length === 0 || userId === undefined) {
    return null;
  }
  try {
    const response = await fetch(
      `${API_INFO.BASE_URL}${API_INFO.USERS.GET_USER_BY_ID(userId)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies().get("userToken")?.value}`,
        },
      }
    );
    if (response.status !== 200) {
      return null;
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    return null;
  }
}

export { login, logout, register, getUserDataFromCookies, getLoggedInUserInfo };
