module.exports = () => {
  try {
    const confirmEmail = (name = "", body = "") => {
      return `
      <!DOCTYPE html>
      <html lang="en">
      
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Confirmación de Correo Electronico</title>
      </head>
      
      <body style="margin:0px;padding: 0px;">
          <div style="
              width: 100%;
              background-color: #273746;
              padding: 15px;
              color:white; 
              font-family: Arial, Helvetica, sans-serif;
              text-align: center;">
              <b>Confirmación de Correo Electronico</b>
          </div>
          <div style="width: 100%;
              padding: 15px;
              font-family: Arial, Helvetica, sans-serif;">
              <p style="text-align: center !important;">Hola!, bienvenido ${name}, puedes confirmar tu cuenta dando click en
                  el siguiente boton</p>
      
          </div>
          <div style="width: 100%;padding: 15px;display: flex;justify-content: center;">
              <form action="${body}">
              <button style="
                  width: 50%;
                  background-color: #0d6efd;
                  color: white; 
                  border:none !important;
                  padding: 15px;cursor: pointer;">Confirmar Cuenta</button>
              </form>
          </div>
      </body>
      </html>`;
    };

    return { confirmEmail };
  } catch (error) {
    throw new Error("Failed templetes: " + err.message);
  }
};
