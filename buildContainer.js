/**
 * @fileoverview Description of this file.
 *
 * run this with
 * OTHER_GOOGLE_APPLICATION_CREDENTIALS=... OTHER_GOOGLE_APPLICATION_CREDENTIALS2=... node ./multiple-gcr.js
 */

// if (
//   !process.env.OTHER_GOOGLE_APPLICATION_CREDENTIALS ||
//   !process.env.OTHER_GOOGLE_APPLICATION_CREDENTIALS2
// ) {
//   console.log(
//     "please provide application credentials to 2 google cloud projects in the environment variables\nOTHER_GOOGLE_APPLICATION_CREDENTIALS\nOTHER_GOOGLE_APPLICATION_CREDENTIALS2"
//   );
//   process.exit(1);
// }

const { Image } = require("container-image-builder");

let main = async () => {
  /*   const registryUrl = process.env.REGISTRY_URL;
  const registryUser = process.env.REGISTRY_CREDS_USR;
  const registryPw = process.env.REGISTRY_CREDS_PSW */

  const registryUrl =
    "docker-registry-service.docker-registry.svc.cluster.local:5000";
  const registryUser = "registry";
  const registryPw = "flowers";
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  const image = new Image(
    "docker.io/arm64v8/node:17-bullseye-slim",
    registryUrl + "/" + "test" + "/hello-node-k3s",
    {
      auth: {
        [registryUrl]: {
          Username: registryUser,
          Secret: registryPw,
        },
      },
    }
  );

  // add local files to the image.
  await image.addFiles({ "/directory-root-for-files-in-container": "./" });

  // creates a layer in the image with files like
  // /directory-root-for-files-in-container/[the files in ./]

  // set the default working directory for commands
  image.WorkingDir = "/directory-root-for-files-in-container";
  // set the default command to run in the container
  image.Cmd = ["node", "index.js"];
  // append environment variables.
  image.Env = [];

  const result = await image.save();

  console.log("built image\n", result);
};

main();
