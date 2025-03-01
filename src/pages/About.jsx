import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeProvider";

const About = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div>
      {/* Hero Section */}
      <div
        className={`relative h-[60vh] overflow-hidden ${
          isDark ? "bg-black" : "bg-gray-100"
        }`}
      >
        <div className="absolute inset-0 bg-black/90 z-1"></div>
        <img
          src="/aboutImg.jpeg"
          alt=""
          className="absolute h-full w-full object-cover inset-0 brightness-50"
        />
        <div className="relative z-[2] h-full">
          <div className="mx-auto w-full max-w-screen-3xl p-2 md:px-6 lg:px-10 h-full">
            <div className="flex flex-col justify-center h-full max-w-2xl">
              <h1 className="text-5xl font-bold mb-6 text-white">
                Rethinking Security for the 21st Century
              </h1>
              <p className="text-lg font-normal text-[#e5e7eb]">
                Founded in London, in early 2025, by a group of security and
                intelligence professionals aiming to bring fresh perspectives to
                pressing global issues.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className={`py-20 ${isDark ? "bg-[#030712]" : "bg-White"}`}>
        <div className="max-w-3xl mx-auto text-center">
          <h1
            className={`text-3xl font-bold mb-8 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Our Vision
          </h1>
          <p
            className={`text-lg leading-relaxed ${
              isDark ? "text-gray-300" : "text-gray-700"
            }`}
          >
            For too long, the field of security has been limited by outdated
            thinking and a refusal to consider the broader context in which
            conflicts are embedded. As a result, scholars and policymakers alike
            are often playing catch-up, forced to react to destabilizing events
            rather than anticipate them.
            <br />
            At the New Security Project, we aim to rethink what security means
            in the 21st century by fostering new ideas and solutions for
            addressing instability and creating more resilient societies.
          </p>
        </div>
      </div>

      {/* What We Do Section */}
      <div className={`py-20 ${isDark ? "bg-[#030712]" : "bg-white"}`}>
        <div
          className={`max-w-[1460px] mx-auto ${
            isDark ? "bg-[#111827]" : "bg-[#f9fafb]"
          } rounded-xl p-12`}
        >
          <h2
            className={`text-3xl font-bold text-center mb-12 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            What We Do
          </h2>
          <div className="grid md:grid-cols-2 gap-12 max-w-[1200px] mx-auto">
            <div className="space-y-6">
              <h3
                className={`text-xl font-semibold ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Innovative Research & Analysis
              </h3>
              <p className={`${isDark ? "text-gray-300" : "text-gray-700"}`}>
                We publish forward-thinking research, analysis, and opinion that
                explores security through an interdisciplinary lens. Our
                contributors challenge conventional wisdom and offer fresh
                perspectives on complex global issues.
              </p>
            </div>
            <div className="space-y-6">
              <h3
                className={`text-xl font-semibold ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Building a Global Community
              </h3>
              <p className={`${isDark ? "text-gray-300" : "text-gray-700"}`}>
                We are committed to creating a network of thinkers and
                problem-solvers from across disciplines and geographies,
                fostering collaboration that leads to innovative solutions for
                today's most pressing security challenges.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Why It Matters Section */}
      <div className={`py-20 ${isDark ? "bg-[#030712]" : "bg-white"}`}>
        <div className="max-w-3xl mx-auto text-center">
          <h1
            className={`text-3xl font-bold mb-8 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Why It Matters
          </h1>
          <p
            className={`text-lg leading-relaxed ${
              isDark ? "text-gray-300" : "text-gray-700"
            }`}
          >
            The world is changing rapidly, and so must our understanding of
            security. Climate change is displacing millions of people. Economic
            inequality is fueling unrest. Disinformation is corroding the social
            fabric of democratic societies.
            <br />
            At the New Security Project, we believe that reimagining security is
            not just an academic exercise—it's an urgent necessity. By embracing
            an interdisciplinary approach and engaging with leaders in different
            fields from around the world, we hope to contribute to a safer, more
            equitable future for all.
          </p>
        </div>
      </div>

      {/* Support the Project Section */}
      <div className={`py-20 ${isDark ? "bg-[#030712]" : "bg-white"}`}>
        <div
          className={`max-w-2xl mx-auto rounded-xl py-12 px-6 ${
            isDark ? "bg-[#111827]" : "bg-[#f9fafb] shadow-md"
          }`}
        >
          <h3
            className={`text-xl font-bold text-center ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Support the Project
          </h3>
          <p
            className={`leading-relaxed mt-4 mb-3 text-center text-base ${
              isDark ? "text-[#d1d5db]" : "text-gray-700"
            }`}
          >
            If you would like to support us and our project, please consider
            submitting work, becoming a member, or donating.
          </p>
          <div className="flex justify-center gap-4 mt-6">
            <Button
              className={`${
                isDark ? "bg-white text-black" : "bg-black text-white"
              }`}
            >
              Support the Project
            </Button>
            <Button
              className={`${
                isDark ? "bg-black text-white" : "bg-white text-black"
              }`}
            >
              Submit Your Work
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
