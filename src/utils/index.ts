export const createScript = (src: string) =>
	`<script type="module" src="${src}"></script>`;

export const createLink = (src: string) =>
	`<link rel="stylesheet" href="${src}"></link>`;

export const generateHTML = (scripts: string[], links: string[]) => `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Esbuild App</title>
  ${links.join('\n')}
</head>

<body>
  <div id="root"></div>
  ${scripts.join('\n')}
</body>

</html>
`;
