import { AlertCircle } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import CommandBlock from "../../../components/common/react-native/CommandBlock";

const Step = ({ number, title, children }) => (
  <div className="relative pl-12">
    <div className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-(--primary-bg) text-xs font-bold text-(--accent-color1) ring-1 ring-(--primary-hover-border)">
      {number}
    </div>

    <h3 className="text-base font-semibold text-(--primary-text)">{title}</h3>
    <div className="mt-2 text-sm leading-6 text-(--secondary-text)">{children}</div>
  </div>
);

const InfoCard = ({ title, children }) => (
  <div className="rounded-2xl border border-(--primary-border) bg-(--primary-bg) p-4">
    <h3 className="text-sm font-semibold uppercase tracking-wider text-(--accent-color1)">{title}</h3>
    <div className="mt-2 text-sm leading-6 text-(--secondary-text)">{children}</div>
  </div>
);

const QuickSetup = () => {
  const { headingRef } = useOutletContext();

  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10">
          <span className="font-mono text-xs uppercase tracking-widest text-(--accent-color1)">
            Docker / Setup
          </span>

          <h1
            ref={headingRef}
            className="mt-3 text-3xl font-extrabold tracking-tight text-(--primary-text) sm:text-4xl"
          >
            Setup Docker and Run a Vite React App
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-(--secondary-text) sm:text-base">
            Follow these steps in order: install Docker Desktop, fix WSL if needed, then create the Dockerfile and run the container for your React app.
          </p>
        </div>

        <div className="mt-6 rounded-2xl border border-(--primary-border) bg-(--secondary-bg) p-5 shadow-sm sm:p-7">
          <div className="mb-7">
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                <AlertCircle size={18} className="text-(--accent-color1)" />
              </div>

              <div>
                <h2 className="text-xl font-bold text-(--primary-text)">Docker Desktop + WSL checklist</h2>
                <p className="mt-1 text-sm text-(--secondary-text)">
                  Docker Desktop often fails because of WSL 2 or virtualization issues. Fix that first, then build the app container.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <InfoCard title="Install Docker">
              Download Docker Desktop from docker.com and install it for Windows AMD64. Restart if asked.
            </InfoCard>

            <InfoCard title="WSL requirement">
              Docker Desktop on Windows needs WSL 2. The installer usually sets it up, but you may still need to fix your current WSL version.
            </InfoCard>

            <InfoCard title="No login needed">
              You do not need to log in to Docker Desktop to follow this setup.
            </InfoCard>

            <InfoCard title="Troubleshooting">
              If Docker engine is not running, the common cause is virtualization or a stale WSL build.
            </InfoCard>
          </div>

          <div className="mt-8 space-y-8">
            <Step number="01" title="Install Docker Desktop">
              <p className="text-sm">
                Go to <a href="https://www.docker.com/products/docker-desktop" target="_blank" rel="noreferrer" className="font-semibold text-(--accent-color1)">https://www.docker.com/products/docker-desktop</a>
              </p>

              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-(--secondary-text)">
                <li>Download Docker Desktop for Windows AMD64.</li>
                <li>Install it and restart your computer if asked.</li>
                <li>Allow WSL 2 setup if Docker prompts for it.</li>
                <li>Open Docker Desktop and wait until it says Engine running.</li>
              </ul>

              <CommandBlock>docker --version</CommandBlock>

              <p className="mt-3 text-sm">
                If this works, Docker is installed correctly and the engine is ready.
              </p>
            </Step>

            <Step number="02" title="Check virtualization and WSL status">
              <p className="text-sm">
                If Docker Desktop stops or refuses to start, the error is often caused by virtualization or an outdated WSL install.
              </p>

              <CommandBlock>systeminfo</CommandBlock>

              <p className="mt-3 text-sm">
                Scroll to the bottom and find <span className="font-semibold text-(--primary-text)">Hyper-V Requirements</span>. If it says <span className="font-semibold text-(--primary-text)">Virtualization Enabled In Firmware: Yes</span>, virtualization is enabled.
              </p>

              <CommandBlock>wsl --status</CommandBlock>

              <p className="mt-3 text-sm">
                If you get an error or "not installed", run the update below. If WSL works, continue to the update command.
              </p>
            </Step>

            <Step number="03" title="Fix the real WSL issue">
              <p className="text-sm">
                This is the important fix when WSL on your PC is the old built-in version.
              </p>

              <p className="mt-3 text-sm">
                Open Command Prompt as Administrator and run:
              </p>

              <CommandBlock>wsl --install --web-download --no-distribution</CommandBlock>

              <p className="mt-3 text-sm">
                The <span className="font-semibold text-(--primary-text)">--web-download</span> flag fetches the latest WSL directly from Microsoft, which avoids Microsoft Store issues. The <span className="font-semibold text-(--primary-text)">--no-distribution</span> flag skips installing Ubuntu because Docker does not need it.
              </p>

              <p className="mt-3 text-sm">
                Restart your PC after that install finishes. Then open a new terminal and run:
              </p>

              <CommandBlock>wsl --version</CommandBlock>

              <p className="mt-3 text-sm">
                If it prints version numbers, the update worked. You can also run:
              </p>

              <CommandBlock>wsl --update</CommandBlock>
              <CommandBlock>wsl --shutdown</CommandBlock>
            </Step>

            <Step number="04" title="Now open your React project and create the Dockerfile">
              <p className="text-sm">
                In the root folder of your Vite React app, create a file named <span className="font-semibold text-(--primary-text)">Dockerfile</span> with the following content:
              </p>

              <CommandBlock>{`# Use Node.js as the base
FROM node:20-alpine

# Set working folder inside container
WORKDIR /app

# Copy package files first (faster rebuilds)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your code
COPY . .

# Port your app uses
EXPOSE 5173

# Start the app
CMD ["npm", "run", "dev", "--", "--host"]`}</CommandBlock>
            </Step>

            <Step number="05" title="Create the .dockerignore file">
              <p className="text-sm">
                Add a <span className="font-semibold text-(--primary-text)">.dockerignore</span> file in the same root folder:
              </p>

              <CommandBlock>{`node_modules
build
dist
.git
Dockerfile`}</CommandBlock>
            </Step>

            <Step number="06" title="Build and run the container in VS Code">
              <p className="text-sm">
                Open your VS Code terminal in the project root and run these commands:
              </p>

              <CommandBlock>docker info</CommandBlock>
              <CommandBlock>docker build -t my-react-app .</CommandBlock>
              <CommandBlock>docker run -p 5173:5173 my-react-app</CommandBlock>

              <p className="mt-3 text-sm">
                After the container starts, open <span className="font-semibold text-(--primary-text)">http://localhost:5173</span> in your browser.
              </p>
            </Step>

            <Step number="07" title="Summary">
              <ul className="list-disc space-y-2 pl-5">
                <li>Docker Desktop installation comes first.</li>
                <li>WSL 2 and virtualization must be healthy.</li>
                <li>The Dockerfile installs dependencies and runs the dev server.</li>
                <li>The app is exposed on port 5173 and can be opened locally in the browser.</li>
              </ul>
            </Step>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickSetup;