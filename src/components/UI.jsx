import { pb, PHOTO_POSES, UI_MODES, useConfiguratorStore } from "../store";

const PosesBox = () => {
  const curPose = useConfiguratorStore((state) => state.pose);
  const setPose = useConfiguratorStore((state) => state.setPose);
  return (
    <div className="pointer-events-auto md:rounded-t-lg bg-gradient-to-br from-black/30 to-indigo-900/20 backdrop-blur-sm drop-shadow-md flex flex-col p-6 gap-4">
      <div className="flex flex-col gap-4">
        <div className="text-white">Hi how are you today?</div>
        <div className="flex gap-2">
          <input 
            type="text"
            placeholder="Type your message..."
            className="flex-1 bg-black/20 text-white rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const poses = Object.values(PHOTO_POSES);
                let firstPose = poses[Math.floor(Math.random() * poses.length)];
                let thirdPose;
                // Make sure third pose is different from first
                do {
                  thirdPose = poses[Math.floor(Math.random() * poses.length)];
                } while (thirdPose === firstPose);

                setTimeout(() => {
                  setPose(firstPose);
                }, Math.random() * 500);
                
                setTimeout(() => {
                  setPose(PHOTO_POSES.Idle);
                }, Math.random() * 500 + 500);
                
                setTimeout(() => {
                  setPose(thirdPose);
                }, Math.random() * 500 + 1000);
              }
            }}
          />
          <button 
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg transition-colors"
            onClick={() => {
              const poses = Object.values(PHOTO_POSES);
              let firstPose = poses[Math.floor(Math.random() * poses.length)];
              let thirdPose;
              // Make sure third pose is different from first
              do {
                thirdPose = poses[Math.floor(Math.random() * poses.length)];
              } while (thirdPose === firstPose);

              setTimeout(() => {
                setPose(firstPose);
              }, Math.random() * 500);
              
              setTimeout(() => {
                setPose(PHOTO_POSES.Idle);
              }, Math.random() * 500 + 500);
              
              setTimeout(() => {
                setPose(thirdPose);
              }, Math.random() * 500 + 1000);
            }}
          >
            Send
          </button>
        </div>
        <div className="text-white">Put the response here and render it conditionally</div>
      </div>
    </div>
  );
};

const AssetsBox = () => {
  const {
    categories,
    currentCategory,
    setCurrentCategory,
    changeAsset,
    customization,
    lockedGroups,
  } = useConfiguratorStore();

  return (
    <div className="md:rounded-t-lg bg-gradient-to-br from-black/30 to-indigo-900/20  backdrop-blur-sm drop-shadow-md flex flex-col py-6 gap-3 overflow-hidden ">
      <div className="flex items-center gap-8 pointer-events-auto noscrollbar overflow-x-auto px-6 pb-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setCurrentCategory(category)}
            className={`transition-colors duration-200 font-medium flex-shrink-0 border-b ${
              currentCategory?.name === category.name
                ? "text-white shadow-purple-100 border-b-white"
                : "text-gray-200 hover:text-gray-100 border-b-transparent"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
      {lockedGroups[currentCategory?.name] && (
        <p className="text-red-400 px-6">
          Asset is hidden by{" "}
          {lockedGroups[currentCategory.name]
            .map((asset) => `${asset.name} (${asset.categoryName})`)
            .join(", ")}
        </p>
      )}
      <div className="flex gap-2 overflow-x-auto noscrollbar px-6">
        {currentCategory?.removable && (
          <button
            onClick={() => changeAsset(currentCategory.name, null)}
            className={`w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden pointer-events-auto hover:opacity-100 transition-all border-2 duration-300
              bg-gradient-to-tr
              ${
                !customization[currentCategory.name].asset
                  ? "border-white from-white/20 to-white/30"
                  : "from-black/70 to-black/20 border-black"
              }`}
          >
            <div className="w-full h-full flex items-center justify-center bg-black/40 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </div>
          </button>
        )}
        {currentCategory?.assets.map((asset) => (
          <button
            key={asset.thumbnail}
            onClick={() => changeAsset(currentCategory.name, asset)}
            className={`w-20 h-20  flex-shrink-0 rounded-xl overflow-hidden pointer-events-auto hover:opacity-100 transition-all border-2 duration-300
              bg-gradient-to-tr
              ${
                customization[currentCategory.name]?.asset?.id === asset.id
                  ? "border-white from-white/20 to-white/30"
                  : "from-black/70 to-black/20 border-black"
              }`}
          >
            <img
              className="object-cover w-full h-full"
              src={pb.files.getUrl(asset, asset.thumbnail)}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

const RandomizeButton = () => {
  const randomize = useConfiguratorStore((state) => state.randomize);
  return (
    <button
      className="rounded-lg bg-indigo-500 hover:bg-indigo-600 transition-colors duration-300 text-white font-medium px-4 py-3 pointer-events-auto drop-shadow-md"
      onClick={randomize}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"
        />
      </svg>
    </button>
  );
};

const ScreenshotButton = () => {
  const screenshot = useConfiguratorStore((state) => state.screenshot);
  return (
    <button
      className="rounded-lg bg-indigo-500 hover:bg-indigo-600 transition-colors duration-300 text-white font-medium px-4 py-3 pointer-events-auto drop-shadow-md"
      onClick={screenshot}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
        />
      </svg>
    </button>
  );
};

const DownloadButton = () => {
  const download = useConfiguratorStore((state) => state.download);
  return (
    <button
      className="rounded-lg bg-indigo-500 hover:bg-indigo-600 transition-colors duration-300 text-white font-medium px-4 py-3 pointer-events-auto drop-shadow-md"
      onClick={download}
    >
      Download
    </button>
  );
};
const MeetTheTeamButton = () => {
  return (
    <button
      className="rounded-lg bg-indigo-500 hover:bg-indigo-600 transition-colors duration-300 text-white font-medium px-4 py-3 pointer-events-auto drop-shadow-md"
      onClick={() => {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        modal.innerHTML = `
          <div class="bg-white p-8 rounded-lg max-w-2xl w-full mx-4">
            <h2 class="text-2xl font-bold mb-6">Meet Our Team</h2>
            <div class="grid gap-6 md:grid-cols-3">
              <div class="text-center">
                <h3 class="font-semibold mb-2">Team Member 1</h3>
                <a href="https://linkedin.com/in/member1" target="_blank" class="text-indigo-600 hover:text-indigo-800">LinkedIn Profile</a>
              </div>
              <div class="text-center">
                <h3 class="font-semibold mb-2">Team Member 2</h3>
                <a href="https://linkedin.com/in/member2" target="_blank" class="text-indigo-600 hover:text-indigo-800">LinkedIn Profile</a>
              </div>
              <div class="text-center">
                <h3 class="font-semibold mb-2">Team Member 3</h3>
                <a href="https://linkedin.com/in/member3" target="_blank" class="text-indigo-600 hover:text-indigo-800">LinkedIn Profile</a>
              </div>
            </div>
            <button class="mt-6 px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 w-full">Close</button>
          </div>
        `;
        
        document.body.appendChild(modal);
        
        const closeBtn = modal.querySelector('button');
        closeBtn.onclick = () => modal.remove();
        
        modal.onclick = (e) => {
          if (e.target === modal) modal.remove();
        };
      }}
    >
      Meet the team
    </button>
  );
};

const TechStackButton = () => {
  return (
    <button
      className="rounded-lg bg-indigo-500 hover:bg-indigo-600 transition-colors duration-300 text-white font-medium px-4 py-3 pointer-events-auto drop-shadow-md"
      onClick={() => {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        modal.innerHTML = `
          <div class="bg-white p-8 rounded-lg max-w-2xl w-full mx-4">
            <h2 class="text-2xl font-bold mb-6">Tech Stack</h2>
            <div class="grid gap-6 md:grid-cols-3">
              <div class="text-center">
                <h3 class="font-semibold mb-2">Frontend</h3>
                <ul class="space-y-1">
                  <li>React</li>
                  <li>Three.js</li>
                  <li>React Three Fiber</li>
                  <li>TailwindCSS</li>
                </ul>
              </div>
              <div class="text-center">
                <h3 class="font-semibold mb-2">Backend</h3>
                <ul class="space-y-1">
                  <li>PocketBase</li>
                  <li>Node.js</li>
                  <li>SQLite</li>
                </ul>
              </div>
              <div class="text-center">
                <h3 class="font-semibold mb-2">Tools</h3>
                <ul class="space-y-1">
                  <li>Vite</li>
                  <li>Blender</li>
                  <li>GLTF Transform</li>
                </ul>
              </div>
            </div>
            <button class="mt-6 px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 w-full">Close</button>
          </div>
        `;
        
        document.body.appendChild(modal);
        
        const closeBtn = modal.querySelector('button');
        closeBtn.onclick = () => modal.remove();
        
        modal.onclick = (e) => {
          if (e.target === modal) modal.remove();
        };
      }}
    >
      Tech Stack
    </button>
  );
};

export const UI = () => {
  const currentCategory = useConfiguratorStore(
    (state) => state.currentCategory
  );
  const customization = useConfiguratorStore((state) => state.customization);
  const mode = useConfiguratorStore((state) => state.mode);
  const setMode = useConfiguratorStore((state) => state.setMode);
  const loading = useConfiguratorStore((state) => state.loading);
  return (
    <main className="pointer-events-none fixed z-10 inset-0 select-none">
      <div
        className={`absolute inset-0 bg-black z-10 pointer-events-none flex items-center justify-center transition-opacity  duration-1000 ${
          loading ? "opacity-100" : "opacity-0"
        }`}
      >
        <img
          src="/images/wawasensei-white.png"
          className="w-40 animate-pulse"
        />
      </div>
      <div className="mx-auto h-full max-w-screen-xl w-full flex flex-col justify-between">
        <div className="flex justify-between items-center p-10">
          <a
            className="pointer-events-auto"
            href="https://lessons.wawasensei.dev/courses/react-three-fiber"
          >
            <img className="w-20" src="/images/wawasensei-white.png" />
          </a>
          <div className="flex items-cente gap-2">
            <RandomizeButton />
            {/* <ScreenshotButton />
            <DownloadButton /> */}
            <MeetTheTeamButton />
            <TechStackButton />
          </div>
        </div>
        <div className="md:px-10 flex flex-col">
          {mode === UI_MODES.CUSTOMIZE && (
            <>
              {currentCategory?.colorPalette &&
                customization[currentCategory.name] && <ColorPicker />}
              <AssetsBox />
            </>
          )}
          {mode === UI_MODES.PHOTO && <PosesBox />}
          <div className="flex justify-stretch">
            <button
              className={`flex-1 pointer-events-auto  p-4 text-white transition-colors duration-200 font-medium
                ${
                  mode === UI_MODES.CUSTOMIZE
                    ? "bg-indigo-500/90"
                    : "bg-indigo-500/30 hover:bg-indigo-500/50"
                }
              `}
              onClick={() => setMode(UI_MODES.CUSTOMIZE)}
            >
              Customize avatar
            </button>
            <div className="w-px bg-white/30"></div>
            <button
              className={`flex-1 pointer-events-auto p-4 text-white transition-colors duration-200 font-medium
                ${
                  mode === UI_MODES.PHOTO
                    ? "bg-indigo-500/90"
                    : "bg-indigo-500/30 hover:bg-indigo-500/50"
                }
                `}
              onClick={() => setMode(UI_MODES.PHOTO)}
            >
              Talk with avatar
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

const ColorPicker = () => {
  const updateColor = useConfiguratorStore((state) => state.updateColor);
  const currentCategory = useConfiguratorStore(
    (state) => state.currentCategory
  );
  const handleColorChange = (color) => {
    updateColor(color);
  };
  const customization = useConfiguratorStore((state) => state.customization);

  if (!customization[currentCategory.name]?.asset) {
    return null;
  }
  return (
    <div className="pointer-events-auto relative flex gap-2 max-w-full overflow-x-auto backdrop-blur-sm py-2 drop-shadow-md noscrollbar px-2 md:px-0">
      {currentCategory.expand?.colorPalette?.colors.map((color, index) => (
        <button
          key={`${index}-${color}`}
          className={`w-10 h-10 p-1.5 drop-shadow-md bg-black/20 shrink-0 rounded-lg overflow-hidden transition-all duration-300 border-2
             ${
               customization[currentCategory.name].color === color
                 ? "border-white"
                 : "border-transparent"
             }
          `}
          onClick={() => handleColorChange(color)}
        >
          <div
            className="w-full h-full rounded-md"
            style={{ backgroundColor: color }}
          />
        </button>
      ))}
    </div>
  );
};
