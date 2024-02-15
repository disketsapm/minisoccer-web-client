import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { AuthForm } from "./components/auth-form";
import { FcGoogle } from "react-icons/fc";

export default function AuthPage() {
  return (
    <div
      className="flex justify-center items-center min-h-[70vh] py-14"
      style={{
        backgroundImage: `url(/images/auth/bg-auth.png)`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <Card className="border-black rounded-xl border-2">
        <CardContent className="max-w-[70vw] max-h-[90vh] p-8 ">
          <div className="flex justify-between gap-5">
            <div className="w-1/2">
              <Image
                src="/images/auth/bola.png"
                alt="about"
                width={400}
                height={400}
              />
            </div>
            <div className="flex flex-col">
              <Tabs
                defaultValue="register"
                className="w-[400px]"
              >
                <div className="flex justify-center">
                  <TabsList className="grid grid-cols-2 bg-gray-400 gap-2 w-[70%] ">
                    <TabsTrigger
                      className="data-[state=active]:bg-[#F9D548] data-[state=active]:border border-black bg-white text-black"
                      value="register"
                    >
                      Buat Account
                    </TabsTrigger>
                    <TabsTrigger
                      className="data-[state=active]:bg-[#F9D548] data-[state=active]:border border-black bg-white text-black"
                      value="login"
                    >
                      Masuk
                    </TabsTrigger>
                  </TabsList>
                </div>
                <div className="flex justify-center my-4">
                  <Button
                    variant={"outline"}
                    className="w-full border-2 border-black"
                  >
                    <FcGoogle className="w-5 h-5 mr-2" /> Sign in with Google
                  </Button>
                </div>
                <TabsContent value="register">
                  <div className="space-y-1">
                    <AuthForm />
                  </div>
                </TabsContent>
                <TabsContent value="login">
                  <div className="space-y-1">
                    <AuthForm type="login" />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
