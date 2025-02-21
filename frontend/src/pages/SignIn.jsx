import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Card,
} from "@material-tailwind/react";
import Login from "../components/SignIn/Login";
import SignUp from "../components/SignIn/SignUp";

export default function SignIn() {
  return (
    <section className="flex h-screen2 justify-center items-center">
      <Card className="w-96 h-[500px]">
        <Tabs value="login">
          <TabsHeader
            indicatorProps={{
              className: "bg-primary-background",
            }}
          >
            <Tab value="login">Login</Tab>
            <Tab value="signup">Sign Up</Tab>
          </TabsHeader>
          <TabsBody
            animate={{
              initial: { x: -250 },
              mount: { x: 0 },
              unmount: { x: -250 },
            }}
          >
            <TabPanel value="login">
              <Login />
            </TabPanel>
            <TabPanel value="signup">
              <SignUp />
            </TabPanel>
          </TabsBody>
        </Tabs>
      </Card>
    </section>
  );
}
