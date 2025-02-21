import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Button, Typography } from "@material-tailwind/react";
import { Step, Stepper } from "@material-tailwind/react";
import {
  ArrowRightIcon,
  UserIcon,
  CogIcon,
  ArchiveBoxIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

function Home() {
  const [activeStep, setActiveStep] = useState(0);
  const [hasClicked, setHasClicked] = useState(false);

  const { user } = useUser();

  useEffect(() => {
    let intervalId;

    if (!hasClicked) {
      intervalId = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % 3);
      }, 5000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [hasClicked]);

  const handleClick = (index) => {
    setActiveStep(index);
    setHasClicked(true);
  };
  return (
    <div className="h-screen2 bg-gray-50 flex flex-col items-center justify-center">
      {/* Hero Section */}
      <header className="text-center">
        <Typography variant="h2" className="font-bold text-gray-900">
          Welcome to Lorga!
        </Typography>
        <Typography
          variant="lead"
          className="mt-4 max-w-2xl mx-auto text-gray-700"
        >
          Lorga helps you organize your tasks efficiently and collaborate
          seamlessly. Plan, track, and manage your projects all in one place.{" "}
          <br />
          <span className="text-sm">
            (To use the website, you need to be logged in. Currently, it is only
            available on desktop.)
          </span>
        </Typography>
        <Link
          to={user ? "/taskgroups" : "/signin"}
          className="flex justify-center w-[180px] justify-self-center"
        >
          <Button
            size="lg"
            color="blue"
            variant="gradient"
            className="mt-6 flex items-center"
          >
            Get Started <ArrowRightIcon className="h-5 w-5" />
          </Button>
        </Link>
      </header>
      {/* Features Section */}
      <section className="mt-16 mx-auto px-4">
        <Typography
          variant="h3"
          className="font-bold text-gray-900 text-center"
        >
          How to get started?
        </Typography>
        <Stepper
          activeStep={activeStep}
          className="mt-10 w-[700px] mx-auto"
          activeLineClassName="bg-primary-main"
        >
          <Step
            onClick={() => handleClick(0)}
            className="cursor-pointer"
            activeClassName="bg-primary-main"
            completedClassName="bg-primary-main"
          >
            <UserIcon className="h-5 w-5" />
          </Step>
          <Step
            onClick={() => handleClick(1)}
            className="cursor-pointer"
            activeClassName="bg-primary-main"
            completedClassName="bg-primary-main"
          >
            <CogIcon className="h-5 w-5" />
          </Step>
          <Step
            onClick={() => handleClick(2)}
            className="cursor-pointer"
            activeClassName="bg-primary-main"
            completedClassName="bg-primary-main"
          >
            <ArchiveBoxIcon className="h-5 w-5" />
          </Step>
        </Stepper>
        {activeStep === 0 && (
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="mt-10 w-[700px] h-[120px] mx-auto"
          >
            <Typography variant="h5" className="font-semibold text-gray-900">
              Step 1: Create an Account & Verify Email
            </Typography>
            <Typography variant="paragraph" className="mt-2 text-gray-700">
              To use Lorga, you need to sign up for an account. After
              registering, you will receive an email with a verification link.
              Once your email is verified, you can log in and start managing
              your tasks.
            </Typography>
          </motion.div>
        )}

        {activeStep === 1 && (
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="mt-10 w-[700px] h-[120px] mx-auto"
          >
            <Typography variant="h5" className="font-semibold text-gray-900">
              Step 2: Create a Task Group
            </Typography>
            <Typography variant="paragraph" className="mt-2 text-gray-700">
              Organize your tasks by creating a task group. A task group allows
              you to group related tasks together, such as work projects,
              shopping lists, or fitness routines. You can create as many groups
              as you need to stay organized.
            </Typography>
          </motion.div>
        )}

        {activeStep === 2 && (
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="mt-10 w-[700px] h-[120px] mx-auto"
          >
            <Typography variant="h5" className="font-semibold text-gray-900">
              Step 3: Create and Manage Your Tasks
            </Typography>
            <Typography variant="paragraph" className="mt-2 text-gray-700">
              Now that you have a task group, start adding tasks! You can set
              descriptions, priorities, deadlines, and categories for each task.
              Easily mark tasks as completed, edit their details, or delete them
              when no longer needed.
            </Typography>
          </motion.div>
        )}
      </section>
    </div>
  );
}

export default Home;
