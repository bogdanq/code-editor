export const getCode = (code?: string) => `
  <!DOCTYPE html>
    <html>
    <head>
      <title>Playground</title>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Playground</title>

      <script crossorigin src="https://cdn.jsdelivr.net/npm/react@18.3.1/umd/react.production.min.js"></script>
      <script crossorigin src="https://cdn.jsdelivr.net/npm/react-dom@18.3.1/umd/react-dom.production.min.js"></script>
      <script crossorigin src="//unpkg.com/react-is/umd/react-is.production.min.js"></script>
      <script crossorigin src="//unpkg.com/styled-components/dist/styled-components.min.js"></script>
      <script crossorigin
          src="https://cdnjs.cloudflare.com/ajax/libs/react-router-dom/5.2.0/react-router-dom.min.js"></script>
    </head>
      <body>
        <div id="root"></div>
      <script>

      for (const method in console) {
        console[method] = window.parent.console[method]
      }

      window['react'] = window.React;
      window['react-dom'] = window.ReactDOM;
      window['react-router-dom'] = window.ReactRouterDOM;
      window['styled-components'] = window.styled;

      try {
        ${code}
        } catch (error) {
          console.error(error)
        }
        </script>
      </body>
    </html>
`;
